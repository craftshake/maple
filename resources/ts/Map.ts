module Maps {
    export class Map {

        static defaults = {
            zoom: 1,
            center: new google.maps.LatLng(0, 0, false),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        name: string;
        map: any;
        markers: any[];
        $map: any;

        // Map constructor
        constructor (name: string, markers?: any, options?: any) {
            // Set the name of the map
            this.name = name;
            // Initialise markers, the real markers will be added in addMarker method
            this.markers = [];
            // Get the map dom element
            this.$map = document.getElementById(name + 'Map');

            // Set map options if available
            var mapOptions;
            if (options) {
                options = JSON.parse(options);
                mapOptions = {
                    zoom: options.zoom || Map.defaults.zoom,
                    center: options.center ? new google.maps.LatLng(options.center.jb, options.center.kb, false) : Map.defaults.center,
                    mapTypeId: options.mapTypeId || Map.defaults.mapTypeId
                };
            }
            else {
                mapOptions = Map.defaults
            }

            // Create the google map
            this.map = new google.maps.Map(this.$map, mapOptions);

            // Place existing markers on the map
            if (markers) {
                markers = JSON.parse(markers);
                var marker;
                for (var i = 0; i < markers.length; i++) {
                    marker = markers[i];
                    this.addMarker(new google.maps.LatLng(marker.lat, marker.lng, false));
                }
            }
        }

        // Add a marker to the map
        addMarker(latLng: google.maps.LatLng, draggable?: bool = false): google.maps.Marker {
            var marker = new google.maps.Marker({
                map: this.map,
                position: latLng,
                draggable: draggable
            });
            this.markers.push(marker);
            return marker;
        }

    }
}
