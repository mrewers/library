import * as jwks from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined) {
    const token = authHeader.split(' ')[1];

    if (typeof process.env.AUTH0_DOMAIN !== 'string') {
      console.log('Invalid value provided from Auth0 domain');
      return undefined;
    }

    const client = jwks({
      cache: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      rateLimit: true,
    });

    const options: jwt.VerifyOptions = {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    };

    const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback): void => {
      if (typeof header.kid === 'string') {
        client.getSigningKey(header.kid, (err, key) => {
          const signingKey = key.getPublicKey();

          callback(err, signingKey);
        });
      }
    };

    jwt.verify(token, getKey, options, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      // Add the decoded user information to the response.
      res.locals.user = decoded;
      next();

      return undefined; // Explicit return to avoid TypeScript error that 'not all code paths return a value'
    });
  } else {
    res.sendStatus(401);
  }
};
