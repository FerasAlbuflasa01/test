// Initialize and add the map
let map
let userMarker
const initMap = async () => {
  const response = await axios.get('http://127.0.0.1:8000/location/load')
  const { Map } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
  //init map
  let position
  if (response.data.status !== 'faild') {
    position = {
      lat: response.data.lat,
      lng: response.data.lng
    }
  } else {
    position = { lat: -34.397, lng: 150.644 }
  }
  map = new Map(document.getElementById('map'), {
    zoom: 17,
    center: position,
    mapId: 'DEMO_MAP_ID'
  })
  userMarker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'Uluru'
  })

  setInterval(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      let position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      console.log(pos.coords)
      if (pos.coords.accuracy >= 149) {
        sendUpdateLocation(position)
        map.setCenter(position)

        // The marker, positioned at Uluru
        if (!userMarker) {
          userMarker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: 'Uluru'
          })
        } else {
          // Move the existing marker to the new position
          userMarker.position = position
        }
      }
    })
  }, 5000)

  // The map, centered at Uluru
}
const sendUpdateLocation = async (pos) => {
  let response = axios.post('http://127.0.0.1:8000/location/save', pos)
}

initMap()

