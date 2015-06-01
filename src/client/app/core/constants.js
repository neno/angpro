/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('refro.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
