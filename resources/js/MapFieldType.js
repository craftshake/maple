(function($) {

if (typeof Maps == 'undefined')
{
    Maps = {};
}

Maps.MapFieldType = Garnish.Base.extend({

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
                zoom: options.zoom || Maps.MapFieldType.defaults.zoom,
                center: options.center ? new google.maps.LatLng(options.center.jb, options.center.kb, false) : Maps.MapFieldType.defaults.center,
                mapTypeId: options.mapTypeId || Maps.MapFieldType.defaults.mapTypeId
            };
        }
        else {
            mapOptions = Maps.MapFieldType.defaults
        }
        this.map = new google.maps.Map(this.$map, mapOptions);

        // Someone's listening?
        this.addListeners();

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

    addListeners: function() {
        var that = this;
        google.maps.event.addListener(this.map, 'click', function (event) {
            that.addMarker(event.latLng);
        });
        $('#content form').submit(function () {
            var marker;
            var locations = [];
            for (var i = 0; i < that.markers.length; i++) {
                marker = that.markers[i];
                locations.push({
                    lat: marker.position.lat(),
                    lng: marker.position.lng()
                });
            }
            var value = {
                locations: locations,
                options: {
                    zoom: that.map.getZoom(),
                    center: that.map.getCenter(),
                    mapTypeId: that.map.getMapTypeId()
                }
            }
            $('#' + that.name + 'Value').val(JSON.stringify(value));
            return true;
        });
    },

    addMarker: function(latLng) {
        var marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            draggable: true
        });
        var that = this;
        google.maps.event.addListener(marker, 'rightclick', function (event) {
            that.markers.splice(that.markers.indexOf(marker), 1)
            marker.setMap(null);
            console.log(that.markers);
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

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    "use strict";
    if (this == null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;

    if (len === 0) {
      return -1;
    }
    var n = 0;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n != 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    if (n >= len) {
      return -1;
    }
    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  }
}

})(jQuery);