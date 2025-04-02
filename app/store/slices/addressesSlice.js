import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAddresses, updateAddress} from "@/app/lib/api/addresses";

export const addressesGetThunk = createAsyncThunk(
    "addresses/getAddresses",
    async function getAddressesFunc(id) {
        // console.log('ID IS,', id)
        const result = await getAddresses(id);
        console.log('result get',result)
        const datas = result;
        return datas;
    }
);

export const addressesUpdateRadioThunk = createAsyncThunk(
    "addresses/updateAddresses",
    async function updateAddressesFunc({addressId,flag}) {
        const result = await updateAddress({addressId,flag});
        console.log('result update',result)
        const datas = result.updatedAddressId;
        return datas;
    }
);



const initialState = {
    addresses: [],
    actualAddressId: null,
    // actualAddress: null,
}
export const addressesSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addressesGetThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(addressesGetThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            const payload = action.payload;
            state.addresses = payload.data;

            if (payload?.actualAddress?.address_id) {
                state.actualAddressId = payload.actualAddress.address_id;
            }

            console.log('pay get',payload.actualAddress.address_id);

            // let ids = [];
            // for (let i = 0; i < payload.length; i++) {
            //     ids.push(payload[i].product_id);
            // }
            // state.addresses = ids;
        });
        builder.addCase(addressesGetThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(addressesUpdateRadioThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(addressesUpdateRadioThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            console.log('radio update',action.payload);
            state.actualAddressId = action.payload;

        });
        builder.addCase(addressesUpdateRadioThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})


export const {} = addressesSlice.actions;
export default addressesSlice.reducer;