(function() {
    'use strict';

    angular
        .module('refro.defaultStep')
        .controller('DefaultStepController', DefaultStepController);

    DefaultStepController.$inject = ['stepData', 'dataservice'];

    /* @ngInject */
    function DefaultStepController(stepData, dataservice){
        var vm = this;
        vm.property = 'DefaultStepController';
        vm.step = stepData;

        activate();

        ////////////////

        function activate() {
            dataservice.redirectUnlessActive(vm.step);
        }
    }
})();
