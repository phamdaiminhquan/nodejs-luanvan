
var keyLocalStorageItemCart = 'ListItemCart';

function createItemCart(id, name, description, image, price, amount) {
    var itemCart = new Object()
    itemCart.id = id;
    itemCart.name = name;
    itemCart.description = description;
    itemCart.image = image;
    itemCart.amount = amount;
    itemCart.price = price;
    return itemCart;
}

function getListItemCart() {
    var listItemCart = new Array();
    var jsonListItemCart = localStorage.getItem(keyLocalStorageItemCart);
    if (jsonListItemCart != null) {
        listItemCart = JSON.parse(jsonListItemCart);
    }
    return listItemCart;
}

function saveListItemCartInLocal(listItemCart) {
    var jsonListItemCart = JSON.stringify(listItemCart);
    localStorage.setItem(keyLocalStorageItemCart, jsonListItemCart);
}

function deleteItemCartInLocal(id) {
    var ListItemCart = getListItemCart();
    var idxoa = -1;
    for (var i = 0; i < ListItemCart.length; i++) {
        var itemCart = ListItemCart[i];
        if (itemCart.id == id) {
            idxoa = i;
        }
    }
    for (var i = idxoa; i < ListItemCart.length - 1; i++) {
        ListItemCart[i] = ListItemCart[i+1];
    }
    if (idxoa != -1) {
        -- ListItemCart.length;
    }
    saveListItemCartInLocal(ListItemCart);
}

function addAmountInnerID(idHTML) {
    var nodeCart = document.getElementById(idHTML);
    var ListItemCart = getListItemCart();
    var sl = ListItemCart.length;
    nodeCart.innerText = sl;
    if (sl == 0) {
        var cart = 'GIỎ HÀNG';
        nodeCart.innerText = cart;
    }
    
}