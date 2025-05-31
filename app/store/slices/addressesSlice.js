import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAddress, deleteAddress, getAddresses, updateAddress} from "@/app/lib/api/addresses";

export const addressesGetThunk = createAsyncThunk(
    "addresses/getAddresses",
    async function getAddressesFunc(id) {
        const result = await getAddresses(id);
        return result;
    }
);

export const addressesUpdateRadioThunk = createAsyncThunk(
    "addresses/updateAddresses",
    async function updateAddressesFunc({addressId, flag}) {
        const result = await updateAddress({addressId, flag});
        const datas = result.updatedAddressId;
        return datas;
    }
);

export const addressesCreateThunk = createAsyncThunk(
    "addresses/createAddress",
    async function createAddressesFunc(values) {
        const result = await createAddress(values);
        return result;
    }
);
export const addressesDeleteThunk = createAsyncThunk(
    "addresses/deleteAddress",
    async function deleteAddressesFunc(addressId, flag) {
        const result = await deleteAddress(addressId, flag);
        return result;
    }
);

const initialState = {
    addresses: [],
    actualAddressId: null,
}
export const addressesSlice = createSlice({
    name: "addresses",
    initialState: initialState,
    reducers: {},
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
            state.actualAddressId = action.payload;

        });
        builder.addCase(addressesUpdateRadioThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(addressesCreateThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(addressesCreateThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            const payload = action.payload;
            state.addresses = payload.data;

        });
        builder.addCase(addressesCreateThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(addressesDeleteThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isLoaded = false;
        });
        builder.addCase(addressesDeleteThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoaded = true;

            const payload = action.payload;
            state.addresses = payload.data;
        });
        builder.addCase(addressesDeleteThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

export const {} = addressesSlice.actions;
export default addressesSlice.reducer;