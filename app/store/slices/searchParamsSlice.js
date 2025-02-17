import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    searchParams: {}
}
export const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState: initialState,
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
            console.log('action pay',action.payload)
        }
    }
})

export const {setSearchParams} = searchParamsSlice.actions;
export default searchParamsSlice.reducer;