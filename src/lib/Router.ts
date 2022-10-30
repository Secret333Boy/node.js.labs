import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import send from './send';

export enum HTTP_METHODS {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Connect = 'CONNECT',
  Trace = 'TRACE',
}

type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => void | Promise<void>;

export default class Router {
  private handlers: { [path: string]: { [method: string]: Handler[] } } = {};

  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const path = new URL(req.url || '/', `http://${req.headers.host}`).pathname;
    const method = req.method || HTTP_METHODS.Get;

    const routeHandlers = this.handlers[path]?.[method];
    if (!routeHandlers || routeHandlers.length === 0) {
      send(res, 'Not found', 'json', 404);
      return;
    }

    for (const handler of this.handlers[path][method]) {
      await handler(req, res);
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

  get(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Get, path, ...handlers);
  }

  post(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Post, path, ...handlers);
  }

  put(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Put, path, ...handlers);
  }

  delete(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Delete, path, ...handlers);
  }

  options(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Options, path, ...handlers);
  }

  patch(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Patch, path, ...handlers);
  }

  trace(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Trace, path, ...handlers);
  }

  head(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Head, path, ...handlers);
  }

  connect(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.Connect, path, ...handlers);
  }
}
