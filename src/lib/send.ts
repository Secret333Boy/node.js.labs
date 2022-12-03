import { ServerResponse } from 'http';

const formatResponse = {
  json: (data: unknown, fallback = {}) => {
    const contentType = 'application/json';

    try {
      const formattedData = JSON.stringify(data);
      return { formattedData, contentType };
    } catch (error) {
      return { formattedData: fallback, contentType };
    }
  },
};

export default function (
  res: ServerResponse,
  data: any,
  type: keyof typeof formatResponse = 'json',
  statusCode = 200
) {
  if (!(type in formatResponse))
    throw new Error(`Unsupported response type: ${type}`);

  const { formattedData, contentType } = formatResponse[type](data);

  res.setHeader('Content-Type', contentType);

  res.writeHead(statusCode);

  res.write(formattedData);

  res.end();
}
