import http, { IncomingMessage, ServerResponse } from 'http';

const requestListener = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'pong' }));
};

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});
