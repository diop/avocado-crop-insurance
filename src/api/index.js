var fetch = require('node-fetch');

const getWeatherInfo = () =>
    fetch('http://samples.openweathermap.org/data/2.5/weather?q=california&appid=b489d75d3faca95a1d3b49cb7b7757c9', {
        method: 'GET'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

module.exports = { getWeatherInfo }
