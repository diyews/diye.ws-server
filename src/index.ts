import { Server } from 'ws';
import { handleMessage } from './handle_message';
import { IWebSocket } from './types/websocket';
import { AppConstants } from './data/constants';

function noop() {}

function heartbeat() {
  // console.log('pong');
  this.isAlive = true;
}

const wss = new Server({
  port: 8701,
  verifyClient(option, cb) {
    const token = option.req.headers.token;
    if (token === AppConstants.wsSecret) {
      cb(true);
    } else {
      cb(false, 401, 'Unauthorized');
    }
  }
});

wss.on('connection', function connection(ws: IWebSocket) {
  const channels = {};

  ws.isAlive = true;
  ws.on('pong', heartbeat);

  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(<string>message);
      handleMessage(data, this as IWebSocket, channels);
    } catch (e) {
      console.error(e);
    }

    console.log('received: %s', message);
    ws.send(message);
  });

  ws.on('close', () => {
    console.log('close');
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws: IWebSocket) {
    if ((<any>ws).isAlive === false) {
      console.log('terminate');
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 10e3);
