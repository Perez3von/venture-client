export function getStorage(KEY){
    const stringCart = localStorage.getItem(KEY);
    const cart = JSON.parse(stringCart) || [];
    return cart;
}
export function setStorage(KEY, venture){
    const userFName = venture.charAt(0).toUpperCase() + venture.slice(1);
    localStorage.setItem(KEY, JSON.stringify(userFName));
}
export function setStorageLastName(KEY, venture){
    const userLName = venture.charAt(0).toUpperCase() + venture.slice(1);
    localStorage.setItem(KEY, JSON.stringify(userLName));
}

export function setStorageEmail(KEY, email){
    const userEmail = email.toLowerCase();
    localStorage.setItem(KEY, JSON.stringify(userEmail));
}
