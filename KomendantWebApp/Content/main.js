var app = angular.module('komendant', ['ngMaterial', 'ngRoute']);

app.controller('RoomController', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    $scope.list = [
        { id: 1, name: "111", capacity: "4"},
        { id: 3, name: "112", capacity: "4"},
        { id: 2, name: "113", capacity: "4"}
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
            'name': null
        }
        $scope.modify(editableType);
    }

    function refresh() {
        
    }
    refresh();
}]);

app.controller('RoomEditController', ['$scope', '$mdDialog', 'refresh', 'title', 'item',
    function ($scope, $mdDialog, refresh, title, item) {
        var vm = $scope;
        vm.title = title;
        vm.error = null;

        function copyObj(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        vm.item = copyObj(item);

        vm.save = function () {
            alert('save');
            refresh();
            $scope.close();
        };

        vm.delete = function () {
            alert('delete');
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