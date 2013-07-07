module Maps {
    export class MapFieldType extends Map {

        geocoder: any;

        constructor(name: string, markers?: any = [], options?: any) {
            // Call the parent constructor
            super(name, markers, options);

            // Create the geocoder
            this.geocoder = new Maps.Geocoder(name);

            // Someone's listening?
            this.addListeners();
        }

        addListeners() {
            var _this = this;

            // Add marker on click
            google.maps.event.addListener(this.map, 'click', function (event) {
                _this.addMarker(event.latLng);
            });

            // Prepare value for saving to the database
            $('#content form').submit(function () {
                var marker;
                var locations = [];
                for (var i = 0; i < _this.markers.length; i++) {
                    marker = _this.markers[i];
                    locations.push({
                        lat: marker.position.lat(),
                        lng: marker.position.lng()
                    });
                }
                var value = {
                    locations: locations,
                    options: {
                        zoom: _this.map.getZoom(),
                        center: _this.map.getCenter(),
                        mapTypeId: _this.map.getMapTypeId()
                    }
                }
                $('#' + _this.name + 'Value').val(JSON.stringify(value));
                return true;
            });

            // Listen to geocoding events
            this.geocoder.$address.on('geocoded', function(event, args) {
                // Update marker position on successful geocoding
                if (args.status == google.maps.GeocoderStatus.OK) {
                    _this.addMarker(args.location);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + args.status);
                }
            });
        }

        addMarker(latLng: google.maps.LatLng): google.maps.Marker {
            var _this = this;

            // Add marker to the map
            var marker = super.addMarker(latLng, true);

            // Remove the marker on right-click
            google.maps.event.addListener(marker, 'rightclick', function (event) {
                _this.markers.splice(_this.markers.indexOf(marker), 1)
                marker.setMap(null);
            });
            return marker;
        }

    }
}