import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteWishlistProduct, getWishlist, updateWishlist} from "../../lib/api/wishlist";

export const wishlistUpdateThunk = createAsyncThunk(
    "wishlist/updateWishlist",
    async function getWishlist({id}) {
        console.log('ID IS,', id)
        const result = await updateWishlist(id);
        console.log('result update',result)
        const datas = result.data;
        return datas;
    }
);

export const wishlistDeleteThunk = createAsyncThunk(
    "wishlist/deleteWishlist",
    async function getWishlist({id}) {
        const result = await deleteWishlistProduct(id);
        return result.data;
    }
);

export const wishlistGetThunk = createAsyncThunk(
    "wishlist/getWishlist",
    async function getWish() {
            const result = await getWishlist();
            const data = result.data;
            return data;
    }
);




const initialState = {
    wishlist: [],
}
export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {
        restoreWishlist: (state, action) => {

            const payload = action.payload;
            // let ids = [];
            // for (let i = 0; i < payload.length; i++) {
            //     ids.push(payload[i].product_id);
            // }
            // state.wishlist = ids;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(wishlistUpdateThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(wishlistUpdateThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            console.log('pay wishlist update',action.payload);
            state.wishlist = action.payload.map((item) => item.product_id);

        });
        builder.addCase(wishlistUpdateThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(wishlistDeleteThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(wishlistDeleteThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            console.log('pay wishlist delete',action.payload);
            state.wishlist = action.payload.map((item) => item.product_id);

        });
        builder.addCase(wishlistDeleteThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(wishlistGetThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(wishlistGetThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            // console.log('pay get',action.payload);
            const payload = action.payload;

            let ids = [];
            for (let i = 0; i < payload.length; i++) {
                ids.push(payload[i].product_id);
            }
            state.wishlist = ids;
        });
        builder.addCase(wishlistGetThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})


export const {restoreWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;