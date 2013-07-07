module Maps {
    export class LocationFieldType extends Map {

        $lat: any;
        $lng: any;
        geocoder: any;

        constructor(name: string, lat?: number, lng?: number, options?: any) {
            // Create the markers array for parent constructor            
            var markers = [];
            if (lat != null && lng != null) {
                markers = [{
                    lat: lat,
                    lng: lng
                }];
            }

            // Get all those DOM elements
            this.$lat = $('#' + name + 'Lat');
            this.$lng = $('#' + name + 'Lng');

            // Create the geocoder
            this.geocoder = new Maps.Geocoder(name);

            // Call the constructor
            super(name, JSON.stringify(markers), options);

            // Hello, someone there?
            this.addListeners();
        }

        addListeners() {
            var _this = this;

            // Add marker on click
            google.maps.event.addListener(this.map, 'click', function (event) {
                _this.addMarker(event.latLng);
            });

            // Listen to changes on the latitude & longitude fields
            this.$lat.change(function () {
                _this.updateMarkerPosition(_this.$lat.val(), _this.$lng.val());
            });
            this.$lng.change(function () {
                _this.updateMarkerPosition(_this.$lat.val(), _this.$lng.val());
            });

            // Listen to geocoding events
            this.geocoder.$address.on('geocoded', function(event, args) {
                // Update marker position on successful geocoding
                if (args.status == google.maps.GeocoderStatus.OK) {
                    _this.$lat.val(args.location.lat());
                    _this.$lng.val(args.location.lng());
                    _this.addMarker(args.location);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + args.status);
                }
            });
            
            
        }

        addMarker(latLng: google.maps.LatLng): google.maps.Marker {
            var _this = this;

            // We only have one marker to get that one
            var marker;
            if (this.markers.length > 0) {
                marker = this.markers[0];
                marker.setPosition(latLng);
            }
            else {
                marker = super.addMarker(latLng, true);
            }

            // Set the map center to the marker
            this.map.panTo(latLng);

            // Update the latitude and longitude fields
            _this.$lat.val(latLng.lat());
            _this.$lng.val(latLng.lng());

            // Update marker position when draging
            google.maps.event.addListener(marker, 'dragend', function (event) {
                marker.setPosition(event.latLng);
                _this.$lat.val(event.latLng.lat());
                _this.$lng.val(event.latLng.lng());
            });

            // Remove the marker on right-click
            google.maps.event.addListener(marker, 'rightclick', function (event) {
                marker.setMap(null);
                _this.markers = [];                
                _this.$lat.val(null);
                _this.$lng.val(null);
            });
            return marker;
        }

        updateMarkerPosition(lat: number, lng: number) {
            // Update marker position
            var latLng = new google.maps.LatLng(lat, lng, false);
            this.addMarker(latLng);
        }

    }
}