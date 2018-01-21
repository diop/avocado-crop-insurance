const moment = require('moment')
const { getActiveFarmersEthAdd, getFarmerByAddress } = require('../database/queries')
const { getWeatherInfo } = require('../api')
const contract = require('../contract')
const { getProb } = require('../model')

const maxSafeAvocadoTemp = 311

const calculatePayment = (address) => {
  const farmerInfo = getFarmerByAddress(address)
  const premium = farmerInfo.premium

  const probSuccess = getProb({
    week: moment().week(),
    minTemp: 58,
    rainfall: 76,
    sunlightExposure: 43.22,
    elevation: 49.33,
    experience: farmerInfo.experience,
    size_of_farm: farmerInfo.size,
    technique: farmerInfo.technique,
    disease: 0
  })

  return probSuccess * premium / (1 - probSuccess)
}

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
