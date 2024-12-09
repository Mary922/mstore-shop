import {createSlice} from "@reduxjs/toolkit";

export const appCommonSlice = createSlice({
    name: "appCommon",
    initialState: {
        canvasOnShow: false,
        canvasLeftOnShow: false,
        filteredProductIds: [],
    },
    reducers: {
        changeCanvas: (state, action) => {
            state.canvasOnShow = action.payload;
        },
        changeFilterCanvas: (state, action) => {
            state.canvasLeftOnShow = action.payload;
        },
        getFilteredProducts: (state, action) => {
            state.filteredProductIds = action.payload;
        }

    }
})
export const {changeCanvas,changeFilterCanvas,getFilteredProducts} = appCommonSlice.actions;
export default appCommonSlice.reducer;