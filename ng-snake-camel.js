(function() {

  function isJson(string) {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  function snakelize($log) {
    return function(input) {
      if (angular.isDefined(input)) {
        var isObject = angular.isObject(input);
        var parsedInput = isObject ? angular.toJson(input) : input;

        if (isJson(parsedInput)) {
          var snakelized = parsedInput.replace(/([A-Z](?=[a-zA-Z0-9]*":))/g, function($1) {
            return '_' + $1.toLowerCase();
          });

          return isObject ? angular.fromJson(snakelized) : snakelized;
        } else {
          $log.warn('Snakelize received a invalid JSON');
          return input;
        }
      }
    };
  };

  function camelize($log) {
    return function(input) {
      if (angular.isDefined(input)) {
        var isObject = angular.isObject(input);
        var parsedInput = isObject ? angular.toJson(input) : input;

        if (isJson(parsedInput)) {
          var camelized = parsedInput.replace(/(_[a-zA-Z0-9])(?=\w*":)/g, function($1) {
            return $1[1].toUpperCase().replace('_', '');
          });

          return isObject ? angular.fromJson(camelized) : camelized;
        } else {
          $log.warn('Camelize received a invalid JSON');
          return input;
        }
      }
    };
  };

  angular.module('ngSnakeCamel', [])
    .filter('snakelize', snakelize)
    .filter('camelize', camelize);

})();
