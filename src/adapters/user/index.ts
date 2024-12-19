import {get} from "lodash";

export const getFullName = (user = {}) => get(user,"fullName","");
export const getEmail = (user = {}) => get(user,"primaryEmailAddress.emailAddress","");
