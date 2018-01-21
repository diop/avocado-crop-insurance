var fetch = require('node-fetch');

const headers = {
    'Accept': 'application/json'
};

const getWeatherInfo = () =>
    fetch('http://samples.openweathermap.org/data/2.5/weather?q=california&appid=b489d75d3faca95a1d3b49cb7b7757c9', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

module.exports = { getWeatherInfo, getWeatherInfo }