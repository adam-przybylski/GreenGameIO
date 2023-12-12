export const logoutUser = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("account");
}