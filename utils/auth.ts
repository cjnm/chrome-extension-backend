import axios from "axios";

const checkAuthStatus = async (jwt?: string) => {
  try {
    const headers = buildAuthHeaders(jwt);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URI}/api/auth`,
      headers,
    );

    return response.status === 200 ? true : false;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const buildAuthHeaders = (jwt?: string) => {
  if (jwt) {
    return {
      headers: {
        Authorization: jwt,
      },
    };
  }

  const localUser =
    typeof window !== "undefined"
      ? localStorage.getItem("chrome-extension-user")
      : null;

  if (localUser) {
    const { jwt } = JSON.parse(localUser);

    return {
      headers: {
        Authorization: jwt,
      },
    };
  }

  return {
    headers: {},
  };
};

const sessionExist = () => {
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("chrome-extension-user")
  ) {
    return true;
  } else {
    return false;
  }
};

const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("chrome-extension-user");
  }
};

export { checkAuthStatus, buildAuthHeaders, logout, sessionExist };
