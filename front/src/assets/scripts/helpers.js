export function isAuth() {
  if(localStorage.authorization) {
    return JSON.parse(localStorage.getItem('authorization'));
  } else return false;
}

export function resetAuth() {
  localStorage.setItem('authorization', false)
}