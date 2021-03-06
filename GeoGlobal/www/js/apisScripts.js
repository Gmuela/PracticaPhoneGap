var language = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError,
                                                { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 }
        );
    } else {
        onError();
    }

}

function onSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getGeoNames(latitude, longitude);
}


function onError() {
    language = null;
    setLanguage();
}

function getGeoNames(latitude, longitude) {
    $.ajax({
        url: 'http://ws.geonames.org/countryCodeJSON?lat=' + latitude + '&lng=' + longitude + '&username=javacurso',
        dataType: 'json',
        success: function (data) {
            language = data.countryCode;
            setLanguage();
        },
        error: function () {
            language = null
            setLanguage();
        }
    });
}

function setLanguage() {
    var lang = null;
    if (language == null || language == "" || language == undefined) {
        if (navigator && navigator.userAgent && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
            lang = lang[1];
        }
        if (!lang && navigator) {
            if (navigator.language) {
                lang = navigator.language;
            } else if (navigator.systemLanguage) {
                lang = navigator.systemLanguage;
            } else if (navigator.userLanguage) {
                lang = navigator.userLanguage;
            }
            language = lang.substr(0, 2);
        }
    }

    $.i18n.properties({
        name: 'Messages',
        path: 'bundle/',
        mode: 'both',
        language: language.toLowerCase(),
        callback: function () {
            setTexts();
        }
    });
}
