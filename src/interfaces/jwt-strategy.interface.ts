export interface IRole {
  id: number;
  name: string;
  description: string;
}

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
}

export interface UserPayload {
  id: string;
  email: string;
}

export interface UserPayload {
  userId: number;
  email: string;
  username: string;
  name: string;
  lastName: string;
  iat: number;
  exp: number;
}
// filepath: /Users/josetrejo/develop/rent-project/rent-car-backend/src/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  id: number;
  email: string;
  role: string;
  name: string;
}
