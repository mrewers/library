import * as admin from 'firebase-admin';

/**
 * Decodes a base64 encoded string into text string.
 *
 * @param {string} encoded A base64 encoded string
 * @returns {string}
 */
const decodeBase64 = (encoded: string): string => {
  const buff = Buffer.from(encoded, 'base64');

  return buff.toString('ascii');
};

/**
 *
 * @param {string} encoded
 */
export const decodeSA = (encoded: string): admin.ServiceAccount => {
  const str = decodeBase64(encoded);

  return JSON.parse(str) as admin.ServiceAccount;
};
