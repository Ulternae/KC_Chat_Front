import Cookies from "js-cookie"

const saveToken = ({ token }) => {
  Cookies.set('authToken' , token, { expires: 1, secure: true ,  sameSite: 'strict'})
}

const getToken = () => Cookies.get('authToken')

const removeToken = () => Cookies.remove('authToken')

export { saveToken , getToken , removeToken}