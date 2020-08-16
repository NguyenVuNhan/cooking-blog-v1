import setAuthToken from "./setAuthToken";

const clearAuthToken = token => {
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
};

export default clearAuthToken;
