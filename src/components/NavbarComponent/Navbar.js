import { auth } from "../../Firebase/firebaseConfig";
import { Button } from "react-bootstrap";
import { GoSignOut } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import styles from "./Navbar.module.scss";
import { signOut } from "firebase/auth";
import { useState, useContext, useRef } from "react";
import { UserContext } from "../Context/AuthProvider";
import Cookies from "universal-cookie";
const cookie = new Cookies();

function Navbar(props) {
  const [room, setRoom] = useState()
  const roomInputRef = useRef(null);
  const user = useContext(UserContext);
  const [listRoom, setListRoom] = useState(false);
  const { setIsAuth, setGetRoom } = props;
  const handleSignOut = async () => {
    await signOut(auth);
    cookie.remove("auth-token");
    setIsAuth(false);
  };

  const handleFindRoom = (e) => {
    if (e.key ==='Enter') {
      setRoom(roomInputRef.current.value)
      setGetRoom(room)
      roomInputRef.current.value = ''
    }
  }
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_header}>
        <div className={styles.user_info}>
          <img src={user.user.photoURL} alt={user.user.displayName} />
          <p>{user.user.displayName}</p>
        </div>
        <div className={styles.sign_out}>
          <Button variant="outline-dark" size="sm" onClick={handleSignOut}>
            <GoSignOut /> Sign out
          </Button>
        </div>
      </div>
      <div className={styles.navbar_body}>
        <div className={styles.searchBox}>
          <input 
            placeholder="Search room"
            ref={roomInputRef}
            onKeyDown={handleFindRoom}
            onChange={() => setRoom(roomInputRef.current.value)}
          />
          <BsSearch onClick={handleFindRoom}/>
        </div>
        {listRoom ? (
          <div
            className={styles.dropdown}
            onClick={() => setListRoom(!listRoom)}
          >
            <BsChevronDown />
            <p>Danh sach cac phong</p>
          </div>
        ) : (
          <div
            className={styles.dropdown}
            onClick={() => setListRoom(!listRoom)}
          >
            <BsChevronRight />
            <p>Danh sach cac phong</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
