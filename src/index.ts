import Server from './lib/Server.js';
import router from './routes/index.js';

const PORT = process.env.PORT || 5000;

const server = new Server();

server.use(router).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
