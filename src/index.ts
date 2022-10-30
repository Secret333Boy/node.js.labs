import Server from './lib/Server';
import router from './routes/index';

const PORT = process.env.PORT || 5000;

const server = new Server();

server.use(router).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
