import React from "react";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function Login({ onLogin }) {
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                onLogin(result.user);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <button onClick={loginWithGoogle}>Login With Google</button>
        </div>
    );
}

export default Login;
