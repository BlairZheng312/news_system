import { configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import requestApi from "./requestApi";
import authSlice from "./authSlice";
import collapseSlice from "./collapseSlice";
import permissionSlice from "./permissionSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
    reducer: {
        [requestApi.reducerPath]:requestApi.reducer,
        auth: authSlice.reducer,
        collapse: collapseSlice.reducer,
        permission:permissionSlice.reducer,
        loading: loadingSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(requestApi.middleware)
})

setupListeners(store.dispatch)

export default store

