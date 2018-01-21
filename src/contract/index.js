const Web3 = require('web3')

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

const contractAddress = ''

const abi = [/*...*/]

const Client = web3.eth.contract(abi)
const client = Client.at(contractAddress)

module.exports = client
