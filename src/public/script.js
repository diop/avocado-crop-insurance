var contractAddress = ''

var abi = [/*...*/]

var Client = web3.eth.contract(abi)
var client = Client.at(contractAddress)

function putMoneyInContract() {
  var premium = getElementById('premium')

  client.addMoneyToPot(premium, {
    gas: 30000,
    from: web3.eth.accounts[0],
    value: web3.toWei(0.01, 'ether')
  }, function(err, transactionHash) {
    console.log('transactionHash:', transactionHash)
  })
}
