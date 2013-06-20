(function($) {

if (typeof Maps == 'undefined')
{
    Maps = {};
}

Maps.Location = Garnish.Base.extend({

    name: null,
    latLng: null,
    map: null,
    geocoder: null,
    $address: null,
    $lat: null,
    $lng: null,
    $map: null,
    $btn: null,
    $spinner: null,

    init: function(name, lat, lng, options) {
        // Set some basic properties here
        this.name = name;
        this.geocoder = new google.maps.Geocoder();

        // Get all those DOM elements
        this.$address = $('#' + name + 'Address');
        this.$lat = $('#' + name + 'Lat');
        this.$lng = $('#' + name + 'Lng');
        this.$map = document.getElementById(name + 'Map');
        this.$btn = $('#' + name + 'Geocode');
        this.$spinner = $('#' + name + 'Spinner');

        // Initiate google map object
        var mapOptions = Maps.Location.defaults;        
        this.map = new google.maps.Map(this.$map, mapOptions);

        // Someone's listening?
        this.addListeners();

        // Place a marker on the map if location is set
        if (lat != false && lng != false) {
            this.updateMarkerPosition(lat, lng);
            this.map.setZoom(6);
        }
    },

    addListeners: function() {
        var that = this;
        this.$lat.change(function () {
            that.updateMarkerPosition(that.$lat.val(), that.$lng.val());
        });
        this.$lng.change(function () {
            that.updateMarkerPosition(that.$lat.val(), that.$lng.val());
        });
        this.$btn.click(function () {
            that.geocode();
        });
    },

    onLatLngFieldsChange: function() {
        that.updateMarkerPosition(this.$lat.val(), this.$lng.val());
    },

    updateMarkerPosition: function(lat, lng) {
        this.map.clearMarkers();
        this.latLng = new google.maps.LatLng(lat, lng, false);
        this.map.panTo(this.latLng);
        this.addMarker(this.latLng);
    },

    geocode: function() {
        this.$spinner.removeClass('hidden');
        var that = this;
        that.geocoder.geocode({'address': this.$address.val()}, function(results, status) {
            that.$spinner.addClass('hidden');
            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                that.$lat.val(lat);
                that.$lng.val(lng);
                that.updateMarkerPosition(lat, lng);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    },

    addMarker: function(latLng) {
        var marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            draggable: true
        });
        var that = this;
        google.maps.event.addListener(marker, 'dragend', function (event) {
            that.latLng = event.latLng;
            that.$lat.val(event.latLng.lat());
            that.$lng.val(event.latLng.lng());
        });
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