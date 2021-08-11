var keyLocalStorageItemCart = 'Address';

function createAddress(inputFullname, inputPhone, inputEmail, inputCity, inputDistrict, inputAddress) {
    var address = new Object()
    address.fullName = inputFullname;
    address.phone = inputPhone;
    address.email = inputEmail;
    address.city = inputCity;
    address.district = inputDistrict;
    address.address = inputAddress;
    return address;
}

function saveAddress(address) {
    var jsonAddress = JSON.stringify(address);
    localStorage.setItem(keyLocalStorageItemCart, jsonAddress);
}
