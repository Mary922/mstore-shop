'use client';
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {getCartThunk} from "@/app/store/slices/cartSlice";
import {wishlistGetThunk} from "@/app/store/slices/wishlistSlice";
import {jwtDecode} from "jwt-decode";
import {authTemp} from "@/app/lib/api/auth";

const ReduxLoader = () => {
    const dispatch = useAppDispatch();
    const cartList = useAppSelector((state) => state.cart.cart);

    let tempClient;
    let client;
    let clientId;
    let token;

    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now();
        }   catch(err) {
            return false;
        }
    }


    useEffect(()=> {
        (async () => {
            if (typeof window !== "undefined") {
                tempClient = localStorage.getItem("temp-client");
                client = localStorage.getItem("client");
                token = localStorage.getItem("temp-client");
            }
            if (!client && !tempClient) {
                    const result = await authTemp();
                    console.log('result AUTH TEMP', result);
                    localStorage.setItem('temp-client', result?.data?.accessToken);
                }
            if (client) {
                localStorage.removeItem('temp-client');
            }



            if (typeof window !== "undefined" && client) {
                clientId = JSON.parse(localStorage.getItem("client")).id;
                token = JSON.parse(localStorage.getItem("client")).accessToken;
            }


            if (tempClient && isTokenValid(tempClient)) {
                console.log('im temp hah');
                localStorage.removeItem("temp-client");
            }

            if (client && isTokenValid(client)) {
                console.log('im client constant');
                localStorage.removeItem("client");
                // console.log("Токен клиента истек");
            } else {
                await dispatch(getCartThunk(clientId));
                await dispatch(wishlistGetThunk());
            }

        })()
    },[]);



    // useEffect(() => {
    //     // dispatch(restoreCart());
    //     if (client) {
    //         dispatch(wishlistGetThunk());
    //     }
    // }, []);

    return (
        <>

        </>
    )
}
export default ReduxLoader;