//This is the module for our services. Remember, this gets attached to the main module (appRoot) because we defined
//this module (angularStart.services) as one of the dependencies for that module (see app.js)

//As usual, the module declaration takes the name of the module as its first parameter, and any dependencies as the second parameter
var angularStartServices = angular.module('angularStart.services', ['ngResource']);     //Define the services module

//Below is a custom service. Note that we could have chained this factory call to the module definition:
//
//  var angularStartServices = angular.module('angularStart.services', ['ngResource'])
//      .factory('SampleService', [function() { ...
//
//This would have done the same thing, and is purely a matter of coding style/standards


//This service has one parameter ($q) which is the Angular promise object. As usual when we have a parameter,
//we include this parameter in the dependencies for the service. Angular is actually smart enough to infer a dependency base purely
//on the parameters for that function, javascript minification makes the dependency artifact necessary.
//(For more information, look at the A Note on Minification section of  http://docs.angularjs.org/tutorial/step_05 )
angularStartServices.factory('SampleService', ['$q',
    function ($q) {
        //frequently, services are used to make calls to the database (or the web api layer) to retrieve data
        //for simplicity's sake, we are hardcoding the data we will return
        var hardCodedObject =
            [
                {
                    value: 'd'
                },
                {
                    value: 'c'
                },
                {
                    value: 'a'
                },
                {
                    value: 'b'
                }
            ];

        //a service returns its api (basically the public methods available
        return {
            //this function includes a very simple example of the angular promise object. For more information,
            //check out the api reference at: http://docs.angularjs.org/api/ng.$q
            getHardCodedData: function (returnData) {
                //Create a Deferred object which represents a task which will finish in the future
                var deferred = $q.defer();

                //We are using the passed-in value to determine whether or not our promise is successful or not. To
                //force an error, simply change the call from the controller to pass in false instead of true.
                //This is purely for demonstration purposes. A real application would be checking the response code 
                //from the web api service call, or the esults of the database query
                if (returnData) {
                    deferred.resolve(hardCodedObject);
                } else {
                    deferred.reject("Service failure");
                }

                //return the promise
                return deferred.promise;
            }
        };
    }
]);