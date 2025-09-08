// src/Channel.js
import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

function Channel({ user, channelId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const messagesRef = collection(db, `channels/${channelId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, [channelId]);

  const sendMessage = async () => {
    if (text === "") return;
    await addDoc(collection(db, `channels/${channelId}/messages`), {
      user: user.displayName,
      text,
      timestamp: serverTimestamp()
    });
    setText("");
  };

  return (
    <div>
      <h2>チャンネル: {channelId}</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="メッセージ..." />
      <button onClick={sendMessage}>送信</button>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}><b>{msg.user}:</b> {msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Channel;
