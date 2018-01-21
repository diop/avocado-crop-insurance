var contractAddress = '0xa5f5665cb7cddce66c6227eada48b96e75303769'

var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_funds",
				"type": "uint256"
			}
		],
		"name": "depositFunds",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_recipient",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "disbursePayment",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "ownerWithdraw",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
]

var Client = web3.eth.contract(abi)
var client = Client.at(contractAddress)

function putMoneyInContract() {
  var premium = getElementById('premium')

  client.depositFunds(premium, {
    gas: 30000,
    from: web3.eth.accounts[0],
    value: web3.toWei(0.01, 'ether')
  }, function(err, transactionHash) {
    console.log('transactionHash:', transactionHash)
  })
}
