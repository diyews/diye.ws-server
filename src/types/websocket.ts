import * as http from "http";
import * as events from 'events';
import * as WebSocket from 'ws';

export declare class IWebSocket extends events.EventEmitter {
  // project variable
  isAlive: boolean;

  static CONNECTING: number;
  static OPEN: number;
  static CLOSING: number;
  static CLOSED: number;

  binaryType: string;
  bufferedAmount: number;
  extensions: string;
  protocol: string;
  readyState: number;
  url: string;

  CONNECTING: number;
  OPEN: number;
  CLOSING: number;
  CLOSED: number;

  onopen: (event: { target: WebSocket }) => void;
  onerror: (event: {error: any, message: string, type: string, target: WebSocket }) => void;
  onclose: (event: { wasClean: boolean; code: number; reason: string; target: WebSocket }) => void;
  onmessage: (event: { data: WebSocket.Data; type: string; target: WebSocket }) => void;

  constructor(address: string, options?: WebSocket.ClientOptions);
  constructor(address: string, protocols?: string | string[], options?: WebSocket.ClientOptions);

  close(code?: number, data?: string): void;
  ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
  pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
  send(data: any, cb?: (err?: Error) => void): void;
  send(data: any, options: { mask?: boolean; binary?: boolean; compress?: boolean; fin?: boolean }, cb?: (err?: Error) => void): void;
  terminate(): void;

  // HTML5 WebSocket events
  addEventListener(method: 'message', cb?: (event: { data: any; type: string; target: WebSocket }) => void): void;
  addEventListener(method: 'close', cb?: (event: {
    wasClean: boolean; code: number;
    reason: string; target: WebSocket
  }) => void): void;
  addEventListener(method: 'error', cb?: (event: {error: any, message: any, type: string, target: WebSocket }) => void): void;
  addEventListener(method: 'open', cb?: (event: { target: WebSocket }) => void): void;
  addEventListener(method: string, listener?: () => void): void;

  removeEventListener(method: 'message', cb?: (event: { data: any; type: string; target: WebSocket }) => void): void;
  removeEventListener(method: 'close', cb?: (event: {
    wasClean: boolean; code: number;
    reason: string; target: WebSocket
  }) => void): void;
  removeEventListener(method: 'error', cb?: (event: {error: any, message: any, type: string, target: WebSocket }) => void): void;
  removeEventListener(method: 'open', cb?: (event: { target: WebSocket }) => void): void;
  removeEventListener(method: string, listener?: () => void): void;

  // Events
  on(event: 'close', listener: (this: WebSocket, code: number, reason: string) => void): this;
  on(event: 'error', listener: (this: WebSocket, err: Error) => void): this;
  on(event: 'upgrade', listener: (this: WebSocket, request: http.IncomingMessage) => void): this;
  on(event: 'message', listener: (this: WebSocket, data: WebSocket.Data) => void): this;
  on(event: 'open' , listener: (this: WebSocket) => void): this;
  on(event: 'ping' | 'pong', listener: (this: WebSocket, data: Buffer) => void): this;
  on(event: 'unexpected-response', listener: (this: WebSocket, request: http.ClientRequest, response: http.IncomingMessage) => void): this;
  on(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;

  addListener(event: 'close', listener: (code: number, message: string) => void): this;
  addListener(event: 'error', listener: (err: Error) => void): this;
  addListener(event: 'upgrade', listener: (request: http.IncomingMessage) => void): this;
  addListener(event: 'message', listener: (data: WebSocket.Data) => void): this;
  addListener(event: 'open' , listener: () => void): this;
  addListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
  addListener(event: 'unexpected-response', listener: (request: http.ClientRequest, response: http.IncomingMessage) => void): this;
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;

  removeListener(event: 'close', listener: (code: number, message: string) => void): this;
  removeListener(event: 'error', listener: (err: Error) => void): this;
  removeListener(event: 'upgrade', listener: (request: http.IncomingMessage) => void): this;
  removeListener(event: 'message', listener: (data: WebSocket.Data) => void): this;
  removeListener(event: 'open' , listener: () => void): this;
  removeListener(event: 'ping' | 'pong', listener: (data: Buffer) => void): this;
  removeListener(event: 'unexpected-response', listener: (request: http.ClientRequest, response: http.IncomingMessage) => void): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
}
