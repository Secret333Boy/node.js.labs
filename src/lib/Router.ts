import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import send from './send';

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  TRACE = 'TRACE',
}

type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => void | Promise<void>;

export default class Router {
  private handlers: { [path: string]: { [method: string]: Handler[] } } = {};

  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const path = new URL(req.url || '/', `http://${req.headers.host}`).pathname;
    const method = req.method || HTTP_METHODS.GET;

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
    this.add(HTTP_METHODS.GET, path, ...handlers);
  }

  post(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.POST, path, ...handlers);
  }

  put(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.PUT, path, ...handlers);
  }

  delete(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.DELETE, path, ...handlers);
  }

  options(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.OPTIONS, path, ...handlers);
  }

  patch(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.PATCH, path, ...handlers);
  }

  trace(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.TRACE, path, ...handlers);
  }

  head(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.HEAD, path, ...handlers);
  }

  connect(path = '/', ...handlers: Handler[]) {
    this.add(HTTP_METHODS.CONNECT, path, ...handlers);
  }
}
