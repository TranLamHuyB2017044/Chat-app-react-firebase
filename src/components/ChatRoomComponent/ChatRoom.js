import { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/firebaseConfig";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import {signOut } from 'firebase/auth'
import Cookies from 'universal-cookie'

const cookie = new Cookies();

function ChatRoom(props) {
    const {room, isAuth} = props;
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessage] = useState([])
    const messageRef = collection(db, 'messages')
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(newMessage === "") return ;
        await addDoc(messageRef, {
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
        setNewMessage("")
    }
    const handleSignOut = async() => {
        await signOut(auth)
        cookie.remove('auth-token')
        isAuth(false)
        room(null)
    }
    useEffect(() =>{
        const queryMessage = query(messageRef, where('room', '==', room), orderBy('createAt'))
        onSnapshot(queryMessage, (snapshot) =>{
            let messages = []
            snapshot.forEach((doc) =>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessage(messages)
        })
    }, [messageRef, room])

    return ( 
        <div className="chat_component">
            <div className="chat">
                {messages.map((message) =>
                    <h1 key={message.id}>{message.text}</h1>
                )}
            </div>
            <form className="new_message_form">
                <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSubmit} type="submit">Send</button>
                <div className="sign-out">
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </form>
        </div>
    );
}

export default ChatRoom;