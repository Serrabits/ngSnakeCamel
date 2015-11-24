angular.module('ng-snake-camel', [])

  .filter('isJson', function() {
    return function(input) {
      if (angular.isDefined(input)) {
        return /^[\],:{}\s]*$/.test(input.replace(/\\["\\\/bfnrtu]/g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
      }
    };
  })

  .filter('camelize', function($filter, $log) {
    return function(input) {
      if (angular.isDefined(input)) {
        var isObject = angular.isObject(input);
        var parsedInput = isObject ? angular.toJson(input) : input;

        if ($filter('isJson')(parsedInput)) {
          var camelized = parsedInput.replace(/(_[a-zA-Z0-9])(?=\w*":)/g, function($1) {
            return $1[1].toUpperCase().replace('_', '');
          });

          return isObject ? angular.fromJson(camelized) : camelized;
        } else {
          $log.warn('Camelize receive a invalid JSON');
          return input;
        }
      }
    };
  })

  .filter('snakelize', function($filter, $log) {
    return function(input) {
      if (angular.isDefined(input)) {
        var isObject = angular.isObject(input);
        var parsedInput = isObject ? angular.toJson(input) : input;

        if ($filter('isJson')(parsedInput)) {
          var snakelized = parsedInput.replace(/([A-Z](?=[a-zA-Z0-9]*":))/g, function($1) {
            return '_' + $1.toLowerCase();
          });

          return isObject ? angular.fromJson(snakelized) : snakelized;
        } else {
          $log.warn('Snakelize receive a invalid JSON');
          return input;
        }
      }
    };
  });
