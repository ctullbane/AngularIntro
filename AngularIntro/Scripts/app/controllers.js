//Define the (one) controller for this sample app
//Most applications will have multiple controllers. Such controllers can be defined in separate files, or grouped together, 
//based on logical grouping (i.e. in the parabola solution, parabola.course.create.controller.js contains
//definitions for the course.information.controller, the courser.information.programs.controller, the course.information.prerequisites.controller... etc.

//we define our controller as a controller for the main module (appRoot), and supply the name of the controller,
//the dependencies for the controller (in this case, the angular $scope object, and the service we will need,
//and a function that is called to construct that controller.
appRoot.controller('SampleController',
    ['$scope', 'SampleService', 
        function ($scope, SampleService) {
            //A controller's primary role is to manage the scope it contains. In this controller, we are setting a
            //number of properties into the scope that the page which references this controller has access to
            $scope.pageLiterals = { title: 'sample title' };
            $scope.sampleObject = [
                {
                    name: 'John Smith',
                    grade: 'A'
                },
                {
                    name: 'Jane Doe',
                    grade: 'C'
                },
                {
                    name: 'Jeremiah Bullfrog',
                    grade: 'D+'
                }
            ];

            $scope.textForCustomFilter = "randomly capitalized text";
            $scope.textForDirective = "colored text";
            $scope.viewHelpText = [false, false, false, false, false, false, false];

            //This is a very basic example of making a call to a service's function, and setting the return value into scope
            //SampleService is the service we included in the constructor's parameters list. We also indicated that it was a dependency,
            //which allows Angular to go find it and inject it into our function, even if our javascript is minimized for production use
            //Because the service in question returns a promise, we handle both the success and failure callbacks from that promise. 
            //If successful, we attach the result to our $scope property. Otherwise, we output the error to the log.
            var promise = SampleService.getHardCodedData(true);
            promise.then(
                function (result) {
                    $scope.objectFromService = result;
                },
                function (error) {
                    console.log(error);
                }
            );

            //here we're exposing a couple of functions that can be called from the page-level. Note that
            //even in our functions, we're not manipulating the DOM directly. Controllers should be concerned with scope,
            //and with talking to services or directives... they should NOT be manipulating the DOM. A controller that does
            //so is generally a good candidate for refactoring, with the DOM maniuplation portion extracted into a directive
            $scope.toggleText = function (i) {
                $scope.viewHelpText[i] = $scope.viewHelpText[i] ? false : true;
            }

            $scope.getShowText = function (i) {
                return $scope.viewHelpText[i];
            }

        }
    ]);
