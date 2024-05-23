import { JsonRpcProvider, ethers } from 'ethers'

const bytecode = '0x6060604052341561000f57600080fd5b604051602080610149833981016040528080519060200190919050505b806000819055505b505b610104806100456000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632a1afcd914605157806360fe47b11460775780636d4ce63c146097575b600080fd5b3415605b57600080fd5b606160bd565b6040518082815260200191505060405180910390f35b3415608157600080fd5b6095600480803590602001909190505060c3565b005b341560a157600080fd5b60a760ce565b6040518082815260200191505060405180910390f35b60005481565b806000819055505b50565b6000805490505b905600a165627a7a72305820d5851baab720bba574474de3d09dbeaabc674a15f4dd93b974908476542c23f00029'
const abi = '[{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initVal","type":"uint256"}],"payable":false,"type":"constructor"}]'

const provider = new JsonRpcProvider('http://localhost:8545')
const key = '0x42ae8a6a1a0f79e6704cb25c09a847b2b82eb02fa15dbb4d8aac53152abe6959'
const wallet = new ethers.Wallet(key, provider)
const signer = wallet.connect(provider)

async function main() {

    const balance00 = await provider.getBalance(wallet.address)
    console.log(`balance00: ` + balance00)

    const factory = new ethers.ContractFactory(abi, bytecode, wallet)
    let nonce = await provider.getTransactionCount(wallet)
    //const txn00 = await factory.deploy(13, {gasLimit: '300000', gasPrice: '7', nonce: nonce})
    const txn00 = await factory.deploy(13, {gasLimit: '300000', gasPrice: '0', nonce: nonce})
    const deployment = await txn00.waitForDeployment()
    const address = await deployment.getAddress()
    console.log("address: " + address)

    const contract = new ethers.Contract(
        address,
        abi,
        signer
    )
    let txn = await contract.set(999)
    await txn.wait()

    let output = await contract.get()
    console.log(output)

    const balance01 = await provider.getBalance(wallet.address)
    console.log(`balance01: ` + balance01)    

    process.exit()
}




main()