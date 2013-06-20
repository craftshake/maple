(function($) {

var geocoder;
var map;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(46.1983922, 6.1422961);
    var mapOptions = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    if ($('#latLng')) {
        var location = new google.maps.LatLng($('#geo-lat').val(), $('#geo-lng').val(), true);
        addMarker(map, location);
        map.setCenter(location);
    }
}

function codeAddress() {
    $('#geocode-spinner').removeClass('hidden');
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        $('#geocode-spinner').addClass('hidden');
        if (status == google.maps.GeocoderStatus.OK) {
            map.clearMarkers();
            map.panTo(results[0].geometry.location);
            addMarker(map, results[0].geometry.location)
            updateLatLng(results[0].geometry.location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function addMarker(map, latLng) {
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function (event) {
        updateLatLng(event.latLng);
    });
}

function updateLatLng(latLng) {
    $('#geo-lat').val(latLng.lat());
    $('#geo-lng').val(latLng.lng());
}

google.maps.visualRefresh = true;
google.maps.event.addDomListener(window, 'load', initialize);

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