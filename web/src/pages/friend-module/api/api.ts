export default {
    getFriends: (setFriends, id) => {
        fetch(`http://localhost:8081/friend-module/${id}/get-friends`)
        .then(response => response.json())
        .then(data => {
            const temp = [];
            data.forEach(friend => {
                delete friend.members[id];
                temp.push({
                    id: Object.keys(friend.members)[0],
                    name: Object.values(friend.members)[0]
                });
            })
            setFriends(temp);
        })
        .catch(err => console.error(err));
    }
}