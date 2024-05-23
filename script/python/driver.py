import argparse
import asyncio
from datetime import datetime
import logging

import aiohttp

url = "http://localhost:8545/"

fromAddress = '0x2a97dd356ab0bbc35ba0b0b69b2f7c1fd0fdf35d'
contract = '0x65DB695A4382ea5fb0fF0e8d441d8eA87D158d5B'
data = '0x60fe47b10000000000000000000000000000000000000000000000000000000000000063'

tx = {
    "jsonrpc": "2.0",
    "method": "eth_sendTransaction",
    "params": [{
        "from": fromAddress,
        "to": contract,
        "data": data
    }],
    "id": 1}

logging.basicConfig(format='%(asctime)s %(message)s')


class PrintContext:
    def __init__(self):
        self.last_print = datetime.now()
        self.transactions_sent = 0

    def print_info(self):
        now = datetime.now()
        if (now - self.last_print).total_seconds() >= 1.0:
            logging.warning("sent {} transactions".format(self.transactions_sent))
            self.last_print = now

# Send transaction
async def send_transaction(session, print_ctx):
    await session.post(url, json=tx)
    print_ctx.transactions_sent += 1

# Drive `total` transactions at a rate of `tps`
async def drive(loop, tps, total):
    logging.warning("Driving load at {} tps for a total of {} transactions".format(tps, total))

    async with aiohttp.ClientSession() as session:
        print_ctx = PrintContext()
        tasks = []
        for i in range(total):
            start = datetime.now()
            task = loop.create_task(send_transaction(session, print_ctx))
            tasks.append(task)

            print_ctx.print_info()

            delta = 1.0 / tps - (datetime.now() - start).total_seconds()
            await asyncio.sleep(delta)
        await asyncio.gather(*tasks)

    logging.warning("Finished driving load.")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Drive transactions to geth client.')
    parser.add_argument('tps', type=int, help='the number of transactions per second to send to geth')
    parser.add_argument('total', type=int, help='the total number of transactions to send to geth')
    args = parser.parse_args()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(drive(loop, tps=args.tps, total=args.total))
    loop.close()