export function profileUpdateRequest(data) {
  return {
    type: "@user/PROFILE_UPDATE_REQUEST",
    payload: data,
  };
}

export function profileUpdateSuccess(data) {
  return {
    type: "@user/PROFILE_UPDATE_SUCCESS",
    payload: { user: data },
  };
}

export function profileUpdateFailure() {
  return {
    type: "@user/PROFILE_UPDATE_FAILURE",
  };
}
