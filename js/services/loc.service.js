export const locService = {
    getLocs,
    addLocation,
    setUserLocation,
    centerMapOnUser,
}
import { utils } from '../../utils/utils.js'

const LOCS_KEY = 'My_Locations'
const locs = utils.loadFromStorage(LOCS_KEY) || []

let gMap

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocation(name, lat, lng, id) {
    const loc = {
        id,
        name,
        lat,
        lng,
        weather: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    locs.push(loc)
    utils.saveToStorage(LOCS_KEY, locs)
    console.log(locs)
    return loc
}

function setUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(centerMapOnUser)
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}

function centerMapOnUser(position) {
    const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }

    console.log('Centering on', center)
    gMap.setCenter(center)
}
