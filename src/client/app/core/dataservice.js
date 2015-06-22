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

        this.getSteps = function () {
            if (!steps.length) {
                steps = $window.steps;
            }
            return steps;
        }

        this.getFirstStep = function () {
            return this.getSteps()[0];
        }

        this.getStep = function (state) {
            var step = _.find(this.getSteps(), {'state': state});
            return step;
        }

        this.activateStep = function (step) {
            step.isActive = true;
        }

        service.deactivateStep = function (step) {
            step.isActive = false;
        }

        this.getNextStep = function (state) {
            var step = this.getStep(state);
            var idx = getStepIndex(step);
            var nextStep = this.getSteps()[idx + 1];
            return nextStep;
        }

        this.getPrevStep = function (state) {
            var step = this.getStep(state);
            var idx = getStepIndex(step);
            var prevStep = this.getSteps()[idx - 1];
            return prevStep;
        }

        this.redirectUnlessActive = function (step) {
            if(!step.isActive) {
                var lastStep = getActiveStep();
                if(lastStep) {
                    $state.go(lastStep.state);
                } else {
                    $state.go('/');
                }
            }
        }

        var = getStepIndex = function (step) {
            return _.indexOf(getSteps(), step);
        }

        var = getActiveStep = function () {
            return _.findLast(steps, 'isActive', true);
        }

        this.getPremiumCalculator = function () {
            return premiumCalculator;
        }

        this.addClient = function () {

        }
        
        return this;
    }
})();
