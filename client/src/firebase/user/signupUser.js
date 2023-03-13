import { createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from 'firebase/auth';

async function signupUser(payload){
    const {name,email,password} = payload;
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await updateProfile(user, {displayName: name});

    await signOut(auth);
}

export default signupUser;