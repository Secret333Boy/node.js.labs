import { XMLParser } from 'fast-xml-parser';

export const jsonParser = async (
  jsonString: string,
  fallback: unknown = {}
) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return fallback;
  }
};

export const xmlParser = async (xmlString: string, fallback: unknown) => {
  try {
    const parser = new XMLParser();
    return parser.parse(xmlString);
  } catch (error) {
    return fallback;
  }
};

export const textParser = async (text: string) => text;
