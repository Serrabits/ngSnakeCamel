describe("ngSnakeCamel", function() {

  var provider;
  var config;
  var $http;
  var $httpBackend;

  var funcName = function(func) {
    return /^function\s+([\w\$]+)\s*\(/.exec(func.toString())[1];
  };

  beforeEach(function() {

    module('ngSnakeCamel', function(snakeCamelConfigProvider) {
      snakeCamelConfigProvider.setHttpAutomatic(true);
      config = snakeCamelConfigProvider;
    });

    inject(function(_$http_, _$httpBackend_, _snakeCamelConfig_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
      provider = _snakeCamelConfig_;
    });

  });

  describe('Getter and Setter', function() {
    it('should get value of http automatic', function() {
      expect(provider.getHttpAutomatic()).toBeTruthy();
    });

    it('should set value of http automatic', function() {
      config.setHttpAutomatic(false);
      expect(provider.getHttpAutomatic()).toBeFalsy();
    });
  })

  describe('Http', function() {
    it('should add toCamelCase in transform response', function() {
      expect(funcName($http.defaults.transformResponse[0])).toBe('toCamelCase');
    });

    it('should add toSnakeCase in transform request', function() {
      expect(funcName($http.defaults.transformRequest[0])).toBe('toSnakeCase');
    });

    it('should convert to snake before send and to camel before receive', function() {
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
      $httpBackend.verifyNoOutstandingRequest()
      $httpBackend.verifyNoOutstandingExpectation();
    });
  });
});
