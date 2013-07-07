module Maps {
    export class Geocoder {

        geocoder: any;
        $address: any;
        $spinner: any;

        constructor(name: string) {
            // Get the dom
            this.$address = $('#' + name + 'Address');
            this.$spinner = $('#' + name + 'Spinner');

            // Init the google geocoder
            this.geocoder = new google.maps.Geocoder();

            this.addListeners();
        }

        addListeners() {
            var _this = this;
            // Prevent form submit on 'enter', geocode instead
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

            // Geocode from the content of the address field
            this.geocoder.geocode({'address': this.$address.val()}, function(results, status) {
                _this.$spinner.addClass('hidden');

                // Create the custom event
                var args = {
                    status: status, 
                    location: new google.maps.LatLng(0,0,false)
                };
                // Add geocoded data to arguments if a result is found
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng(); 
                    args.location = new google.maps.LatLng(lat, lng, false);
                }

                // Trigger the event
                _this.$address.trigger("geocoded", args);
            });
        }

    }
}