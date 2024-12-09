import axios from 'axios';
import {authHeader} from "./auth";
import {sessionHeader} from "./session";

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'x-access-token': `${authHeader()}`,
    }
}

export class Request {

    static async get(url) {
        try {
            const response = await axios.get(url,{
                headers: getHeaders()
            });
            const result = response.data;
            // console.log('RESULT GET', result);

            if (!response) {
                throw new  Error('Server error')
            }
            return result;

        } catch (error) {
            console.error('error', error)
        }

    }

    static async post(url,body) {
        // console.log('URL','BODY',url,body)
        try {
            const response = await axios.post(url,body, {
                headers: getHeaders()
            });
            const result = response.data;
            // console.log('RESULT', result);

            if (!response) {
                throw new  Error('Server error')
            }
            return result;

        } catch (error) {
            console.error('error')
        }

    }
}
