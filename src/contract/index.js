const Web3 = require('web3')
const web3 = new Web3()

const contractAddress = ''

const abi = [/*...*/]

const Client = web3.eth.contract(abi)
const client = Client.at(contractAddress)

module.exports = client
