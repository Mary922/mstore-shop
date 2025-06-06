import {configureStore} from "@reduxjs/toolkit";
import {cartSlice} from "@/app/store/slices/cartSlice";
import {appCommonSlice} from "@/app/store/slices/appCommonSlice";
import {wishlistSlice} from "@/app/store/slices/wishlistSlice";
import {addressesSlice} from "@/app/store/slices/addressesSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartSlice.reducer,
            common: appCommonSlice.reducer,
            wishlist: wishlistSlice.reducer,
            addresses: addressesSlice.reducer,
        }
    })
}
