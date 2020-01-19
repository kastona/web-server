const request = require('request')

const geocode = (address, callback) => {

    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2FzdG9uYSIsImEiOiJjazVmMGU4bnQwNHB3M2VwZjF0YTB0Y3BnIn0.J3OsJ5uiPyZx5aoKioK-rw&limit=1`

    request({url: geoUrl, json: true}, (error, response, body) => {
        if(error) {
            callback('Unable to connect', undefined)
        } else if(body.features.length <1) {
            callback('location not found. Search another', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode