import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  var name = 'token'
  var regUrlToken = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(regUrlToken)
  if (r === null) {
    return ''
  } else {
    return unescape(r[2])
  }
}

export function setToken (token) {
  Cookies.remove(TokenKey)
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getTokenUrl () {
  return Cookies.get(TokenKey)
}

