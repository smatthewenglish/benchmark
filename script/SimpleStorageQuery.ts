import { JsonRpcProvider, ethers } from 'ethers'

const abi = '[{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initVal","type":"uint256"}],"payable":false,"type":"constructor"}]'

const url = 'http://localhost:8545'
const provider = new JsonRpcProvider(url)

const key = '0x42ae8a6a1a0f79e6704cb25c09a847b2b82eb02fa15dbb4d8aac53152abe6959'
const wallet = new ethers.Wallet(key, provider)
const signer = wallet.connect(provider)

async function main() {
    const address = process.argv[2]; 

    const contract = new ethers.Contract(
        address,
        abi,
        signer
    )
    let output = await contract.get()
    console.log(output)

    const balance00 = await provider.getBalance(wallet.address)
    console.log(`wallet.address: ` + wallet.address)
    console.log(`     balance00: ` + balance00)


    process.exit()
}

main()

/**

kubectl -n test port-forward svc/goquorum-node-validator-1 8545:8545

kubectl exec -it goquorum-node-validator-1-0 -n test -- /bin/sh


kubectl exec -it goquorum-node-validator-1-0 -n test -- /bin/sh


#kubectl exec -it goquorum-node-validator-1-0 -n test -- /bin/sh
curl -X POST -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "eth_sendTransaction",
  "params": [{
    "from": "0x2a97dd356ab0bbc35ba0b0b69b2f7c1fd0fdf35d",
    "to": "0x65DB695A4382ea5fb0fF0e8d441d8eA87D158d5B",
    "data": "0x60fe47b10000000000000000000000000000000000000000000000000000000000000063"
  }],
  "id": 1
}' http://localhost:8545/



#kubectl exec -it goquorum-node-validator-2-0 -n test -- /bin/sh
curl -X POST -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "eth_sendTransaction",
  "params": [{
    "from": "0xac7e05e4ae861cdcd863356b8139315ea89f564b",
    "to": "0x65DB695A4382ea5fb0fF0e8d441d8eA87D158d5B",
    "data": "0x60fe47b10000000000000000000000000000000000000000000000000000000000000063"
  }],
  "id": 1
}' http://localhost:8545/



 */