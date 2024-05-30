// services/agoraServiceAudience.js
import { createClient } from 'agora-rtc-sdk-ng';

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;

let client;
let hostUid = null;

export const initializeAgoraClient = (container, setHostDimensions) => {
  if (typeof window !== 'undefined') {
    client = createClient({ mode: 'live', codec: 'vp8' });

    client.on('user-published', async (user, mediaType) => {
      if (!hostUid) {
        hostUid = user.uid;
      } else if (user.uid !== hostUid) {
        return;
      }

      try {
        await client.subscribe(user, mediaType);
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

          // Get video track dimensions and set it
          const videoTrack = user.videoTrack;
          const settings = videoTrack.getSettings();
          setHostDimensions({ width: settings.width, height: settings.height });
        }

        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
        
      } catch (error) {
        console.error('Failed to subscribe to user:', error);
      }
    });

    client.on('user-unpublished', user => {
      if (user.uid === hostUid) {
        const playerContainer = document.getElementById(user.uid);
        if (playerContainer) {
          playerContainer.remove();
        }
      }
    });

    client.on('user-left', user => {
      if (user.uid === hostUid) {
        const playerContainer = document.getElementById(user.uid);
        if (playerContainer) {
          playerContainer.remove();
        }
        hostUid = null;
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
  } catch (error) {
    console.error('Failed to join the channel:', error);
  }
};

export const leaveChannel = async () => {
  if (client) {
    await client.leave();
    if (hostUid !== null) {
      const playerContainer = document.getElementById(hostUid.toString());
      if (playerContainer) {
        playerContainer.remove();
      }
      hostUid = null;
    }
  }
};
