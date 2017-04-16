angular.module('starter.controllers')

.controller('AddressCtrl', function($rootScope, $scope, $state, $stateParams,
  $ionicPopup, Address) {
  const type = $stateParams.type
  $scope.tipText = type === 'new' ? '新增地址' : '修改地址'
  $scope.address = Object.assign({}, Address)

  $scope.confirmAddress = function() {
    if (!judgeAddress()) {
      return
    }
    Address.name = $scope.address.name
    Address.phone = $scope.address.phone
    Address.address = $scope.address.address
    $state.go('app.cart', { type: 'fruit' })
  }

  function judgeAddress() {
    var pass = true
    if (!($scope.address.name && $scope.address.name.length > 0)) {
      pass = false
    }
    if (!($scope.address.phone && ($scope.address.phone + '').length === 11)) {
      pass = false
    }
    if (!($scope.address.address && $scope.address.address.length >= 6)) {
      pass = false
    }

    if (!pass) {
      $ionicPopup.alert({
        title: 'U选到家',
        template: '请填写完整地址'
      });
    } else {
      return pass
    }

  }
})
