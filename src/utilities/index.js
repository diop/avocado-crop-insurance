const moment = require('moment')
const {
  getActiveFarmersEthAdd,
  getFarmerByAddress,
  deactivateFarmer
} = require('../database/queries')
const { getWeatherInfo } = require('../api')
const { getProb } = require('../model')
const { disbursePayment } = require('../contract')

const maxSafeAvocadoTemp = 311

const calculatePayment = (address) => {
  return getFarmerByAddress(address)
    .then(farmerInfo => {
      const premium = farmerInfo.premium

      const probSuccess = getProb({
        week: moment().week(),
        minTemp: 58,
        rainfall: 76,
        sunlightExposure: 43.22,
        elevation: 49.33,
        experience: farmerInfo.experience,
        size_of_farm: farmerInfo.size,
        technique: farmerInfo.technique === 'hand' ? 0 : 1,
        disease: 0
      })

      return probSuccess * premium / (1 - probSuccess)
    })
    .catch(console.error)
}

const checkForCropFailure = (force) => {

  return getWeatherInfo()
    .then(weatherInfo => {
      const maxTemp = weatherInfo.main.temp_max

      if (maxTemp >= maxSafeAvocadoTemp || force) {
        return getActiveFarmersEthAdd()
          .then(addresses => {
            addresses.forEach(address => {
              calculatePayment(address.ethaddress)
                .then(paymentAmount => {
                  disbursePayment(address.ethaddress, paymentAmount)
                  deactivateFarmer(address.ethaddress)
                    .catch(console.error)
                })
                .catch(console.error)
            })
          })
          .catch(console.error)
          .then(() => {
            return `Payments dispersed`
          })
          .catch(console.error)
      } else {
        return `Max temp today was ${Math.round(9/5*(maxTemp-273)+32)}°F which is less than 100°F, the maximum safe temperature for acocados`
      }
    })
    .catch(console.error)

}

module.exports = { checkForCropFailure }
