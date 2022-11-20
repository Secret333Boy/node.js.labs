import http, { Server } from 'http';
import { Socket } from 'net';
import Router from './Router';
import send from './send';

const UNAVAILABLE_MESSAGE = 'Service is unavailable';

export default class {
  private httpServer: Server;
  private router?: Router;
  private connections = new Map<
    Socket,
    http.ServerResponse<http.IncomingMessage>
  >();

  constructor(longResonseMs = 100000) {
    this.httpServer = http.createServer((_req, res) => {
      if (!res.socket) return;
      this.connections.set(res.socket, res);
      setTimeout(() => {
        send(res, UNAVAILABLE_MESSAGE, 'json', 503);
      }, longResonseMs);
    });

    this.httpServer.on('connection', (socket) => {
      socket.on('close', () => {
        this.connections.delete(socket);
      });
    });

    this.httpServer.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    return this;
  }

  use(router: Router): this {
    this.router = router;
    return this;
  }

  listen(...params: Parameters<Server['listen']>): void {
    if (!this.router) throw new Error('No router used by server');
    this.httpServer.on('request', this.router.handle.bind(this.router));
    this.httpServer.listen(...params);
  }

  async closeConnections() {
    for (const [connection, res] of this.connections.entries()) {
      this.connections.delete(connection);
      send(res, UNAVAILABLE_MESSAGE, 'json', 503);
      connection.destroy();
    }
  }

  async shutdown(...params: Parameters<Server['close']>) {
    this.httpServer.close((err) => {
      params[0]?.();
      if (err) {
        console.error(err);
        throw err;
      }
    });
    await this.closeConnections();
  }
}
