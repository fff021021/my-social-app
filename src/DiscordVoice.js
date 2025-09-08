// src/DiscordVoice.js
import React, { useEffect } from "react";
import { initialize } from "@discord/embedded-app-sdk";

function DiscordVoice({ channelId }) {
  useEffect(() => {
    // 環境変数からClient IDを取得
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;

    // Discord SDKを初期化
    const client = initialize({ clientId });

    client.on("ready", async () => {
      console.log("Discord SDK Ready");
      try {
        await client.voice.joinChannel(channelId);
        console.log("通話参加成功");
      } catch (error) {
        console.error("通話参加失敗:", error);
      }
    });

    // クリーンアップ
    return () => {
      if (client.voice) {
        client.voice.leaveChannel(channelId);
      }
    };
  }, [channelId]);

  return (
    <div>
      <p>ボイス通話中（チャンネル: {channelId}）</p>
    </div>
  );
}

export default DiscordVoice;
