export function setUsernameInLocalStorage(username: string) {
    localStorage.setItem('user', username)
}

export function getUsernameFromLocalStorage() {
    localStorage.getItem('user')
}