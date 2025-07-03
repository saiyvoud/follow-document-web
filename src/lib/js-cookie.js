import Cookies from 'js-cookie';
 const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
export const setCookie = (name, value) => {
    Cookies.set(name, value, {
        expires: oneHourFromNow, // 1h
        path: '/',
        secure: true
    })
}
export const getCookie = (name) => {
    return Cookies.get(name);
}
export const setLongTernCookie = (name, value) => {
    Cookies.set(name, value, {
        path: '/',
        secure: true
    })
}
export const clearCookie = (name) => {
    Cookies.remove(name);
}