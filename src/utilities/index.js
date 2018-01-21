const { getActiveFarmersEthAdd } = require('../database/queries')
const { getWeatherInfo } = require('../api')

const maxSafeAvocadoTemp = 311

const checkForCropFailure = () => {

  getWeatherInfo()
    .then(weatherInfo => {
      const maxTemp = weatherInfo.main.temp_max

      if (maxTemp >= maxSafeAvocadoTemp) {
        getActiveFarmersEthAdd()
          .then(addresses => {
            addresses.forEach(address => {
              // call contract pay method
            })
          })
          .catch(console.error)
      }
    })
    .catch(console.error)

}

module.exports = { checkForCropFailure }
