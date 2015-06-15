/**
 * Created by ksheth on 3/26/2015.
 */
angular.module('mean.articles').service('selectedItemsService',  function() {
        var cartItems= [];
        var editItems = [];

        return{
            getCartItems: function(){
                return cartItems;
            },
            setCartItems: function(value){
                cartItems=value;
            },
            getEditItems: function(){
                return editItems;
            },
            setEditItems: function(value){
                editItems=value;
            }
        };
    }
);