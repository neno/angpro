(function () {
    'use strict';

    angular
        .module('refro.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', '$window', '$state', 'logger', '_'];
    /* @ngInject */
    function dataservice($http, $q, $window, $state, logger, _) {
        var steps = [];
        var premiumCalculator = {};
        var service = {
            getSteps: getSteps,
            getFirstStep: getFirstStep,
            getStep: getStep,
            redirectUnlessActive: redirectUnlessActive,
            activateStep: activateStep,
            deactivateStep: deactivateStep,
            getNextStep: getNextStep,
            getPrevStep: getPrevStep,
            getPremiumCalculator: getPremiumCalculator,
            addClient: addClient
        };

        return service;

        function getSteps() {
            if (!steps.length) {
                steps = $window.steps;
            }
            return steps;
        }

        function getFirstStep() {
            return getSteps()[0];
        }

        function getStep(state) {
            var step = _.find(getSteps(), {'state': state});
            return step;
        }

        function activateStep(step) {
            step.isActive = true;
        }

        function deactivateStep(step) {
            step.isActive = false;
        }

        function getNextStep(state) {
            var step = getStep(state);
            var idx = getStepIndex(step);
            var nextStep = getSteps()[idx + 1];
            return nextStep;
        }

        function getPrevStep(state) {
            var step = getStep(state);
            var idx = getStepIndex(step);
            var prevStep = getSteps()[idx - 1];
            return prevStep;
        }

        function redirectUnlessActive(step) {
            if(!step.isActive) {
                var lastStep = getActiveStep();
                if(lastStep) {
                    $state.go(lastStep.state);
                } else {
                    $state.go('/');
                }
            }
        }

        function getStepIndex(step) {
            return _.indexOf(getSteps(), step);
        }

        function getActiveStep() {
            return _.findLast(steps, 'isActive', true);
        }

        function getPremiumCalculator() {
            return premiumCalculator;
        }

        function addClient() {

        }
    }
})();
