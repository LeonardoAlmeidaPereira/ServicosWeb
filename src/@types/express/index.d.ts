import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    userRole: string;
  }
}

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}