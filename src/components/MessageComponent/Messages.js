import styles from "./Messages.module.scss";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { UserContext } from "../Context/AuthProvider";
import { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "../../Firebase/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
function Messages(props) {
  const { getRoom } = props;
  const room = getRoom;
  const messageListRef = useRef()
  const user = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessage] = useState([]);
  const messageRef = collection(db, "messages");
  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newMessage === "") return;
      await addDoc(messageRef, {
        text: newMessage,
        createAt: Timestamp.fromDate(new Date()),
        user: {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          userID: auth.currentUser.uid,
          image: auth.currentUser.photoURL,
        },
        room,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createAt")
    );
    const unsubcribe = onSnapshot(queryMessage, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessage(messages);
    });
    return () => unsubcribe;

  }, [messageRef, room]);
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
    // eslint-disable-next-line
  }, [newMessage]);

  return (
    <div className={styles.messages_container}>
      {room ? (
        <>
          <div className={styles.header}>
            <div className={styles.infor_room}>
              <p className={styles.name_room}>{room}</p>
              <p className={styles.description}>description</p>
            </div>
            <div className={styles.members}>
              <AiOutlineUsergroupAdd />
              <p>Invite</p>
              <img src={user.user.photoURL} alt={user.user.displayName} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.chat_container} ref={messageListRef}>
            <div className={styles.chat} >
              {messages.map((message) => (
                <div key={message.id} className={styles.messages}>
                  <p className={styles.name}>{message.user.name}</p>
                  <img src={message.user.image} alt={message.user.name} />
                  <div className={styles.text_time}>
                    <p className={styles.text}>{message.text}</p>
                    <p className={styles.time}>
                      {message.createAt.toDate().toLocaleTimeString("en-US")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </form>
          <div className={styles.input_chat}>
            <input
              placeholder="enter the chat"
              value={newMessage}
              onKeyDown={handleSubmit}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className={styles.header}>
          <div className={styles.infor_room}>
            <p className={styles.name_room}>Hay nhap ten phong</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
