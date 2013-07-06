module Maps {
    export class MapFieldType extends Map {

        constructor(name: string, markers?: any = [], options?: any) {
            super(name, markers, options);

            // Someone's listening?
            this.addListeners();
        }

        addListeners() {
            var _this = this;
            google.maps.event.addListener(this.map, 'click', function (event) {
                _this.addMarker(event.latLng);
            });
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
        }

        addMarker(latLng: google.maps.LatLng): google.maps.Marker {
            var _this = this;
            var marker = super.addMarker(latLng, true);
            google.maps.event.addListener(marker, 'rightclick', function (event) {
                _this.markers.splice(_this.markers.indexOf(marker), 1)
                marker.setMap(null);
                console.log(_this.markers);
            });
            return marker;
        }

    }
}