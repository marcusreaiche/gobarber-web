import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: "gobarber",
      whitelist: ["auth", "user"],
      storage,
    },
    reducers
  );
  return persistedReducer;
};
