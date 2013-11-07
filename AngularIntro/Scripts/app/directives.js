//This is the module for our directives. Remember, this gets attached to the main module (appRoot) because we defined
//this module (angularStart.directives) as one of the dependencies for that module (see app.js)

var angularStartDirectives = angular.module('angularStart.directives', []);     //Define the directive module

//create a directive named 'testDirective'
angularStartDirectives.directive('testDirective', function () {
    return {
        //the restrict property indicates how the directive can be used in the HTML page,
        //as an attribute (A), Element (E), Class (C), or comment (M). Directives default to restrict:'A'
        //this directive can be used as both an attribute (<div test-directive></div>) and element (<test-directive></test-directive>)
        restrict: 'AE',
        link: function (scope, element, attrs) {
            console.log('Directive linked.');
        }
    };
});

angularStartDirectives.directive('blueAndBig', ["$compile", function ($compile) {
    return {
        restrict: 'A', //allow this directive to be used as an attribute
        link: function (scope, element, attrs) {
            //Set up a watch on the scope element referenced in our element's ngModel attribute

            //In the case of our sample page, we have a div implementing the blue-and-big directive as an attribute:
            //  <div blue-and-big ...
            //which then also uses the ngModel attribute to point to the input field it links to
            //  <div blue-and-big data-ng-model="textForDirective"></div>
            //As a result, the below $watch will tie to the textForDirective property of our scope, and this function will be called
            //whenever that property's value changes.
            scope.$watch(attrs.ngModel, function (v) {
                //Define our html template, where v = the value of the element we are watching
                var template = angular.element('<h1><span style="color:blue">' + v + '</span></h1>');

                //The angular $compile function is takes a piece of html string or DOM and produces a template function
                //We then link it to the current scope $compile(template)>>>(scope)<<<. This is the same as doing the following:
                //var linkFunction = $compile(template);
                //linkFunction(scope);
                var linkFunction = $compile(template)(scope);

                //Clear out whatever html is already there in the given element, then append our template
                element.html(null).append(template);
            }, true);
        }
    }
}]);