import Login from "./components/LoginComponent/Login";
import Cookies from 'universal-cookie'
import {useState} from 'react'
import ChatRoom from "./components/ChatRoomComponent/ChatRoom";
const cookie = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookie.get('auth-token'));
  if(!isAuth) {
    return (
         <Login setIsAuth ={setIsAuth}/>
    );
  }
  return (
      <ChatRoom setIsAuth ={setIsAuth}/>
  )
}

export default App;
