const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/47a833a6f8622f1ba579f7175e967a1d/' + latitude + ',' + longitude + '?units=si';
    request({ url, json: true }, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else {
            if(body.error){
                callback('Unable to find to location!', undefined)
            } else {
                const {daily, currently} = body
                const summary = daily.data[0].summary
                callback(undefined, summary + ' Is is currently ' + currently.temperature + ' degrees out. The is a ' + currently.precipProbability + '% chance of rain.')
            }
        }
    })
}
module.exports = forecast