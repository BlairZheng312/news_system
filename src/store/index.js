import { configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import requestApi from "./requestApi";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        [requestApi.reducerPath]:requestApi.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(requestApi.middleware)
})

setupListeners(store.dispatch)

export default store
