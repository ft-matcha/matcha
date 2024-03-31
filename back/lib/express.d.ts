import { Request } from 'express';
import { Strategy } from 'passport-local';
import { Socket } from 'socket.io';

interface user {
    id: string;
    uid: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    gender: string;
    address: string;
    verified: number;
    profile: number;
    status: string;
}
interface Profile {
    profileId: string;
    userId: string;
    image: string[];
    phone: string;
    preferences: string[];
    biography: string;
    tag: string[];
}

declare global {
    namespace Express {
        interface Request {
            id: string;
            data?: user & Profile;
        }
        interface User {
            id: string;
            uid: string;
            email: string;
            password: string;
            lastName: string;
            firstName: string;
        }
    }
    namespace Strategy {
        interface IStrategyOptionsWithRequest {
            uidField: string;
        }
    }
}
