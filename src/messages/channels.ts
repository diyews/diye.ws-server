import { Message_train } from './message_train';
import { Channels } from '../types/channels';

export const messageChannels: Channels = {
  train_tickets: Message_train.ticketNotify,
};
