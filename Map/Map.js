var map, infoWindow, service;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 18
    });
    infoWindow = new google.maps.InfoWindow;
    map.setOptions({ styles: styles["hide"] })
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            //Put marker of the Geolocated user location
            var userMarker = new google.maps.Marker({
                map: map,
                position: pos
            });

            google.maps.event.addListener(userMarker, 'click', function() {
                infoWindow.setContent('Your location');
                infoWindow.open(map, this);
            });

            //Put request in here there are 3 requests since nearbysearch only has one type to be specified
            var requestAirport = {
                location: pos,
                radius: '150',
                type: ['airport']
            };
            var requestMuseum = {
                location: pos,
                radius: '150',
                type: ['museum']
            };
            var requestChurch = {
                location: pos,
                radius: '150',
                type: ['church']
            };
            var requestStadium = {
                location: pos,
                radius: '150',
                type: ['stadium']
            };
            var requestTrainStation = {
                location: pos,
                radius: '150',
                type: ['train_station']
            };
            var requestUniversity = {
                location: pos,
                radius: '150',
                type: ['university']
            };
            var requestZoo = {
                location: pos,
                radius: '150',
                type: ['zoo']
            };
            var requestLibrary = {
                location: pos,
                radius: '150',
                type: ['library']
            };
            var requestAquarium = {
                location: pos,
                radius: '150',
                type: ['aquarium']
            };
            var requestArtGallery = {
                location: pos,
                radius: '150',
                type: ['art_gallery']
            };

            //Make Places Service requests here
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(requestAirport, callback);
            service.nearbySearch(requestMuseum, callback);
            service.nearbySearch(requestChurch, callback);
            service.nearbySearch(requestStadium, callback);
            service.nearbySearch(requestTrainStation, callback);
            service.nearbySearch(requestUniversity, callback);
            service.nearbySearch(requestZoo, callback);
            service.nearbySearch(requestLibrary, callback);
            service.nearbySearch(requestAquarium, callback);
            service.nearbySearch(requestArtGallery, callback);


        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var icon = {
        url: "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",
        scaledSize: new google.maps.Size(40, 40),
    };

//put marker of the places in the map
    var marker = new google.maps.Marker({
        //url: 'https://agataparietti.github.io/AgataParietti.github.io./Index.html',
        map: map,
        icon: icon,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
        //window.location.href = marker.url;
        getInfo(place.name);
    });
}

const styles = {
    default: [],
    hide: [
        {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
    ],
};

function getInfo(place) {
    var request = new XMLHttpRequest();
    var url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours&key=";
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                document.body.className = 'ok';
                console.log(request.responseText);
            } else if (request.response == null && request.status === 0) {
                document.body.className = 'error offline';
                console.log("The computer appears to be offline.");
            } else {
                document.body.className = 'error';
            }
        }
    };
    request.open("GET", url, true);
    request.send(null);
}
