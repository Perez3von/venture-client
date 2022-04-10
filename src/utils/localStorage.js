export function getStorage(KEY){
    const stringCart = localStorage.getItem(KEY);
    const cart = JSON.parse(stringCart) || [];
    return cart;
}
export function setStorage(KEY, venture){
    const user = venture.charAt(0).toUpperCase() + venture.slice(1);
    localStorage.setItem(KEY, JSON.stringify(user));
}

export function setStorageEmail(KEY, email){
    const user = email.toLowerCase();
    localStorage.setItem(KEY, JSON.stringify(user));
}