(function() {
    'use strict';

    angular
        .module('refro.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['config', 'logger'];
    /* @ngInject */
    function ShellController(config, logger) {
        var vm = this;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
        }
    }
})();
