var app = angular.module('komendant', ['ngMaterial', 'ngRoute']);

app.controller('RoomController', ['$scope', '$mdDialog', '$http', '$timeout', function ($scope, $mdDialog, $http, $timeout) {
    $scope.list = [
        //{ id: 1, name: "111", capacity: "4"},
        //{ id: 3, name: "112", capacity: "4"},
        //{ id: 2, name: "113", capacity: "4"}
    ];

    $scope.modify = function (item) {
        $mdDialog.show({
            templateUrl: '/Content/Views/roomDialog.html',
            controller: 'RoomEditController',
            parent: angular.element(document.body),
            resolve: {
                item: function () {
                    return item;
                },
                title: function () {
                    return "Картка";
                },
                refresh: function () {
                    return refresh;
                }
            },
            clickOutsideToClose: false,
            escapeToClose: true
        });
    };

    $scope.open = function () {
        var editableType = {
            'id': 0,
            'name': null,
            'capacity': '4'
        }
        $scope.modify(editableType);
    }

    function refresh() {
        $http({
            method: 'GET',
            url: '/api/room/getAll'
        }).then(function successCallback(response) {
            $timeout(function () {
                $scope.list = response.data;
            });
        }, function errorCallback(response) {
        });
    }
    refresh();
}]);

app.controller('RoomEditController', ['$scope', '$mdDialog', 'refresh', 'title', 'item', '$http',
    function ($scope, $mdDialog, refresh, title, item, $http) {
        var vm = $scope;
        vm.title = title;
        vm.error = null;

        function copyObj(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        vm.item = copyObj(item);

        vm.save = function () {
            $http({
                method: 'POST',
                url: '/api/room/save',
                data: vm.item
            }).then(function successCallback(response) {
                refresh();
                $scope.close();
                }, function errorCallback(response) {
                alert('Error');
            });
        };

        vm.delete = function () {
            $http({
                method: 'POST',
                url: '/api/room/delete',
                data: vm.item
            }).then(function successCallback(response) {
                refresh();
                $scope.close();
            }, function errorCallback(response) {
                alert('Error');
            });
        };

        vm.reset = function () {
            vm.item = copyObj(item);
            vm.showButtons = false;
        }

        $scope.close = function () {
            $mdDialog.cancel();
        };

        vm.showButtonsMethod = function () {
            vm.showButtons = true;
        }
    }]);

app.controller('PersonController', ['$scope', '$mdDialog', '$http', '$timeout', function ($scope, $mdDialog, $http, $timeout) {
    $scope.list = [
        //{ id: 1, name: "111", capacity: "4"},
        //{ id: 3, name: "112", capacity: "4"},
        //{ id: 2, name: "113", capacity: "4"}
    ];

    $scope.modify = function (item) {
        $mdDialog.show({
            templateUrl: '/Content/Views/personDialog.html',
            controller: 'PersonEditController',
            parent: angular.element(document.body),
            resolve: {
                item: function () {
                    return item;
                },
                title: function () {
                    return "Картка";
                },
                refresh: function () {
                    return refresh;
                }
            },
            clickOutsideToClose: false,
            escapeToClose: true
        });
    };

    $scope.open = function () {
        var editableType = {
            'id': 0,
            'name': null,
            'isPayed': false,
            'room': null
        }
        $scope.modify(editableType);
    }

    function refresh() {
        $http({
            method: 'GET',
            url: '/api/person/getAll'
        }).then(function successCallback(response) {
            $timeout(function () {
                $scope.list = response.data;
            });
        }, function errorCallback(response) {
        });
    }
    refresh();
}]);

app.controller('PersonEditController', ['$scope', '$mdDialog', 'refresh', 'title', 'item', '$http', '$q',
    function ($scope, $mdDialog, refresh, title, item, $http, $q) {
        var vm = $scope;
        vm.title = title;
        vm.error = null;

        function copyObj(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        vm.item = copyObj(item);

        vm.save = function () {
            $http({
                method: 'POST',
                url: '/api/person/save',
                data: vm.item
            }).then(function successCallback(response) {
                refresh();
                $scope.close();
            }, function errorCallback(response) {
                alert('Error');
            });
        };

        vm.delete = function () {
            $http({
                method: 'POST',
                url: '/api/person/delete',
                data: vm.item
            }).then(function successCallback(response) {
                refresh();
                $scope.close();
            }, function errorCallback(response) {
                alert('Error');
            });
        };

        vm.reset = function () {
            vm.item = copyObj(item);
            vm.showButtons = false;
        }

        vm.getRooms = function (q) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/room/search?q=' + q
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        $scope.close = function () {
            $mdDialog.cancel();
        };

        vm.showButtonsMethod = function () {
            vm.showButtons = true;
        }
    }]);