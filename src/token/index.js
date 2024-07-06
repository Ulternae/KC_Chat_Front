import Cookies from "js-cookie"

const saveToken = ({ token }) => {
  Cookies.set('authToken' , token, { expires: 30, secure: true ,  sameSite: 'strict'})
}

const getToken = () => Cookies.get('authToken')

const removeToken = () => {
  Cookies.set('authToken', '', { expires: 30, secure: true, sameSite: 'strict' });
}

const deleteTokenCookie = () => {
  Cookies.remove('authToken')
}

export { saveToken , getToken , removeToken, deleteTokenCookie}