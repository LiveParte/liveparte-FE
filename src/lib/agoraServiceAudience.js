import { createClient } from 'agora-rtc-sdk-ng';

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;

let client;
let hostUid = null;
let networkQualityCallback;

export const initializeAgoraClient = (container, setHostDimensions, setNetworkQuality, setStatus) => {
  if (typeof window !== 'undefined') {
    client = createClient({ mode: 'live', codec: 'vp8' });

    client.on('user-published', async (user, mediaType) => {
      console.log('user-published:', user.uid, mediaType);
      if (!hostUid) {
        hostUid = user.uid;
        console.log('Host UID set:', hostUid);
        setStatus('Host is live');
      } else if (user.uid !== hostUid) {
        return;
      }

      try {
        await client.subscribe(user, mediaType);
        console.log('Subscribed to user:', user.uid, mediaType);
        if (mediaType === 'video') {
          let playerContainer = document.getElementById(user.uid.toString());
          if (!playerContainer) {
            playerContainer = document.createElement('div');
            playerContainer.id = user.uid.toString();
            playerContainer.style.width = '100%';
            playerContainer.style.height = '100%';
            container.appendChild(playerContainer);
          }
          user.videoTrack.play(playerContainer);

          const videoTrack = user.videoTrack;
          const settings = videoTrack.getSettings();
          setHostDimensions({ width: settings.width, height: settings.height });
          setStatus('Host is live');
          console.log('Host is live');
        }

        if (mediaType === 'audio') {
          user.audioTrack.play();
        }

      } catch (error) {
        console.error('Failed to subscribe to user:', error);
      }
    });

    client.on('user-unpublished', user => {
      console.log('user-unpublished:', user.uid);
      if (user.uid === hostUid) {
        const playerContainer = document.getElementById(user.uid);
        if (playerContainer) {
          playerContainer.remove();
        }
        setStatus('Host has stopped publishing');
        console.log('Host has stopped publishing');
      }
    });

    client.on('user-left', user => {
      console.log('user-left:', user.uid);
      if (user.uid === hostUid) {
        const playerContainer = document.getElementById(user.uid);
        if (playerContainer) {
          playerContainer.remove();
        }
        hostUid = null;
        setStatus('Host has left the stream');
        console.log('Host has left the stream');
        if (networkQualityCallback) {
          networkQualityCallback('Host has left the stream');
        }
      }
    });

    client.on('network-quality', ({ uid, downlinkNetworkQuality }) => {
      if (uid === hostUid && networkQualityCallback) {
        let quality = '';
        switch (downlinkNetworkQuality) {
          case 1:
            quality = 'Excellent';
            break;
          case 2:
            quality = 'Good';
            break;
          case 3:
            quality = 'Poor';
            break;
          case 4:
            quality = 'Bad';
            break;
          case 5:
            quality = 'Very Bad';
            break;
          default:
            quality = 'Unknown';
            break;
        }
        setNetworkQuality(quality);
        console.log('Network quality:', quality);
      }
    });

    return client;
  }
};

export const joinChannel = async (eventId) => {
  if (!client) {
    initializeAgoraClient();
  }

  try {
    await client.join(APP_ID, eventId, null, null);
    console.log('Joined channel:', eventId);
  } catch (error) {
    console.error('Failed to join the channel:', error);
  }
};

export const leaveChannel = async () => {
  if (client) {
    await client.leave();
    console.log('Left channel');
    if (hostUid !== null) {
      const playerContainer = document.getElementById(hostUid.toString());
      if (playerContainer) {
        playerContainer.remove();
      }
      hostUid = null;
    }
  }
};

export const setNetworkQualityCallback = (callback) => {
  networkQualityCallback = callback;
};
