import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

async function loginUser(payload){
    const {email , password} = payload;
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);

    //const user = response.user;
    const {user} = response;
    return user;
}

export default loginUser;