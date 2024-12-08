//@ts-nocheck
import {createLogger, format, transports} from 'winston';
import _ from 'lodash'
import {vercelKVClient} from "./vercelKV";
import {LOGGER_EX_DURATION} from "../constants";
import {ENABLE_CONSOLE_LOG, ENABLE_EXTERNAL_LOGGER} from "@/constants/logger";

export const sanitizeLog = (message: string) => {
    const removeAttributes = ["password"];
    removeAttributes.forEach(attr => {
        delete message[attr];
    })
    return message;
}



// export const getBody = ({body} = {}) => {
//     try {
//         return JSON.stringify(body)
//     } catch (e) {
//         console.error("Error while parsing body will return as is");
//         return `${body}`;
//     }
// }

export const getIp = (request = {}) => {
    if (_.isEmpty(request)) {
        return;
    }
    let ip;

    try {
        if (request.headers['x-forwarded-for']) {
            ip = request.headers['x-forwarded-for'].split(',')[0];
        } else if (request.headers['x-real-ip']) {
            ip = request.connection.remoteAddress;
        } else {
            ip = request.connection.remoteAddress;
        }
    } catch (e) {
        console.error("Error getting ip address:", e);
    }
    return ip;
}

export const getUserAgent = (request = {}) => request && request.headers && request.headers['user-agent'];

const getLogger = () => { //fileName = 'application'
    // const fileLogTransport = new transports.DailyRotateFile({
    //     filename: `logs/${fileName}-%DATE%.log`,
    //     datePattern: 'YYYY-MM-DD',
    //     zippedArchive: true,
    //     maxSize: '20m',
    //     maxFiles: '30d',
    // });

    const consoleTransport = new transports.Console({
        level: process.env.LOG_LEVEL,
        handleExceptions: false,
        json: false,
        colorize: true,
        format: format.printf((i) => `${i.message}`),
    });

    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({stack: true}),
            format.splat(),
            format.printf(
                ({level, message, label = process.env.NODE_ENV, timestamp}) =>
                    `${timestamp} [${label}] ${level}: ${message}`
            )
        ),
        defaultMeta: {service: 'my-app'},
        transports: [consoleTransport],
    });


};

interface LogMessageOptions {
    status?: 'info' | 'warn' | 'error'; // Add more status types as needed
    messageType?: string;
    message: string;
    user?: {
        id?: string;
        email?: string;
    };
    referenceID?: number;
    request?: any; // Replace 'any' with a more specific type if possible
    consoleLogOnly?: boolean;
}

export const createLogMessage = (
    {status = 'info', messageType = "", message = "", user = {}, referenceID = +new Date, request,consoleLogOnly = false}:LogMessageOptions
) => {
    const {id: userId, email} = user || {};
    const logger = getLogger();
    const ip = getIp(request);
    const browserInfo = getUserAgent(request);
    const url = _.get(request, 'url');

    if(ENABLE_CONSOLE_LOG){
        logger[status](`[${new Date().toLocaleString('en-US')}][${referenceID}][ip:${ip || 'unknown'}][browser:"${browserInfo}"][user - ${userId || email}][${messageType}] ${message}`)
    }

    if (ENABLE_EXTERNAL_LOGGER === 'YES') {
        const key = `expense-harbor-log-${new Date().toLocaleString()}`
        let msg;
        try{
            msg = JSON.parse(message);
        }catch(e){
            msg = message;
        }
        vercelKVClient.set(key, {
            application: {
                [messageType]: {
                    message: msg,
                    url,
                    browserInfo,
                    ip: ip || 'unknown',
                    user: userId || email,
                    createdOn: +new Date
                }
            }
        },{ex: LOGGER_EX_DURATION || 60 * 60 * 24 * 5});
    }
}