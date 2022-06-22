import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


const geoLoc_api = 'AIzaSyCjyt9JH-BnnLclS-0NmV9aUE7gv8ZtUHo'
var geoLoc_url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${geoLoc_api}`



function getCoords(val){
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${val},+&key=${geoLoc_api}`)
    .then(res => res.data)
    .then(pos => pos.results[0])
    .then(pos => pos.geometry.location)
}

function setAdress({lat,lng}) {
    // console.log(pos);
    mapService.initMap(lat , lng)
}

function onSetAdress(val) {
    getCoords(val).then(pos => setAdress(pos))
}   


window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));      
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    var elSearchInput = document.querySelector('.search-container input').value
    onSetAdress(elSearchInput)
    console.log('Adding a marker');
    mapService.initMap()
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {

    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}