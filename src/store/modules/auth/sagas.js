import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { signInSuccess, signFailure } from "./actions";
import api from "../../../services/api";
import history from "../../../services/history";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, "/sessions", { email, password });

    const { token, user } = response.data;

    if (!user.provider) {
      throw Error("Usuário não é prestador");
    }
    // Set the token in the headers
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push("/dashboard");
  } catch (err) {
    toast.error(err.message);
    toast.error("Erro de autenticação");

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    // Call api
    yield call(api.post, "/users", { name, email, password, provider: true });
    // On success, redirect to "/"
    history.push("/");
  } catch (err) {
    // On failure, call signFailure...
    toast.error(err.message);
    toast.error("Verifique seus dados");
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  const { auth } = payload;
  if (!auth) return;

  const { token } = auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push("/");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/SIGN_OUT", signOut),
]);
