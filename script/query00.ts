import { JsonRpcProvider, ethers } from 'ethers'

const bytecode = '0x6080604052348015600f57600080fd5b5060f78061001e6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220ad9ea96ce40e6c478bf71447c7d4a4c4927ff1516d6a80ee7683c794a67666a364736f6c63430008190033'
const abi = '[ { "type": "function", "name": "increment", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "number", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "setNumber", "inputs": [ { "name": "newNumber", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" } ]'

const provider = new JsonRpcProvider('http://localhost:8545')

//const key = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'
//const key = 'ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f'
//const key = '0x7717c402b860e2c27f25a8d72f262907a64135ed42502049699dc3b0cc1a1c0c'
const key = '0x42ae8a6a1a0f79e6704cb25c09a847b2b82eb02fa15dbb4d8aac53152abe6959'
const wallet = new ethers.Wallet(key, provider)
const signer = wallet.connect(provider)

async function main() {

    const url = 'http://localhost:8545'

    var customHttpProvider = new ethers.JsonRpcProvider(url)
    await customHttpProvider.getBlockNumber().then((result) => {
        console.log("Current block number: " + result);
    }).catch(error => {
        console.log(`error: ` + error)
    })

    const balance = await provider.getBalance(wallet.address)
    console.log(`balance: ` + balance)

    // const factory = new ethers.ContractFactory(abi, bytecode, wallet)
    // let nonce = await provider.getTransactionCount(wallet)

    // const txn = await factory.deploy({gasLimit: '3000000', gasPrice: '0x0', nonce: nonce})

    // const deployment = await txn.waitForDeployment()
    // console.log(await deployment.getAddress())

    // const address = await deployment.getAddress()

    // const contract = new ethers.Contract(
    //     address,
    //     abi,
    //     signer
    // )

    // contract['number'].staticCall().then(result => {
    //     console.log(`result: ` + result)
    // }).catch(error => {
    //     console.log(`error: ` + error)
    // })

    // nonce = await provider.getTransactionCount(wallet)
    // let increment00 = await contract.increment({gasLimit: '3000000', gasPrice: '0x0', nonce: nonce})
    // await increment00.wait()

    // nonce = await provider.getTransactionCount(wallet)
    // let increment01 = await contract.increment({gasLimit: '3000000', gasPrice: '0x0', nonce: nonce})
    // await increment01.wait()

    // let output = await contract.number()
    // console.log(output)



    process.exit()
}




main()