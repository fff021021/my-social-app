import React, { useState, useEffect } from"react";
import { db } from"./firebaseConfig";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from"firebase/firestore";

function Timeline({ user }){
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => doc.data()));
        });
        return() => unsubscribe();
    },[]);
    
    const handlePost = async() => {
        if (text === "")return;
        await addDoc(collection(db, "posts"),{
            text,
            user: user.displayName,
            timestamp: serverTimestamp()
        });
        setText("");
    };

    return(
        <div>
            <h2>TimeLine</h2>
            <input value={text}onChange={e => setText(e.target.value)}placeholder="Post..."/>
            <button onClick={handlePost}>Post</button>
            <ul>
                {posts.map((post, idx) => (
                    <li key={idx}><b>{post.user}:</b>{post.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Timeline;