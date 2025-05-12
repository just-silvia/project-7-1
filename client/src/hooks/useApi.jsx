import { useContext } from "react"
import { ApiContext } from "../providers/api"

/**
 * Use api context with shared functions
 * @returns {{
 *  get: (path: string, type: "API"|"AUTH") => Promise<any>,
 *  post: (path: string, payload: Record<string, any>, type: "API"|"AUTH") => Promise<any>,
 *  put: (path: string, payload: Record<string, any>, type: "API"|"AUTH") => Promise<any>,
 *  del: (path: string, type: "API"|"AUTH") => Promise<any>,
 * }}
 */
export const useApi = () => {
    return useContext(ApiContext);
}