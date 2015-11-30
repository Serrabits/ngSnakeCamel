# AngularJS $filter and $http convert JSON to snake ou camelcase

[![Build Status](https://travis-ci.org/Serrabits/ngSnakeCamel.svg?branch=master)](https://travis-ci.org/Serrabits/ngSnakeCamel)
[![Coverage Status](https://coveralls.io/repos/Serrabits/ngSnakeCamel/badge.svg?branch=master&service=github)](https://coveralls.io/github/Serrabits/ngSnakeCamel?branch=master)
[![Code Climate](https://codeclimate.com/github/Serrabits/ngSnakeCamel/badges/gpa.svg)](https://codeclimate.com/github/Serrabits/ngSnakeCamel)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/5d30386e62eb45c5b1b81dfb52faba9c)](https://www.codacy.com/app/juniorcnt/ngSnakeCamel)

A cleaner way to keep your standard JS objects in camelcase communicating to standardized snakecase APIs.

This angular module has no external dependencies, and can act automatically under `$http` "with defaults `transFormRequest` and `transformResponse`" or can be used as `$filter('snake')` or `$filter('camel')` anywhere in your view or controller.


## Get It

The easiest way to install is using [bower](http://bower.io/search/?q=ng-snake-camel)

```
bower install --save ngSnakeCamel
```

Alternatively you can download from the GitHub project:
[https://github.com/Serrabits/ngSnakeCamel](https://github.com/Serrabits/ngSnakeCamel)

## Load It

Load the `ng-snake-camel.js` file into your web app after loading `angular.js`

```
<html>
  ...
  <head>
    ...
    <script src="angular.js"></script>
    <script src="bower_components/ngSnakeCamel/ng-snake-camel.js"></script>
    ...
  </head>
  ...
</html>
```

## Use It

Make sure that your AngularJS application references the `ngSnakeCamel` module:

```
angular.module('myApp', ['ngSnakeCamel']);
```
### $http

If you want to enable the transformation to all your requests $ http, set true in `snakeCamelProvider.setHttpTransform(true)` like this:

```
angular.module ('myApp' ['ngSnakeCamel'])
	.config(function(snakeCamelProvider) {
		snakeCamelProvider.setHttpTransform(true);
	});
```

To apply the transformation request by request, set the [$http configs](https://code.angularjs.org/1.4.0/docs/api/ng/service/$http) `transformRequest` and `transformResponse` as follows:

```
$http.post(Api.rest(userUri), {
	transformRequest: function(data) {
		return $filter('snake')(angular.toJson(data));
    },
    transformResponse: function(data) {
    	return $filter('camel')(angular.fromJson(data));
    }
})
.success()
.error();
```

*Note:* `angular.toJson()` and `angular.fromJson()` are needed for when the transformation is applied directly to request the default transformations are not performed. For questions of a look at the [$http documentation](https://code.angularjs.org/1.4.0/docs/api/ng/service/$http)

### $filter

To use the snake and camel filters in your views, simply apply within the braces
`{{expression | snake}}` or `{{expression | camel}}`. For questions of a look at the [$filter documentation](https://code.angularjs.org/1.4.0/docs/api/ng/service/$filter)
