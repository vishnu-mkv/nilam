import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
import { User } from "../slices/userSlice";

const auth=getAuth();

export const authService = {    
    
    signInUser(email:string,password:string): Promise<User> { 
        return new Promise((resolve, reject) => {
    
            signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // get uid
                const uid = userCredential.user.uid;
                // fetch user doc related to uid
                getDoc(doc(collection(db, 'users'), uid))
                .then(data =>{
                    let userDoc = data.data() as User;
                    resolve(userDoc);
                })
                .catch(error => reject(error));
            })
            .catch(error => reject(error));
        });
    },

    signOut() {
        auth.signOut();	
    }
}