const { getActiveFarmersEthAdd } = require('../database/queries')
const { getWeatherInfo } = require('../api')
const contract = require('../contract')
const { calculatePayment } = require('../models')

const maxSafeAvocadoTemp = 311

const checkForCropFailure = () => {

  getWeatherInfo()
    .then(weatherInfo => {
      const maxTemp = weatherInfo.main.temp_max

      if (maxTemp >= maxSafeAvocadoTemp) {
        getActiveFarmersEthAdd()
          .then(addresses => {
            addresses.forEach(address => {
              const paymentAmount = calculatePayment(address)

              contract.disbursePayment(paymentAmount, address)
            })
          })
          .catch(console.error)
      }
    })
    .catch(console.error)

}

module.exports = { checkForCropFailure }
