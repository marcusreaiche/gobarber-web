import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import { profileUpdateSuccess, profileUpdateFailure } from "./actions";
import api from "../../../services/api";

function* profileUpdate({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload;
    // We gonna include the password data iff oldPassword is present
    const data = { name, email, avatar_id, ...(rest.oldPassword ? rest : {}) };
    const response = yield call(api.put, "/users", data);
    yield put(profileUpdateSuccess(response.data));
    toast.info("Perfil atualizado");
  } catch (err) {
    toast.error("Não foi possível atualizar o perfil");
    toast.error(err.message);
    yield put(profileUpdateFailure());
  }
}

export default all([takeLatest("@user/PROFILE_UPDATE_REQUEST", profileUpdate)]);
