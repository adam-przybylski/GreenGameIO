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

    getAllUsers: (id, setUsers) => {
        fetch(`http://localhost:8081/friend-module/${id}/username-contains?username`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => console.error(err));
    },

    removeFriend: (id, friend) => {
        fetch(`http://localhost:8081/friend-module/${id}/remove-friend?receiverId=${friend.id}`, {
            method: "PATCH"
        }).then(response => {
            if (response.status == 200) {
                alert(`User \"${friend.name}\" has been removed from the friend list!`);
            }
        }).catch(err => {
            console.error(err);
            alert(err);
        });
    },

    addFriend: (id, friend) => {
        fetch(`http://localhost:8081/friend-module/${id}/send-friend-request?receiverId=${friend.id}`, {
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

    getPendingRequests: (id, setRequests) => {
        fetch(`http://localhost:8081/friend-module/${id}/get-friend-requests`)
        .then(response => response.json())
        .then(json => {
            const temp = [];
            for (const property in json) {
                temp.push({
                    id: property,
                    username: json[property]
                });
            }
            setRequests(temp);
        }).catch(err => console.error(err))
    },

    acceptFriendRequest: (id, request) => {
        fetch(`http://localhost:8081/friend-module/${id}/accept-friend-request?senderId=${request.id}`, {
            method: "PATCH"
        })
        .then(response => {
            if (response.status == 200) {
                alert(`Friend request from ${request.username} has been accepted!`);
            } else {
                alert(`Failed to accept friend request from ${request.username}`);
            }
        }).catch(err => console.error(err));
    },

    getUsersGroups: (id, setGroups) => {
        fetch(`http://localhost:8081/friend-module/${id}/groups`)
        .then(response => response.json())
        .then(json => setGroups(json));
    },

    createGroup: (id, body) => {
        fetch(`http://localhost:8081/friend-module/${id}/groups`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status == 200) {
                alert(`Group ${body.name} has been created!`)
            } else {
                alert("Failed to create group :(");
            }
        }).catch(err => console.error(err));
    },

    deleteGroup: (id, group) => {
        fetch(`http://localhost:8081/friend-module/${id}/groups/${group.id}`, {
            method: "DELETE"
        }).then(response => {
            if (response.status == 200) {
                alert(`Group ${group.name} has been deleted!`);
            } else {
                alert("Failed to delete group :(")
            }
        }).catch(err => console.error(err));
    },

    addGroupMember: (id, group, member) => {
        fetch(`http://localhost:8081/friend-module/${id}/groups/${group.id}/add-member?memberId=${member.id}`, {
            method: "PATCH"
        }).then(response => {
            if (response.status == 200) {
                alert(`Friend ${member.name} has been added to group ${group.name}!`);
            } else {
                alert("Failed to add user to group :(");
            }
        }).catch(err => console.error(err));
    }
}