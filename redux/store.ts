import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slice/user-slice";
import { TypedUseSelectorHook, useSelector,useDispatch } from "react-redux";
import { userApi } from "./api/user-api";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
      
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch:() => AppDispatch = useDispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;