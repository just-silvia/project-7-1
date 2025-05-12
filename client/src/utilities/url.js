import { config } from "../config";

/**
 * Merge url with pathj to get full uri
 * @param {string} path /login
 * @param {string} type AUTH
 */
export const mergeUrl = (path, type = "API") => {
    if (!["AUTH", "API"].includes(type)) throw new Error(`type must be 'AUTH' or 'API', got '${type}'`);

    return `${config[`${type}_HOST`]}${path}` // API_HOST -> AUTH_HOST
}