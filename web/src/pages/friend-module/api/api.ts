export default {
    getFriendsOfUser: (setFriends, id) => {
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
    },

    getAllFriends: (userID, setFriends) => {
        fetch(`http://localhost:8081/friend-module/${userID}/username-contains?username=""`)
        .then(response => response.json())
        .then(data => setFriends(data))
        .catch(err => console.error(err));
    },

    removeFriend: (userID, friend, update) => {
        fetch(`http://localhost:8081/friend-module/${userID}/remove-friend?receiverId=${friend.id}`, {
            method: "PATCH"
        }).then(response => {
            if (response.status == 200) {
                update();
                alert(`User \"${friend.name}\" has been removed from the friend list!`);
            }
        }).catch(err => {
            console.error(err);
            alert(err);
        });
    },

    addFriend: (userID, friend) => {
        fetch(`http://localhost:8081/friend-module/${userID}/send-friend-request?receiverId=${friend.id}`, {
            method: "PATCH"
        })
        .then(response => {
            if (response.status == 200) {
                alert(`Friend request to ${friend.username} has been sent!`);
            } else {
                alert("Failed to send friend request :(");
            }
        }).catch(err => console.error(err));
    },

    getPendingRequests: (userID, setRequests) => {
        fetch(`http://localhost:8081/friend-module/${userID}/get-friend-requests`)
        .then(response => response.json())
        .then(json => {
            const temp = [];
            for (const property in json) {
                temp.push({
                    id: property,
                    username: json[property]
                });
            }
            console.log(temp);
            setRequests(temp);
        }).catch(err => console.error(err))
    },

    acceptFriendRequest: (userID, request) => {
        fetch(`http://localhost:8081/friend-module/${userID}/accept-friend-request?senderId=${request.id}`, {
            method: "PATCH"
        })
        .then(response => {
            if (response.status == 200) {
                alert(`Friend request from ${request.username} has been accepted!`)
            } else {
                alert(`Failed to accept friend request from ${request.username}`);
            }
        }).catch(err => console.error(err));
    }
}