import * as jwks from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const client = jwks({
      cache: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
      rateLimit: true,
    });

    const options: jwt.VerifyOptions = {
      audience: process.env.AUTH0_AUDIENCE_ATTRIBUTE,
      issuer: `https://${process.env.AUTH0_DOMAIN}`,
      algorithms: ['RS256'],
    };

    const getKey = (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.getPublicKey();

        callback(err, signingKey);
      });
    };

    jwt.verify(token, getKey, options, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      res.locals.user = decoded;
      next();

      return undefined; // Explicit return to avoid TypeScript error that 'not all code paths return a value'
    });
  } else {
    res.sendStatus(401);
  }
};