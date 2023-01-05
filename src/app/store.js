import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/lib/persistReducer"
import persistStore from "redux-persist/es/persistStore"

import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";

export const store = configureStore({
    reducer: {
        userManagement: persistReducer(
            {
                key: "userManagement",
                storage
            },
            userReducer
        ),
        taskManagement: persistReducer(
            {
                key: "taskManagement",
                storage
            },
            taskReducer
        )
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)