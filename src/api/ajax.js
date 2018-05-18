/*
ajax函数模块
返回的是promise对象，异步返回的数据是: response.data
*/
import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise = ''
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr) {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
      promise.then(function (response) {
        resolve(response.data)
      }).catch(function (err) {
        reject(err)
      })
    } else {
      promise = axios.post(url, data)
      promise.then(function (response) {
        resolve(response.data)
      }).catch(function (err) {
        reject(err)
      })
    }
  })
}
