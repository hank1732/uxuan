angular.module('starter.services')

.factory('getWashShops', function($resource, $http) {
    return $resource('http://www.lifeuxuan.com/backend/api/NearByWashShops.php');
})

.factory('getWashShop', function($resource, $http) {
    return $resource('http://www.lifeuxuan.com/backend/api/WashsByShop.php');
})

;
