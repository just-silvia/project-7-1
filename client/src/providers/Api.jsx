import { createContext } from "react";
import axios from "axios";
import { mergeUrl } from "../utilities/url";
import { useSelector } from "react-redux";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    const headers = {};

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const get = async (path, type = "API") => {
        try {
            const response = await axios({
                url: mergeUrl(path, type),
                method: "GET",
                headers,
            });

            return response.data;
        } catch(err) {
            throw err;
        }
    }

    const post = async (path, payload, type = "API") => {
        try {
            const response = await axios({
                url: mergeUrl(path, type),
                method: "POST",
                headers,
                data: payload,
            });

            return response.data;
        } catch(err) {
            throw err;
        }
    }

    const put = async (path, payload, type = "API") => {
        try {
            const response = await axios({
                url: mergeUrl(path, type),
                method: "PUT",
                headers,
                data: payload,
            });

            return response.data;
        } catch(err) {
            throw err;
        }
    }

    const del = async (path, type = "API") => {
        try {
            const response = await axios({
                url: mergeUrl(path, type),
                method: "DELETE",
                headers,
            });

            return response.data;
        } catch(err) {
            throw err;
        }
    }

    return (
        <ApiContext.Provider value={{ get, post, put, del }}>
            {children}
        </ApiContext.Provider>
    )
}