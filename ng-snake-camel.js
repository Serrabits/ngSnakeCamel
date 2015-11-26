(function() {

  function isJson(string) {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  function snakeCamelConfig() {
    var httpAutomatic = false;

    return {
      setHttpAutomatic: function(value) {
        httpAutomatic = !!value;
      },
      $get: function() {
        return {
          getHttpAutomatic: function() {
            return httpAutomatic;
          }
        };
      }
    };
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

  function makeAutomatics($http, $filter, snakeCamelConfig) {
    if (snakeCamelConfig.getHttpAutomatic()) {

      function toCamelCase(response) {
        return $filter('camelize')(response);
      };

      function toSnakeCase(request) {
        return $filter('snakelize')(request);
      };

      $http.defaults.transformResponse.unshift(toCamelCase);
      $http.defaults.transformRequest.unshift(toSnakeCase);

    }
  };

  angular.module('ngSnakeCamel', [])
    .provider('snakeCamelConfig', snakeCamelConfig)
    .filter('snakelize', snakelize)
    .filter('camelize', camelize)
    .run(makeAutomatics);

})();
