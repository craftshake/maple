module Maps {
    export class LocationFieldType extends Map {

        geocoder: any;
        $address: any;
        $lat: any;
        $lng: any;
        $map: any;
        $spinner: any;

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
            this.$address = $('#' + name + 'Address');
            this.$lat = $('#' + name + 'Lat');
            this.$lng = $('#' + name + 'Lng');
            this.$spinner = $('#' + name + 'Spinner');

            super(name, JSON.stringify(markers), options);

            // Init the geocoder
            this.geocoder = new google.maps.Geocoder();

            // Hello, someone there?
            this.addListeners();
        }

        addListeners() {
            var _this = this;
            google.maps.event.addListener(this.map, 'click', function (event) {
                _this.addMarker(event.latLng);
            });
            this.$lat.change(function () {
                _this.updateMarkerPosition(_this.$lat.val(), _this.$lng.val());
            });
            this.$lng.change(function () {
                _this.updateMarkerPosition(_this.$lat.val(), _this.$lng.val());
            });
            this.$address.keydown(function (event) {
                if(event.keyCode == 13) {
                    event.preventDefault();
                    _this.geocode();
                    return false;
                }      
            });
        }

        geocode() {
            this.$spinner.removeClass('hidden');
            var _this = this;
            _this.geocoder.geocode({'address': this.$address.val()}, function(results, status) {
                _this.$spinner.addClass('hidden');
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    _this.$lat.val(lat);
                    _this.$lng.val(lng);
                    _this.updateMarkerPosition(lat, lng);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
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
            google.maps.event.addListener(marker, 'dragend', function (event) {
                marker.setPosition(event.latLng);
                _this.$lat.val(event.latLng.lat());
                _this.$lng.val(event.latLng.lng());
            });
            google.maps.event.addListener(marker, 'rightclick', function (event) {
                marker.setMap(null);
                _this.markers = [];                
                _this.$lat.val(null);
                _this.$lng.val(null);
            });
            return marker;
        }

        updateMarkerPosition(lat: number, lng: number) {
            var latLng = new google.maps.LatLng(lat, lng, false);
            this.map.panTo(latLng);
            this.addMarker(latLng);
        }

    }
}