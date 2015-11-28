'use strict';

/*global angular*/

describe("ngSnakeCamel", function() {
  var provider;
  var snakeCamel;
  var $http;
  var $httpBackend;

  var funcName = function(func) {
    return /^function\s+([\w\$]+)\s*\(/.exec(func.toString())[1];
  };

  beforeEach(function() {
    module('ngSnakeCamel', function(snakeCamelProvider) {
      snakeCamel = snakeCamelProvider;
    });

    inject(function(_$http_, _$httpBackend_, _snakeCamel_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
      provider = _snakeCamel_;
    });
  });

  afterEach(function() {
    snakeCamel.setHttpTransform(false);
  });

  describe('Getter and Setter provider', function() {

    it('should get value of http transform', function() {
      expect(provider.getHttpTransform()).toBeDefined();
    });

    it('should http transform is true', function() {
      expect(provider.getHttpTransform()).toBeFalsy();
    });

    it('should set value of http automatic', function() {
      snakeCamel.setHttpTransform(true);
      expect(provider.getHttpTransform()).toBeTruthy();
    });
  });

  describe('Http', function() {
    it('should add camelize in transform response', function() {
      expect(funcName($http.defaults.transformResponse[0])).toBe('camelize');
    });

    it('should add snakelize in transform request', function() {
      expect(funcName($http.defaults.transformRequest[0])).toBe('snakelize');
    });

    it('should convert snake/camel when httpTranform is true', function() {
      snakeCamel.setHttpTransform(true);
      expect(provider.getHttpTransform()).toBeTruthy();

      $httpBackend.expectPOST('foo', {
        "foo_bar": "baz"
      }).respond({
        "foo_bar": "baz"
      });

      $http.post('foo', {
        "fooBar": "baz"
      }).success(function(result) {
        expect(result).toEqual({
          fooBar: 'baz'
        })
      });

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should not convert snake/camel when httpTranform is false', function() {
      snakeCamel.setHttpTransform(false);
      expect(provider.getHttpTransform()).toBeFalsy();

      $httpBackend.expectPOST('foo', {
        "foo_bar": "baz"
      }).respond({
        "foo_bar": "baz"
      });

      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

      $http.post('foo', {
        "foo_bar": "baz"
      }).success(function(result) {
        expect(result).toEqual({
          foo_bar: 'baz'
        })
      });

      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should support to undefined request/response', function() {
      $httpBackend.expectPOST('foo').respond();

      $http.post('foo').success(function(result) {
        expect(result).toBeUndefined();
      });

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });
  });
});
