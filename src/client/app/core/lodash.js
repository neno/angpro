(function () {
    'use strict';

    angular
        .module('refro.core')
        .factory('_', _);

    _.$inject = ['$window'];

    function _($window) {
        return $window._;
    }

})();
