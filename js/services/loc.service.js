export const locService = {
    getLocs,
    addLocation,

}
import { utils } from '../../utils/utils.js'

const LOCS_KEY = 'My_Locations'
const locs = utils.loadFromStorage(LOCS_KEY) || []



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

