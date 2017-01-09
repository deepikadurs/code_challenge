var chartuiApp = angular.module('chartuiApp', [
	'ngResource',
    //'ui.bootstrap', // Angular - Bootstrap 3 Integeration Module
    'mgcrea.ngStrap', // Angular - Bootstrap 3 Integeration Module 2
    'ui.select',
    'googlechart',
    'ngMockE2E'
]);
chartuiApp.run(function($httpBackend) {
	$httpBackend.whenGET(/\.html$/).passThrough();
});