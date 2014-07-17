(function(global, factory) {
    var sPlaceholder = factory(window, document, undefined);

    if (typeof module === 'object' && module.exports === 'object') {
        module.exports = sPlaceholder;
    }
    else {
        global.sPlaceholder = sPlaceholder;
    }
})(typeof window !== "undefined" ? window : this, function(window, document, undefined) {
