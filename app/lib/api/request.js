import axios from 'axios';
import {authHeader} from "./auth";

const getHeaders = () => {
    // const token = authHeader();
    // if (!token) {
    //     throw new Error('Access token is missing.');
    // }
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
            // console.log('RESULT GET', result);

            // if (!response) {
            //     throw new  Error('Server error')
            // }
            return result;

        } catch (error) {
            if (error.message.includes('Access token')) {
                console.log('Access token expired');
                // alert('Ваш сеанс истек. Пожалуйста, войдите снова.');
                // window.location.href = '/login';

            } else {
                console.error('Error:', error.message || error.response?.data || error.toString());
            }

            // console.error('error', error)
            // console.error('Error:', error.message || error.response?.data || error.toString());

        }

    }

    static async post(url, body) {
        // console.log('URL','BODY',url,body)
        try {
            const response = await axios.post(url, body, {
                headers: getHeaders()
            });
            const result = response.data;
            // console.log('RESULT', result);

            // if (!response) {
            //     throw new  Error('Server error')
            // }
            return result;

        } catch (error) {
            console.error('Error:', error.message || error.response?.data || error.toString());
        }
    }
}
