declare global {
  type TUuid = string & {
    [TYPE: symbol]: 'Uuid';
  }
}

/**
 * Generates a universally unique identifier (UUID) utilizing the Web Crypto API.
 * 
 * Defaults to using the randomUUID function provided by the Web Crypto API. This function generates
 * a 36 character v4 UUID using a cryptographically secure random number generator. However, it is
 * only available in secure contexts (ex. https). When this function is called in an insecure context,
 * it generates a string similar to a v4 UUID. This string is not guaranteed to be unique, but should
 * be sufficiently random for most uses.
 * 
 * For more information on the crypto API's function please see the following:
 *   - [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
 *   - [randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
 *   - [getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
 * 
 * @returns A randomly generated, 36 character long v4 UUID.
 */
export const generateUuid = () => {
  if ( crypto.randomUUID ) {
    return crypto.randomUUID() as TUuid;
  }

  // Fallback to a pseudo-UUID generated using random values if not in a secure context.
  const randomNumberArray = crypto.getRandomValues(new Uint16Array(5));

  return randomNumberArray.join("-");
}