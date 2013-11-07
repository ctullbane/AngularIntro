//This is the module for our custom filters. The first parameter is the module's name, and the second parameter
//indicates that it has no dependencies
angular.module('angularStart.filters', [])
    //we then call the filter method on it to add a custom filter. The first parameter is the name of the filter,
    //and then we define the function for that filter. In this case, all the filter does is take some sort of text input,
    //iterate through it, and toggle capitalization of the characters in the string, before returning the string
    .filter('sillyCaps', function () {
        return function (input) {
            //if no value exists, the filter has nothing to do; exit
            if (input === undefined)
                return;

            var out = "";
            var capIt = true;

            //iterate through the characters of the string
            for (var i = 0; i < input.length; i++) {
                var currChar = input.charAt(i);
                //skip over spaces
                if (currChar.trim() === "") {
                    out += currChar;
                    continue;
                }

                //captitalize the given character
                if (capIt) {
                    currChar = currChar.toUpperCase();
                }

                //if we capitalized this character, don't capitalize the next. If we didn't, then do capitalize the next.
                capIt = capIt ? false : true;

                //add the character to the string value we will be returning
                out += currChar;
            }

            //return the string
            return out;
        }
    });