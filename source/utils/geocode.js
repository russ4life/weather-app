const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9tNGxpZmUiLCJhIjoiY2p5MGgzdDgyMDAxZzNub2liaTNwZjlvdCJ9.Z0Quc6serUCbQjFrAgYEKA&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else {
            const features = body.features
            if (features.length === 0) {
                callback('Unable to find to location!', undefined)
            } else {
                const feature = features[0]
                const center = feature.center
                const latitude = center[0]
                const longitude = center[1]
                callback(undefined, {
                    latitude: center[1],
                    longitude: center[0],
                    location: feature.place_name
                })
            }
        }
    })
}
module.exports = geocode