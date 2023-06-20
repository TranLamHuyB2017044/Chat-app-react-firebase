
import { useState } from 'react';
import Messages from '../MessageComponent/Messages';
import Navbar from '../NavbarComponent/Navbar';
import styles from './Chat.module.scss'
function ChatRoom(props) {
  const { setIsAuth } = props;
  const [getRoom, setGetRoom] = useState('')
  return ( 
    <div className={styles.Room_container}>
        <Navbar setGetRoom ={setGetRoom}  setIsAuth = {setIsAuth}/>
        <Messages getRoom = {getRoom}  />
    </div>
  ) 
}

export default ChatRoom;
