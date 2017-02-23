function getLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, null);
}

function onSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getGeoNames(latitude, longitude);
}
;

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function getGeoNames(latitude, longitude) {
    $.ajax({
        url: 'http://ws.geonames.org/countryCodeJSON?lat=' + latitude + '&lng=' + longitude + '&username=demo',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            locale_lang = data.countryCode;
        }
    });
}