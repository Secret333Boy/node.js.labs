/* eslint-disable no-unused-vars */
import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import send from './send.js';

export enum HTTP_METHODS {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  Patch = 'patch',
  Options = 'options',
  Head = 'head',
  Connect = 'connect',
  Trace = 'trace',
}

type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => void | Promise<void>;
type MethodHandlers = (path: string, ...handlers: Handler[]) => void;

export default class Router {
  private handlers: { [path: string]: { [method: string]: Handler[] } } = {};
  [HTTP_METHODS.Get]: MethodHandlers;
  [HTTP_METHODS.Post]: MethodHandlers;
  [HTTP_METHODS.Put]: MethodHandlers;
  [HTTP_METHODS.Delete]: MethodHandlers;
  [HTTP_METHODS.Options]: MethodHandlers;
  [HTTP_METHODS.Trace]: MethodHandlers;
  [HTTP_METHODS.Head]: MethodHandlers;
  [HTTP_METHODS.Connect]: MethodHandlers;
  [HTTP_METHODS.Patch]: MethodHandlers;

  constructor() {
    for (const method of Object.values(HTTP_METHODS)) {
      this[method] = this.add.bind(this, method);
    }
  }

  handle(req: IncomingMessage, res: ServerResponse): void {
    const path = new URL(req.url || '/', `http://${req.headers.host}`).pathname;
    const method = req.method?.toLowerCase() || HTTP_METHODS.Get;

    const routeHandlers = this.handlers[path]?.[method];
    console.dir({ path, method });
    if (!routeHandlers || routeHandlers.length === 0) {
      send(res, 'Not found', 'json', 404);
      return;
    }

    for (const handler of this.handlers[path][method]) {
      handler(req, res);
    }
  }

  add(method: HTTP_METHODS, path = '/', ...handlers: Handler[]) {
    if (!this.handlers[path]?.[method])
      this.handlers[path] = {
        ...(this.handlers[path] || {}),
        [method]: [...handlers],
      };
    else this.handlers[path][method].push(...handlers);
  }
}
