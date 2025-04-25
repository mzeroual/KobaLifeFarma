import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

// ✅ Declare user field directly in Express Request type
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"]

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid token" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded // ✅ Works now with no TS error
    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" })
  }
}
