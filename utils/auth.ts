import axios from "axios";

const checkAuthStatus = async (jwt: string) => {

}

const buildAuthHeaders = (jwt?: string) => {
    if (jwt) {
        return {
            headers: {
                Authorization: jwt
            }
        }
    }

    const localUser = typeof window !== "undefined" ? localStorage.getItem('chrome-extension-user') : null;
    if (localUser) {
        const { jwt } = JSON.parse(localUser);
        return {
            headers: {
                Authorization: jwt
            }
        }
    }

    return {
        headers: {}
    };
}

export { checkAuthStatus, buildAuthHeaders };
