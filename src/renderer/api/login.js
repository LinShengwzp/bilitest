import request from '@/utils/request'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        token: 'ewqqweqewq'
      }
    })
  })
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        roles: [1, 2],
        name: 'dsa',
        avatar: ''
      }
    })
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
