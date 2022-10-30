import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import send from './send.js';

type HTTP_METHOD =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'
  | 'CONNECT'
  | 'TRACE';

// eslint-disable-next-line no-unused-vars
type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export default class Router {
  private handlers: { [path: string]: { [method: string]: Handler[] } } = {};

  handle(req: IncomingMessage, res: ServerResponse): void {
    const path = new URL(req.url || '/', `http://${req.headers.host}`).pathname;
    const method = req.method || 'GET';

    const routeHandlers = this.handlers[path]?.[method];
    if (!routeHandlers || routeHandlers.length === 0) {
      send(res, 'Not found', 'json', 404);
      return;
    }

    for (const handler of this.handlers[path][method]) {
      handler(req, res);
    }
  }

  add(method: HTTP_METHOD, path = '/', ...handlers: Handler[]) {
    if (!this.handlers[path]?.[method])
      this.handlers[path] = {
        ...(this.handlers[path] || {}),
        [method]: [...handlers],
      };
    else this.handlers[path][method].concat(handlers);
  }
}
