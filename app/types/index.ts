import {User} from '@prisma/client';
export type SafeUser=Omit<
    User,
    'ceratedAt' | 'updatedAt' | 'emailVerified'
> &{
    createdAt:string;
    updatedAt:string;
    emailVerified:string|null;

};