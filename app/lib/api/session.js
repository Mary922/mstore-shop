// import {Request} from "./request";
//
//
// let baseURL = 'http://127.0.0.1:3001';
//
// export const getSessionId = () => {
//     let result = Request.get(`${baseURL}/generate-session-id`);
//     return result;
// }
//
// export const sessionHeader = () => {
//     const session = localStorage.getItem('sessionId');
//     // console.log('session',session);
//
//     if (session) {
//         // console.log('its session',session);
//         return session;
//     } else {
//         console.log('No session ID');
//         return '';
//     }
// }
//
