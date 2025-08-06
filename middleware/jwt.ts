import { verifyToken } from '../utils/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Higher-order function to protect API handlers using JWT authentication.
 * It looks for a Bearer token in the Authorization header and
 * decodes the payload. The decoded user is attached to req.user. If no
 * token is provided or verification fails the request is rejected with
 * HTTP 401. This middleware can be composed around any API route handler.
 *
 * Usage:
 * export default jwtMiddleware(async function handler(req, res) { ... });
 */
export default function jwtMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const authHeader = req.headers['authorization'] || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : null;

      if (!token) {
        return res.status(401).json({ error: 'Missing authorization token' });
      }

      const decoded = verifyToken(token);
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error('JWT middleware error:', error);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
} 