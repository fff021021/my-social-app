import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from"firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyCr1cy5WH_DS3PtzbCFPl8biiZuVDIjC6Q",
authDomain: "fuwaringosns.firebaseapp.com",
projectId: "fuwaringosns",
storageBucket: "fuwaringosns.firebasestorage.app",
messagingSenderId: "485390404797",
appId: "1:485390404797:web:d89ba9538a846effbb3bd4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };