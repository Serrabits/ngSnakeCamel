'use strict';

/*global angular*/

describe("ngSnakeCamel", function() {
  var camelize;
  var snakelize;
  var snaked;
  var camelized;
  var jsonValid;
  var jsonInvalid;
  var $http;

  beforeEach(function() {
    module('ngSnakeCamel');
    inject(function($filter, _$http_) {
      $http = _$http_;
      camelize = $filter('camel');
      snakelize = $filter('snake');

      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

      snaked = {
        foo: 'bar',
        boo_bar: 'baz',
        foo_bar_baz: {
          foo_bar: [
            {
              foo: 'bar',
              foo_bar: 'baz'
            },
            {
              foo_bar: 'baz'
            }
          ]
        }
      };

      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

      camelized = {
        foo: 'bar',
        booBar: 'baz',
        fooBarBaz: {
          fooBar: [
            {
              foo: 'bar',
              fooBar: 'baz'
            },
            {
              fooBar: 'baz'
            }
          ]
        }
      };

      jsonValid = '{"foo":"bar", "baz":{ "foo":"bar_baz" }}';

      jsonInvalid = 'foo';
    });
  });

  describe('SnakeCase', function() {
    it('Should convert Object to snake_case', function() {
      expect(snakelize(camelized)).toEqual(snaked);
    });

    it('Should convert JSON to snake_case', function() {
      expect(snakelize(angular.toJson(camelized))).toBe(angular.toJson(snaked));
    });

    it('Should preserve the same type data inserted', function() {
      expect(angular.isObject(snakelize(camelized))).toBeTruthy();
      expect(angular.isString(snakelize(angular.toJson(camelized)))).toBeTruthy();
    });

    it('Should be return input case is not valid', function() {
      expect(snakelize(null)).toEqual(null);
      expect(snakelize(false)).toBeFalsy();
      expect(snakelize()).toBeUndefined();
    });
  });

  describe('CamelCase', function() {
    it('Should convert Object to CamelCase', function() {
      expect(camelize(snaked)).toEqual(camelized);
    });

    it('Should convert JSON to CamelCase', function() {
      expect(camelize(angular.toJson(snaked))).toBe(angular.toJson(camelized));
    });

    it('Should preserve the same type data inserted', function() {
      expect(angular.isObject(camelize(snaked))).toBeTruthy();
      expect(angular.isString(camelize(angular.toJson(snaked)))).toBeTruthy();
    });

    it('Should be return input case is not valid', function() {
      expect(camelize(null)).toEqual(null);
      expect(camelize(false)).toBeFalsy();
      expect(camelize()).toBeUndefined();
    });
  });
});
