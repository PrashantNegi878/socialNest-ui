function fetchWithToken(user, api) {
  return fetch(api, {
    headers: { Authorization: `Bearer ${user.token}` },
  }).then((response) => response);
}


export default fetchWithToken;