import styles from './Login.module.scss';
import firebase, {auth} from '../../Firebase/firebaseConfig.js';
import Cookies from 'universal-cookie'

const cookie = new Cookies();
const googleProvider = new firebase.auth.GoogleAuthProvider()
function Login(props){
    const {setIsAuth} = props;
    const handleLogin = async () =>{
        try {
            const result = await auth.signInWithPopup(googleProvider)
            cookie.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.login_container}>
            <h2>Simple Chat App</h2>
            <p>Sign In</p>
            <div className={styles.button_container}>
                <button onClick={handleLogin}>Sign In With Google</button>
            </div>
        </div>
    )
}

export default Login