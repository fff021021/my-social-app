// src/DiscordVoice.js
import React, { useEffect } from "react";
import { Client } from "@discord/embedded-app-sdk";

function DiscordVoice({ channelId }) {
  useEffect(() => {
    // 環境変数からClient IDを取得
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;

    const client = new Client({ clientId });

    client.on("ready", () => {
      console.log("Discord SDK Ready");
      client.voice.joinChannel(channelId)
        .then(() => console.log("通話参加成功"))
        .catch(console.error);
    });

    return () => {
      client.voice.leaveChannel(channelId);
    };
  }, [channelId]);

  return (
    <div>
      <p>ボイス通話中（チャンネル: {channelId}）</p>
    </div>
  );
}

export default DiscordVoice;

