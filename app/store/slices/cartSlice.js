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
    },
    extraReducers: (builder) => {
        builder.addCase(getCartThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(getCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;
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
        });
        builder.addCase(deleteProductInCartThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

export const getCartQuantity = (cart) => {
    let sum = 0;

    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].product_count;
    }
    return sum;
}

export const {} = cartSlice.actions;
export default cartSlice.reducer;