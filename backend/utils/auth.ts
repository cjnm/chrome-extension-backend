import { decodeToken } from './jwt';
import { findUser } from '../controllers/user';

export async function getUser(jwt: string) {
    try {
        if (!jwt) {
            return null;
        }

        // Remove 'Bearer' prefix from token
        const token = jwt.split(' ')[1];

        const decoded = await decodeToken(token);
        const {username, id}  = decoded.payload;
        
        // check if the user is in database
        let user = await findUser({id: id as number, username: username as string});
        
        return user ? user : null;
    } catch (err: any) {
       return null;
    }
}
