(function() {
    'use strict';

    angular
        .module('refro.personen')
        .controller('PersonenController', PersonenController);

    PersonenController.$inject = ['stepData', 'dataservice'];

    /* @ngInject */
    function PersonenController(stepData, dataservice){
        var vm = this;
        vm.property = 'PersonenController';
        vm.step = stepData;
        vm.premiumCalculator = null;
        vm.hasSelected = false;
        vm.addClients = addClients;

        activate();

        ////////////////

        function activate() {
            console.log(stepData);
            dataservice.redirectUnlessActive(vm.step);
            vm.premiumCalculator = dataservice.getPremiumCalculator();
        }

        function addClients(count) {
            for (var i=0; i < count; i++) {
                dataservice.addClient();
            }
            vm.hasSelected = true;
        }
    }
})();
