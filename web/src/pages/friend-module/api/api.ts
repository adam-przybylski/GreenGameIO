const api = {
    getFriends: async () => {
        const result = await fetch("http://localhost:8081/friend-module", {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Authorization": "Basic " + btoa("admin:password")
            }
        });
        return result.json();
    }
};
export default api;