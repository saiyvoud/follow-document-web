import { getCookie } from "./js-cookie";

export const checkPermission = (name) => {
    const temp = getCookie('user');
   
    if (temp) {
        const user = JSON.parse(temp);
        console.log(user);
        const permissions = user?.permissions;
        if (permissions) {
            const hasRead = permissions.split(',').includes(name);
            return hasRead;
        }

    }
    return false;


}