import axios from "axios";

const api = {
    getFriends: async () => {
        const response = await fetch("http://localhost:8081/friend-module", {
            mode: "no-cors"
        })
        console.log(await response.text());
    }
}
export default api;