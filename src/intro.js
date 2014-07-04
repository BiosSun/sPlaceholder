(function(global, factory) {
    if (typeof module === 'object' && module.exports === 'object') {
        module.exports = factory();
    }
    else {
        global.sPlaceholder = factory();
    }
})(typeof window !== "undefined" ? window : this, function() {
