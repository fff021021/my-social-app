// src/App.js
import React, { useState } from "react";
import Login from "./Login";
import Timeline from "./Timeline";
import Channel from "./Channel";
import DiscordVoice from "./DiscordVoice";
import "./styles.css"; // CSSを読み込む

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div id="root">
      <div className="sidebar">
        <h2>SNS</h2>
        <p>{user.displayName}</p>
      </div>
      <div className="main">
        <Timeline user={user} />
        <Channel user={user} channelId="general" />
        <DiscordVoice channelId="general" />
      </div>
    </div>
  );
}

export default App;

