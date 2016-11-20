angular.module('starter.services')

.factory('userWechatInfo', function($resource) {
  return $resource('http://www.lifeuxuan.com/index.php/user/basicinfo');
})

.factory('userRegister', function($resource) {
  return $resource('http://www.lifeuxuan.com/index.php/user/register');
})

.factory('Location', function($q) {

  console.log('start to get loction');
  var deferred = $q.defer();
  var userLocation = {
    'latitude': 31.199345,
    'longitude': 121.446322,
    'isOut': false,
    'isGet': true
  };

  var userLocation = JSON.parse(localStorage.getItem('userLocation')) || {
    'latitude': 121.446322,
    'longitude': 31.199345,
    'isOut': false,
    'isGet': true
  };

  if (userLocation.isSearchGeo) {
    GetAddress(userLocation.latitude, userLocation.longitude);
  } else {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        userLocation.latitude = r.point.lat;
        userLocation.longitude = r.point.lng;
        GetAddress(userLocation.latitude, userLocation.longitude);
      } else {
        alert('failed' + this.getStatus());
      }
    }, {
      enableHighAccuracy: true
    })
  }

  function GetAddress(lat, lng) {
    point = new BMap.Point(lng, lat);
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
      var addComp = rs.addressComponents;
      userLocation.province = addComp.province;
      userLocation.city = addComp.city;
      userLocation.district = addComp.district;
      userLocation.street = addComp.street;
      userLocation.streetNumber = addComp.streetNumber;
      if (addComp.city != '上海市') {
        userLocation.isOut = true;
      } else {
        userLocation.isOut = false;
      }
      userLocation.isSearchGeo = false;
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
      deferred.resolve(userLocation);
    });
  }

  deferred.resolve(userLocation);
  return deferred.promise;
})

.factory('UserInfo', function($resource, $q, $timeout, userWechatInfo, userRegister, Location) {
  var deferred = $q.defer();
  var user = {
    'name': 'test',
    'userId': '22',
    'latitude': 31.199345,
    'longitude': 121.446322,
    'openId': '',
    'username': '',
    'password': '',
    'headPicUrl': '',
    'tel': '18788889999',
    'verify': 1,
    'address': '12313123'
  }
  Location.then(function(userLocation) {
    // user default value
    user.latitude = userLocation.latitude;
    user.longitude = userLocation.longitude;
    user.userLocation = userLocation;

    // ------------for test-----------------
    // $timeout(function (){
    deferred.resolve(user)
    return deferred.promise;
    // }) ;
    // ------------for test-----------------

    userWechatInfo.get({}, function(e) {
      user.name = e.data.nickname;
      user.img = e.data.headimgurl;
      user.openid = e.data.openid;
      user.headPicUrl = e.data.headimgurl;
      if (user.name == '哈库那玛塔塔') {
        screenLog.init({ autoScroll: false });
      }
      userRegister.get({
        'latitude': user.latitude,
        'longitude': user.longitude,
        'openId': user.openid,
        'username': user.nickname,
        'password': '',
        'headPicUrl': user.headPicUrl
      }, function(e) {
        if (e.data) {
          user.userId = e.data.userId;
          user.verify = e.data.verify;
          user.addressInfo = e.data.addressInfo;
          deferred.resolve(user);
        }
      })
    });
  })

  return deferred.promise;
})

;