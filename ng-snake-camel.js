'use strict';

/*global angular*/

(function() {
  var httpTransform = false;

  var JSON_START = /^\[|^\{(?!\{)/;
  var JSON_ENDS = {
    '[': /]$/,
    '{': /}$/
  };

  function isJsonLike(str, headers) {
    var type = headers('Content-Type');
    var jsonStart = str.match(JSON_START);
    return (type && type.indexOf('application/json') === 0) ||
      (jsonStart && JSON_ENDS[jsonStart[0]].test(str));
  }

  function camelizeJson(str) {
    return str.replace(/(_[a-zA-Z0-9])(?=\w*":)/g, function($1) {
      return $1[1].toUpperCase().replace('_', '');
    });
  }

  function snakelizeJson(str) {
    return str.replace(/([A-Z](?=[a-zA-Z0-9]*":))/g, function($1) {
      return '_' + $1.toLowerCase();
    });
  }

  function snakelize(data, headers) {
    var strData = angular.isObject(data) ? angular.toJson(data) : data;
    return strData && httpTransform && isJsonLike(strData, headers) ?
      snakelizeJson(strData) :
      data;
  }

  function camelize(data, headers) {
    var strData = angular.isObject(data) ? angular.toJson(data) : data;
    return strData && httpTransform && isJsonLike(strData, headers) ?
      camelizeJson(strData) :
      data;
  }

  function snakeFilter() {
    return function(data) {
      if (data) {
        var isObject = angular.isObject(data);
        var strData = isObject ? angular.toJson(data) : data;
        var jsonSnakelized = snakelizeJson(strData);
        data = isObject ? angular.fromJson(jsonSnakelized) : jsonSnakelized;
      }
      return data;
    };
  }

  function camelFilter() {
    return function(data) {
      if (data) {
        var isObject = angular.isObject(data);
        var strData = isObject ? angular.toJson(data) : data;
        var jsonCamelized = camelizeJson(strData);
        data = isObject ? angular.fromJson(jsonCamelized) : jsonCamelized;
      }
      return data;
    };
  }

  function snakeCamelConfig() {
    return {
      setHttpTransform: function(val) {
        httpTransform = !!val;
      },
      $get: function() {
        return {
          getHttpTransform: function() {
            return httpTransform;
          }
        };
      }
    };
  }

  function applyHttpTransform($http) {
    $http.defaults.transformResponse.unshift(camelize);
    $http.defaults.transformRequest.unshift(snakelize);
  }

  angular.module('ngSnakeCamel', [])
    .provider('snakeCamel', snakeCamelConfig)
    .filter('snake', snakeFilter)
    .filter('camel', camelFilter)
    .run(applyHttpTransform);
})();
