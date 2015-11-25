describe("ngSnakeCamel", function() {

  beforeEach(module('ngSnakeCamel'));

  var camelize;
  var snakelize;
  var snaked;
  var camelized;
  var jsonValid;
  var jsonInvalid;
  var $log;

  beforeEach(inject(function($filter, _$log_) {

    $log = _$log_;
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
      expect($log.warn.logs[0][0]).toBe('Snakelize received a invalid JSON');
    });

    it('Should not generate a warn case json is valid', function() {
      $log.reset();
      snakelize(jsonValid);
      $log.assertEmpty();
    });

    it('Should be return undefined case input not present', function() {
      expect(snakelize()).toBeUndefined();
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
      expect($log.warn.logs[0][0]).toBe('Camelize received a invalid JSON');
    });

    it('Should not generate a warn case json is valid', function() {
      $log.reset();
      camelize(jsonValid);
      $log.assertEmpty();
    });

     it('Should be return undefined case input not present', function() {
      expect(camelize()).toBeUndefined();
    });

  });
});
