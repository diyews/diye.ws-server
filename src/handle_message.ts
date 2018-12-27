import { WsData } from './types/websocket_data';
import { messageChannels } from './messages/channels';
import { SubscriptionChannels } from './types/channels';
import { IWebSocket } from './types/websocket';
import { channelTypes } from './data/maps/channel_types';

export const handleMessage = (wsData: WsData, ws: IWebSocket, channels: SubscriptionChannels) => {
  switch (wsData.type) {
    case channelTypes.sub:
      if (channels[wsData.channel] && !channels[wsData.channel].closed) {
        return;
      }
      // subscribe channel
      channels[wsData.channel] = messageChannels[wsData.channel].subscribe((data) => {
        const sendData: WsData = {
          type: channelTypes.notify,
          data
        };
        ws.send(JSON.stringify(sendData));
      });
      break;
    case channelTypes.unsub:
      if (!channels[wsData.channel] || channels[wsData.channel] && !channels[wsData.channel].closed) {
        return;
      }
      // unsubscribe
      channels[wsData.channel].unsubscribe();
      break;
    case channelTypes.push:
      if (!messageChannels[wsData.channel]) {
        return;
      }
      // push channel
      messageChannels[wsData.channel].next(wsData.data);
      break;
    default:
  }
};
