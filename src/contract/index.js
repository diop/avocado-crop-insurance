const { client, web3 } = require('./config')

const disbursePayment = (address, amount) => {
  client.disbursePayment(address, amount, {
    gas: 30000,
    from: web3.eth.accounts[0]
  }, function(err, transactionHash) {
    if (err) console.error(err)
    console.log('transactionHash:', transactionHash)
  })
}

module.exports = { disbursePayment }
