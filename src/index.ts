import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 5000;

const requestListener = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify({ message: 'pong' }));
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
