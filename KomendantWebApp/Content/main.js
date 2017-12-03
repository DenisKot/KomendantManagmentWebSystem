var app = angular.module('komendant', ['ngMaterial', 'ngRoute', 'moment-picker', 'chart.js']);

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

app.controller('PeriodController', ['$scope', '$mdDialog', '$http', '$timeout', function ($scope, $mdDialog, $http, $timeout) {
    $scope.list = [];
    $scope.avarage = [];
    $scope.chartData = [];
    $scope.series = ['За два місяці', 'За три місця'];
    $scope.seriesTrend = ['Реальний прибуток', 'Прогнозований'];
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
    $scope.optionsTrend = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ]
        }
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.datasetOverrideTrend = [{ yAxisID: 'y-axis-1' }];

    $scope.modify = function (item) {
        $mdDialog.show({
            templateUrl: '/Content/Views/periodDialog.html',
            controller: 'PeriodEditController',
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
            'date': null,
            'cost': 0,
            'profit': 0
        }
        $scope.modify(editableType);
    }

    function refresh() {
        $http({
            method: 'GET',
            url: '/api/period/getAll'
        }).then(function successCallback(response) {
            $timeout(function () {
                $scope.list = response.data;
            });
        }, function errorCallback(response) {
        });
    }
    refresh();

    $scope.clalculate = function () {
        //// Avarage
        $scope.avarage = [];
        $scope.labels = [];
        var firstArr = [];
        var secondArr = [];
        for (var i = 0; i < $scope.list.length; i++) {
            if (i >= 2) {
                var sumThree = null;
                if (i >= 3) {
                    sumThree = ($scope.list[i - 1].profitClear +
                            $scope.list[i - 2].profitClear +
                            $scope.list[i - 3].profitClear) /
                        3;
                }
                var sumTwo = ($scope.list[i - 1].profitClear + $scope.list[i - 2].profitClear) / 2;
                firstArr.push(sumTwo);
                secondArr.push(sumThree);
                $scope.avarage.push({ two: sumTwo, three: sumThree, profitClear: $scope.list[i].profitClear,  date: $scope.list[i].date});
            } else {
                $scope.avarage.push({ date: $scope.list[i].date, profitClear: $scope.list[i].profitClear });
                firstArr.push(null);
                secondArr.push(null);
            }

            $scope.labels.push(moment($scope.list[i].date).format('YYYY-MM-DD'));
        }
        
        $scope.chartData = [];
        $scope.chartData.push(firstArr);
        $scope.chartData.push(secondArr);

        //// Regression
        var arr = [];
        for (var j = 0; j < $scope.list.length; j++) {
            arr.push([j + 1, $scope.list[j].profitClear]);
        }
        var result = regression.linear(arr);
        //"y = ax + b"
        var a = result.equation[0];
        var b = result.equation[1];

        //// Trend
        $scope.trend = [];
        $scope.trendLabels = [];
        var trendFirst = [];
        var trendSecond = [];
        for (var k = 0; k < $scope.list.length + 3; k++) {
            var item = {
                exectualy: k < $scope.list.length ? $scope.list[k].profitClear : null,
                predicted: a * (k + 1) + b
            }
            $scope.trend.push(item);
            trendFirst.push(item.exectualy);
            trendSecond.push(item.predicted);
            $scope.trendLabels.push("" + (k + 1));
        }
        $scope.trendChartData = [];
        $scope.trendChartData.push(trendFirst);
        $scope.trendChartData.push(trendSecond);

        //// Rost
        var arr2 = [];
        for (var v = 0; v < $scope.list.length; v++) {
            if ($scope.list[v].profitClear > 0) {
                arr2.push([v + 1, $scope.list[v].profitClear]);
            }
        }
        var result2 = regression.exponential(arr2);
        //"y = ax + b"
        var a2 = result2.equation[0];
        var b2 = result2.equation[1];

        $scope.rost = [];
        $scope.rostLabels = [];
        var rostFirst = [];
        var rostSecond = [];
        for (var k = 0; k < $scope.list.length + 3; k++) {
            var item = {
                exectualy: k < $scope.list.length ? $scope.list[k].profitClear : null,
                predicted: result2.predict(k + 1)[1]
            }
            $scope.rost.push(item);
            rostFirst.push(item.exectualy);
            rostSecond.push(item.predicted);
            $scope.rostLabels.push("" + (k + 1));
        }
        $scope.rostChartData = [];
        $scope.rostChartData.push(rostFirst);
        $scope.rostChartData.push(rostSecond);
    }
}]);


app.controller('PeriodEditController', ['$scope', '$mdDialog', 'refresh', 'title', 'item', '$http',
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
                url: '/api/period/save',
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
                url: '/api/period/delete',
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