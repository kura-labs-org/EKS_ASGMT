import NodeGeocoder = require('node-geocoder');

export const geocoder = NodeGeocoder({
    provider: 'google',
    httpAdapter: 'https',
});