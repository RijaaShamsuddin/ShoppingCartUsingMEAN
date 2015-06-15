'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', 'selectedItemsService',
    function ($scope, $stateParams, $location, Global, Articles, selectedItemsService) {
        $scope.global = Global;
        $scope.hasAuthorization = function (article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var article = new Articles({
                    title: this.title,
                    content: this.content,
                    price: this.price
                });
                article.$save(function (response) {
                    $location.path('articles');
                });

                this.title = '';
                this.content = '';
                this.price = 0;
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function (article) {
            if (article) {
                article.$remove(function (response) {
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                    $location.path('articles');
                });
            } else {
                $scope.article.$remove(function (response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var article = $scope.article;
                if (!article.updated) {
                    article.updated = [];
                }
                article.updated.push(new Date().getTime());

                article.$update(function () {
                    $location.path('articles/' + article._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function () {
            Articles.query(function (articles) {
                $scope.articles = articles;
            });
        };

        $scope.verifyOrder = function () {
            $scope.selectedItems = $scope.articles.filter(function (sel) {
                return sel.selected;
            });
            selectedItemsService.setCartItems($scope.selectedItems)
            selectedItemsService.setEditItems($scope.articles)
            $location.path('reviewOrder');
            //console.log(selectedItemsService.getCartItems())
        };

        $scope.editOrder = function () {
            $scope.articles = selectedItemsService.getEditItems();
        };

        $scope.findOne = function () {
            Articles.get({
                articleId: $stateParams.articleId
            }, function (article) {
                $scope.article = article;
            });
        };
    }
])

    .controller('reviewOrderCtrl', ['$scope', '$stateParams', '$location', 'Global', 'selectedItemsService', 'ConfirmOrder',
        function ($scope, $stateParams, $location, Global, selectedItemsService, ConfirmOrder) {
            $scope.global = Global;
            $scope.reviewOritems = selectedItemsService.getCartItems();

            $scope.goToEditOrder = function(){
                $location.path('editOrder');
            }

            $scope.calculateTotal = function () {
                var total = 0;
                for (var count = 0; count < $scope.reviewOritems.length; count++) {
                    total += $scope.reviewOritems[count].price * $scope.reviewOritems[count].quantity;
                }
                //return total;
                $scope.reviewOritems.total = total
            };
            $scope.createOrder = function () {
                var order = new ConfirmOrder({
                    order: this.reviewOritems,
                    total: $scope.reviewOritems.total
                });
                order.$save(function (response) {
                    $location.path('confirmOrder/' + response._id);
                });
            };
            $scope.findOrder = function () {
                ConfirmOrder.get({
                    orderId: $stateParams.orderId
                }, function (order) {
                    $scope.order = order;
                });
            };
        }
    ])
    .controller('viewAllOrdersCtrl',['$scope', 'Global', 'Orders',
        function ($scope, Global, Orders) {
            $scope.global = Global;

            $scope.getAllOrders = function () {
                Orders.query(function (orders) {
                    $scope.allOrders = orders;
                });
            };

            $scope.removeOrder = function (order) {
                if (order) {
                    order.$remove(function (response) {
                        for (var i in $scope.allOrders) {
                            if ($scope.allOrders[i] === order) {
                                $scope.allOrders.splice(i, 1);
                            }
                        }
                        //$location.path('orders');
                    });
                }
            };
        }])
;
