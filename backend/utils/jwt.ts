import {jwtVerify} from 'jose';

//Fnction to decode token
const decodeToken = (token: string) => {
  // Load the JWT secret from environment variables
  const { JWT_SECRET } = process.env;
  const secret = new TextEncoder().encode(JWT_SECRET);
  return jwtVerify(token, secret);
};

export { decodeToken };
