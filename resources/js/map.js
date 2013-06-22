(function($) {

if (typeof Maps == 'undefined')
{
    Maps = {};
}

Maps.Map = Garnish.Base.extend({

    name: null,
    map: null,
    markers: [],
    $map: null,

    init: function(name, markers, options) {
        // Set some basic properties here
        this.name = name;

        // Get all those DOM elements
        this.$map = document.getElementById(name + 'Map');

        // Initiate google map object
        var mapOptions;
        if (options) {
            options = JSON.parse(options);
            mapOptions = {
                zoom: options.zoom || Maps.Map.defaults.zoom,
                center: options.center ? new google.maps.LatLng(options.center.jb, options.center.kb, false) : Maps.Map.defaults.center,
                mapTypeId: options.mapTypeId || Maps.Map.defaults.mapTypeId
            };
        }
        else {
            mapOptions = Maps.Map.defaults
        }
        this.map = new google.maps.Map(this.$map, mapOptions);

        // Place existing markers on map
        if (markers) {
            markers = JSON.parse(markers);
            var marker;
            for (var i = 0; i < markers.length; i++) {
                marker = markers[i];
                this.addMarker(new google.maps.LatLng(marker.lat, marker.lng, false));
            }
        }
    },

    addMarker: function(latLng) {
        var marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            draggable: false
        });
        this.markers.push(marker);
    }

},
{

    defaults: {
        zoom: 1,
        center: new google.maps.LatLng(0, 0, false),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

});

google.maps.visualRefresh = true;

google.maps.Map.prototype.markers = new Array();

google.maps.Map.prototype.getMarkers = function() {
    return this.markers
};

google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i<this.markers.length; i++){
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};

google.maps.Marker.prototype._setMap = google.maps.Marker.prototype.setMap;

google.maps.Marker.prototype.setMap = function(map) {
    if (map) {
        map.markers[map.markers.length] = this;
    }
    this._setMap(map);
}

})(jQuery);