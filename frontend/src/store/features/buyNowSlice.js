import { createSlice } from "@reduxjs/toolkit"

// Initial state
const initialState = {
    buyItem: [],
    status: false,
}

const buyNowSlice = createSlice({
    name: "buyNow",
    initialState,
    reducers: {
        addBuyNow: (state, action) => {
            state.buyItem.push(action.payload)
        },
        clearBuyNow: (state) => {
            state.buyItem = []
        }
    }
})

export const { addBuyNow, clearBuyNow } = buyNowSlice.actions;
export default buyNowSlice.reducer;