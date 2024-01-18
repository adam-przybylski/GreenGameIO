import { useEffect, useState } from "react";
import api from "../api/api";
import { Stomp } from "@stomp/stompjs";

const ChatModal = ({close, friend, userID}) => {
    const [chat, setChat] = useState();
    const [messages, setMessages] = useState([]);
    const [temp, setTemp] = useState([]);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState();
    const fetchChat = () => {
        api.getChat(friend.chatId, setChat);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        } 
    }

    useEffect(() => {
        const client = Stomp.client(`ws://localhost:8081/ws`);
        client.onConnect = (frame) => {
            console.log(frame);
            client.subscribe(`/topic/${friend.chatId}`, (data) => {
                console.log(messages);
                setMessages([...messages, JSON.parse(data.body)]);
            });
        }
        client.onWebSocketError((error) => console.log(error));
        client.onStompError((error) => console.log(error));
        client.activate();
        setClient(client);
    }, []);

    const sendMessage = () => {
        client.publish({
            destination: `/app/chat/${friend.chatId}`,
            body: JSON.stringify({
                senderID: userID,
                timestamp: new Date(),
                content: message
            })
        });
        setMessage("");
    }

    useEffect(() => fetchChat(), []);
    useEffect(() => setTemp([...temp, messages[0]]), [messages]);

    return (
        <div id="modal-background" onClick={e => e.stopPropagation()}>
            <div id="modal">
                <div id="heading">
                    <button onClick={close}>
                        <svg id="close-button" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path stroke="black" strokeWidth="0.3" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <div className="chat">
                { chat && chat.messages.map((x, i) => <p className={userID == x.senderID ? "message right-user" : "message"}>{x.senderName}, {x.timestamp}: {x.content}</p>) }
                { temp && temp.slice(1).map((x, i) => <p className={userID == x.senderID ? "message right-user" : "message"}>{x.senderName}, {x.timestamp}: {x.content}</p>) }

                </div>
                <input onChange={e => setMessage(e.target.value)} value={message} className="text" type="text" name="" id="" onKeyDown={handleKeyDown}/>
                <button className="button" onClick={sendMessage}>Wyślij</button>
             </div>
        </div>  
    );
}

export default ChatModal;