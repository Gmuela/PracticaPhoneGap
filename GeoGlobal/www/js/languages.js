function setLanguage(language) {

    var lang = "";

    if (language == null) {
        if (navigator && navigator.userAgent && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
            lang = lang[1];
        }

        if (!lang && navigator) {
            if (navigator.language) {
                lang = navigator.language;
            } else if (navigator.browserLanguage) {
                lang = navigator.browserLanguage;
            } else if (navigator.systemLanguage) {
                lang = navigator.systemLanguage;
            } else if (navigator.userLanguage) {
                lang = navigator.userLanguage;
            }
            lang = lang.substr(0, 2);
        } else {
            lang = language;
        }
    }

    $.i18n.properties({
        name: 'Messages',
        path: 'bundle/',
        mode: 'both',
        language: lang,
        callback: function () {
            setTexts();
        }
    });
}