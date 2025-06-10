'use client';
import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {getCartThunk} from "@/app/store/slices/cartSlice";
import {wishlistGetThunk} from "@/app/store/slices/wishlistSlice";
import {jwtDecode} from "jwt-decode";
import {authTemp} from "@/app/lib/api/auth";

const ReduxLoader = () => {
    const dispatch = useAppDispatch();
    // const cartList = useAppSelector((state) => state.cart.cart);

    let tempClient;
    let client;
    let token;

    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp > Math.floor(Date.now() / 1000);
        } catch (err) {
            return false;
        }
    }

    const logOut = () => {
        localStorage.removeItem("client");
        localStorage.removeItem("cart");
        localStorage.removeItem("filter-list");
        localStorage.removeItem("filterData");
        localStorage.removeItem('temp-client');
        window.location.reload();
    }


    useEffect(() => {
        (async () => {
            try {
                if (typeof window !== "undefined") {
                    tempClient = localStorage.getItem("temp-client");
                    client = localStorage.getItem("client");
                    token = localStorage.getItem("temp-client");
                }
                if (!client && !tempClient) {
                    const result = await authTemp();
                    localStorage.setItem('temp-client', result?.data?.accessToken);
                }
                if (client) {
                    const parsedClient = JSON.parse(client);
                    const token = parsedClient.accessToken;

                    if (!isTokenValid(token)) {
                        await logOut();
                    } else {
                        const clientId = parsedClient.id;
                        await dispatch(getCartThunk(clientId));
                        await dispatch(wishlistGetThunk());
                    }
                } else if (tempClient) {
                    dispatch(getCartThunk(tempClient));
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    console.log('its error here')
                }
            }
        })()
    }, []);
    return (
        <>

        </>
    )
}
export default ReduxLoader;