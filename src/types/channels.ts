import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';

export interface Channels {
  [prop_name: string]: Subject<any>;
}

export interface SubscriptionChannels {
  [prop_name: string]: Subscription;
}
