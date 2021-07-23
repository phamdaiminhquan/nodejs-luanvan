
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


console.log(getListItemCart());