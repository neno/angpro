(function () {
    'use strict';

    angular
        .module('refro.steps')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'dataservice', '$state', '_', '$stateParams'];

    function appRun(routerHelper, dataservice, $state, _, $stateParams) {
        routerHelper.configureStates(getStates());
        routerHelper.configureStates(getDynamicStates(routerHelper, dataservice, $state, _, $stateParams));
    }

    function getStates() {
        return [
            {
                state: 'steps',
                config: {
//                    abstract: true,
                    url: '/',
                    templateUrl: 'app/steps/steps.html',
                    controller: 'StepsController',
                    controllerAs: 'vm',
                    resolve: {
                        initialData: ['dataservice', function(dataservice) {
                            return dataservice.getSteps();
                        }]
                    }
                }
            },
            {
                state: 'steps.personen',
                config: {
                    url: 'personen',
                    views: {
                        'tabContent': {
                            templateUrl: 'app/personen/personen.html',
                            controller: 'PersonenController',
                            controllerAs: 'vm',
                            resolve: {
                                stepData: ['dataservice', function(dataservice) {
                                    return dataservice.getStep('steps.personen');
                                }]
                            }
                        }
                    }
                }
            },
            {
                state: 'steps.personal-data',
                config: {
                    url: 'personal-data',
                    views: {
                        'tabContent': {
                            templateUrl: 'app/personal-data/personal-data.html',
                            controller: 'PersonalDataController',
                            controllerAs: 'vm',
                            resolve: {
                                stepData: ['dataservice', function(dataservice) {
                                    return dataservice.getStep('steps.personal-data');
                                }]
                            }
                        }
                    }
                }
            }
        ];
    }

    function getDynamicStates(routerHelper, dataservice, $state, _, $stateParams) {
        var dynStates = [],
            steps = dataservice.getSteps(),
            states = routerHelper.getStates();

        states = _.pluck(states, 'name');

        // Collect all states that are not defined above in getStates
        _.each(steps, function(step) {
            if(!_.includes(states, step.state)) {
                dynStates.push({
                    state: step.state,
                    config: {
                        // take assigned url or create it from state property
                        url: step.url || step.state.split('.').pop(),
//                        url: ':name',
                        views: {
                            'tabContent': {
                                // assigned template or default template
                                templateUrl: step.template || 'app/default-step/default-step.html',
                                controller: 'DefaultStepController',
                                controllerAs: 'vm',
                                resolve: {
                                    stepData: ['dataservice', '$stateParams', function(dataservice, $stateParams) {
                                        return dataservice.getStep(step.state);
                                    }]
                                }
                            }
                        }
                    }
                });
            }
        });
        return dynStates;
    }
})();
