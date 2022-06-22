export const locService = {
    getLocs,
    addLocation,
}
import { utils } from '../../utils/utils.js'

const LOCS_KEY = 'My_Locations'


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocation(name, lat, lng,id) {
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
    utils.saveToStorage(LOCS_KEY , locs)
    console.log(locs)
    return loc
}

