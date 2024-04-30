import { JsonRpcProvider, ethers } from 'ethers'

const bytecode = '0x6080604052348015600f57600080fd5b5060f78061001e6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220ad9ea96ce40e6c478bf71447c7d4a4c4927ff1516d6a80ee7683c794a67666a364736f6c63430008190033'
const abi = '[ { "type": "function", "name": "increment", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "number", "inputs": [], "outputs": [ { "name": "", "type": "uint256", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "setNumber", "inputs": [ { "name": "newNumber", "type": "uint256", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" } ]'

const provider = new JsonRpcProvider('http://localhost:8545')
const key = '8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'
const wallet00 = new ethers.Wallet(key, provider)
const signer00 = wallet00.connect(provider)

async function main() {
    const factory = new ethers.ContractFactory(abi, bytecode, wallet00)
    let nonce = await provider.getTransactionCount(wallet00)
    const txn00 = await factory.deploy({gasLimit: '3000000', gasPrice: '0x0', nonce: nonce})
    const deployment = await txn00.waitForDeployment()
    const address = await deployment.getAddress()


    for (let i = 0; i < 1000; i++) {
        const wallet = ethers.Wallet.createRandom(provider)
        const signer = wallet.connect(provider)      
        const contract = new ethers.Contract(
            address,
            abi,
            signer
        )
        await contract.increment({gasLimit: '3000000', gasPrice: '0x0', nonce: 0})
    }

    await new Promise(f => setTimeout(f, 1_000));

    const contract = new ethers.Contract(
        address,
        abi,
        signer00
    )
    let output = await contract.number()
    console.log(output)

    

    process.exit()
}




main()