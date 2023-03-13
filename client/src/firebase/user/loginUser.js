import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

async function loginUser(payload){
    const {email , password} = payload;
    const auth = getAuth();

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const {user} = response;
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default loginUser;