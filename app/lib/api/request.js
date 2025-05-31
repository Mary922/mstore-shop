import axios from 'axios';
import {authHeader} from "./auth";

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'x-access-token': `${authHeader()}`,
    }
}

export class Request {

    static async get(url) {
        try {
            const response = await axios.get(url, {
                headers: getHeaders()
            });
            const result = response.data;
            return result;

        } catch (error) {
            if (error.message.includes('Access token')) {
                console.log('Access token expired');
            } else {
                console.error('Error:', error.message || error.response?.data || error.toString());
            }
        }
    }

    static async post(url, body) {
        try {
            const response = await axios.post(url, body, {
                headers: getHeaders()
            });
            const result = response.data;
            return result;

        } catch (error) {
            console.error('Error:', error.message || error.response?.data || error.toString());
        }
    }
}
