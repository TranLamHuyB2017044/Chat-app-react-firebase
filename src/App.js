import Login from "./components/LoginComponent/Login";
import Cookies from 'universal-cookie'
import {useState, useRef} from 'react'
import ChatRoom from "./components/ChatRoomComponent/ChatRoom";

const cookie = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookie.get('auth-token'));
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)
  if(!isAuth) {
    return (
      <div className="App">
         <Login setIsAuth ={setIsAuth}/>

      </div>
    );
  }
  return (
    <div>
      {room ? (<div><ChatRoom room={room} isAuth ={isAuth}/></div>) : 
          (<div className="room">
              <h1>Enter chat room</h1>
              <input ref={roomInputRef}/>
              <button onClick={() => setRoom(roomInputRef.current.value)}>Enter the chat</button>
          </div>)
      }
    </div>
  )
}

export default App;
