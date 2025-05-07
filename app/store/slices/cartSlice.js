import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    addProductToCart,
    clearCart,
    decreaseCountInCart,
    getCurrentCart,
    increaseCountInCart,
    deleteProduct
} from "../../lib/api/cart";

export const getCartThunk = createAsyncThunk(
    "Cart/getCart",
    async function getCartAsync(clientId) {
        const result = await getCurrentCart(clientId);
        return result.data.cart;
    }
)

export const createCartThunk = createAsyncThunk(
    "Cart/createCart",
    async function createCartAsync({clientId,productId,productSize,quantity}) {
        const result = await addProductToCart({clientId,productId,productSize,quantity});
        return result.data.cart;
    }
)

export const increaseCartThunk = createAsyncThunk(
    "Cart/increaseCart",
    async function increaseCartAsync({productId:productId, sizeId: sizeId,clientId: clientId}) {
        const result = await increaseCountInCart({productId:productId, sizeId: sizeId, clientId: clientId});
        return result.data.cart;
    }
)

export const decreaseCartThunk = createAsyncThunk(
    "Cart/decreaseCart",
    async function decreaseCartAsync({productId:productId, sizeId: sizeId}) {
        const result = await decreaseCountInCart({productId:productId, sizeId: sizeId});
        return result.data;
    }
)

export const clearCartThunk = createAsyncThunk(
    "Cart/clearCart",
    async function clearCartAsync(clientId) {
        const result = await clearCart(clientId);
        // console.log('clear result thunk',result);
        return result.data.cart;
    }
)

export const deleteProductInCartThunk = createAsyncThunk(
    "Cart/deleteProduct",
    async function deleteProd({productId:productId, sizeId: sizeId}) {
        const result = await deleteProduct(productId, sizeId);
        return result.data;
    }
)

const initialState = {
    cart: [],
    quantityInCart: 0,
    cartSum: 0,
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        // increaseQuantity: (state, action) => {
        //     const payload = action.payload;
        //
        //     const cart = [...state.cart];
        //
        //     const objInCart = {
        //         id: payload.id,
        //         count: 1,
        //         price: payload.price,
        //         size: payload.size,
        //     }
        //
        //     let found = false;
        //     for (let i = 0; i < cart.length; i++) {
        //         console.log('payload SIZE', payload.size);
        //         console.log('payload',payload);
        //         if (cart[i].id === payload.id && cart[i].size === payload.size) {
        //             console.log(cart[i].count);
        //             cart[i].count++;
        //             found = true;
        //             break;
        //         }
        //     }
        //     if (!found) {
        //         cart.push(objInCart);
        //     }
        //
        //     state.cart = cart;
        // },
        // decreaseQuantity: (state, action) => {
        //     const payload = action.payload;
        //     const cart = [...state.cart];
        //
        //     for (let i = 0; i < cart.length; i++) {
        //         if (cart[i].count > 0) {
        //             if (cart[i].id === payload.id && cart[i].size === payload.size) {
        //                 cart[i].count--;
        //             }
        //             if (cart[i].count === 0) {
        //                 cart.splice(i, 1);
        //             }
        //             break;
        //         }
        //     }
        //
        //     state.cart = cart;
        // },
        // clearCart: (state, action) => {
        //     const cart = [];
        //     state.cart = cart;
        //     localStorage.removeItem("cart");
        // },
        // updateCart: (state, action) => {
        //     localStorage.setItem("cart", JSON.stringify(action.payload));
        // },
        // deleteProductFromCart: (state, action) => {
        //     const payload = action.payload;
        //     console.log('payload from deleteing',payload)
        //     const cart = [...state.cart];
        //     for (let i = 0; i < cart.length; i++) {
        //         if (cart[i].id === payload) {
        //             cart.splice(i, 1);
        //         }
        //     }
        //     state.cart = cart;
        //     localStorage.setItem("cart", JSON.stringify(cart));
        // },
        // countCartSum: (state, action) => {
        //     const cart = [...state.cart];
        //     let sum = 0;
        //     for (let i = 0; i < cart.length; i++) {
        //         sum += cart[i].count * cart[i].price;
        //             state.cartSum = sum;
        //     }
        // },
        restoreCart: (state, action) => {
           // let storageCart = localStorage.getItem("cart");
           //  if (storageCart) {
           //      state.cart = JSON.parse(storageCart);
           //  } else {
           //      state.cart = [];
           //  }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(getCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;
            console.log('action payload get cart thunk',action.payload);
            state.cart = action.payload;
        });
        builder.addCase(getCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(increaseCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(increaseCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            console.log('increase cart thunk payload',action.payload);

        });
        builder.addCase(increaseCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(createCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(createCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;
            console.log('create action',action.payload);
            state.cart = action.payload;
        });
        builder.addCase(createCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(decreaseCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(decreaseCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            console.log('decrease cart thunk payload',action.payload);

        });
        builder.addCase(decreaseCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(clearCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(clearCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;
            state.cart = action.payload;
        });
        builder.addCase(clearCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteProductInCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(deleteProductInCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            console.log('clear cart thunk payload',action.payload);

        });
        builder.addCase(deleteProductInCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

//
// const getQuantityInCart = (cart) => {
//     let result = 0;
//     for (let i = 0; i < cart.length; i++) {
//         result += cart[i].count;
//     }
//     return result;
// }

export const getCartQuantity = (cart) => {
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].product_count;
    }
    return sum;
}

export const {increaseQuantity,decreaseQuantity,updateCart, restoreCart} = cartSlice.actions;
export default cartSlice.reducer;