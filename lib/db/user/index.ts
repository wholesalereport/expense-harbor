import prisma from '../../../lib/db/prisma_client'
import {isEmpty} from "lodash";
import {User} from "@clerk/clerk-sdk-node";
import {TUserInput} from "@/lib/types/TUser";


type TCreateUser = (user: TUserInput) => Promise<TUserInput>;

/*TODO: get the types correct */
export const upsertUser:TCreateUser =  async (user: TUserInput) => {
    if(isEmpty(user)) throw 'User can not be empty';

    return prisma.user.upsert({
        where: { id: user.id },
        update: {}, // Do nothing if the user already exists
        create: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
        },
    })
}
