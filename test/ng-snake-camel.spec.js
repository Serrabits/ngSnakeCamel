describe("ng-snake-camel", function() {

  beforeEach(module('ng-snake-camel'));

  var camelize;
  var snakelize;
  var isJson;
  var snaked;
  var camelized;
  var jsonValid;
  var jsonInvalid;
  var $log;

  beforeEach(inject(function($filter, _$log_) {

    $log = _$log_;
    isJson = $filter('isJson');
    camelize = $filter('camelize');
    snakelize = $filter('snakelize');

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

  }));

  describe('json validator', function() {

    it('Should be return true case json is valid', function() {
      expect(isJson(jsonValid)).toBeTruthy();
    });

    it('Should be return false case json is not valid', function() {
      expect(isJson(jsonInvalid)).toBeFalsy();
    });

  });

  describe('to Snakecase', function() {

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

    it('Should generate a warn case json is invalid', function() {
      $log.reset();
      snakelize(jsonInvalid);
      expect($log.warn.logs[0][0]).toBe('Snakelize receive a invalid JSON');
    });

    it('Should not generate a warn case json is valid', function() {
      $log.reset();
      snakelize(jsonValid);
      $log.assertEmpty();
    });

  });

  describe('to Camelcase', function() {

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

    it('Should generate a warn case json is invalid', function() {
      $log.reset();
      camelize(jsonInvalid);
      expect($log.warn.logs[0][0]).toBe('Camelize receive a invalid JSON');
    });

    it('Should not generate a warn case json is valid', function() {
      $log.reset();
      camelize(jsonValid);
      $log.assertEmpty();
    });

  });
});
