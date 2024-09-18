import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import GeneralReducer from "./slices/general.slice";
import TicketReducer from "./slices/ticket.slice";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./slices/auth.slice";

const persistConfig = {
  key: "ridesmart",
  storage,
  blacklist: ['general']
};

export const rootReducer = combineReducers({
  general: GeneralReducer,
  auth: AuthReducer,
  ticket: TicketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;