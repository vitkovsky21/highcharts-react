import { configureStore } from "@reduxjs/toolkit";
import ChartReducer from "../reducers/chart";
import { chartApi } from "../services/chartApi";

export function createStore() {
  let preloadedState;
  return configureStore({
    reducer: {
      chart: ChartReducer,
      [chartApi.reducerPath]: chartApi.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(chartApi.middleware),
    preloadedState,
  });
}

type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];