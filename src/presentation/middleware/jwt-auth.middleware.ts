import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // O middleware básico, a autenticação será feita pelo Guard
    next();
  }
}

