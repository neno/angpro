(function() {
    'use strict';

    angular
        .module('refro.steps')
        .controller('StepsController', StepsController);

    StepsController.$inject = ['initialData', 'dataservice', '$state', '_'];

    /* @ngInject */
    function StepsController(initialData, dataservice, $state, _){
        var vm = this;
        vm.property = 'StepsController';
        vm.steps = initialData;
        vm.isCurrent = isCurrent;
        vm.getPrevStep = getPrevStep;
        vm.getNextStep = getNextStep;
        vm.gotoPrevStep = gotoPrevStep;
        vm.gotoNextStep = gotoNextStep;

        activate();

        ////////////////

        function activate() {
            deactivateAllSteps();
            activateFirstStep();
        }

        function deactivateAllSteps() {
            _.each(vm.steps, function(step) {
                if(typeof(step.isActive) === 'undefined') {
                    // dataservice.deactivateStep(step);
                    dataservice.activateStep(step); // !!!! TODO: DON'T FORGET TO RESET THIS TO DEACTIVATE AFTER TESTING !!!!!
                }
            });
        }

        function activateFirstStep() {
            var firstStep = dataservice.getFirstStep();
            dataservice.activateStep(firstStep);
            $state.go(firstStep.state);
        }

        function isCurrent(step) {
            return $state.current.name === step.state;
        }

        function getPrevStep() {
            return dataservice.getPrevStep($state.current.name);
        }

        function getNextStep() {
            return dataservice.getNextStep($state.current.name);
        }

        function gotoPrevStep() {
            var prevStep = getPrevStep();
            if (prevStep) {
                $state.go(prevStep.state);
            }
        }

        function gotoNextStep() {
            var nextStep = getNextStep();
            console.log(nextStep);
            if (nextStep) {
                $state.go(nextStep.state);
            }
        }


    }
})();
