'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('Articles', ['$resource',
    function ($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
])
    .factory('ConfirmOrder', ['$resource',
        function ($resource) {
            return $resource('confirmOrder/:orderId', {
                orderId: '@_id'
            })
        }])
    .factory('Orders',['$resource',
        function ($resource) {
            return $resource('orders/:orderId',{
                orderId:'@_id'
            })
        }]);
