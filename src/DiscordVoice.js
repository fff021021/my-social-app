import React, { useEffect } from 'react';
import { DiscordSDK } from '@discord/embedded-app-sdk';

function DiscordVoice({ channelId }) {
  useEffect(() => {
    const discordSdk = new DiscordSDK(process.env.REACT_APP_DISCORD_CLIENT_ID);

    discordSdk.ready().then(() => {
      console.log('Discord SDK Ready');
      discordSdk.voice
        .joinChannel(channelId)
        .then(() => console.log('通話参加成功'))
        .catch(console.error);
    });

    return () => {
      discordSdk.voice.leaveChannel(channelId);
    };
  }, [channelId]);

  return (
    <div>
      <p>ボイス通話中（チャンネル: {channelId}）</p>
    </div>
  );
}

export default DiscordVoice;
