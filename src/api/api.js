/**
 * Created by shi on 2017/6/26.
 */
import axios from 'axios'
// 肯定需要换成8080以外的端口的，具体来说就是换成可以提供数据的服务器的端口
let base = 'http://localhost:3777'

export const getInterface = params => {
  return axios({
    method: 'post',
    url: `${base}/getInterface`,
    headers: {'Content-Type': 'application/json'},
    data: params
  }).then(res => res.data)
  //  前面方法执行完后才能执行then
  //  => 前面是参数，后面是返回值
}

export const getRoutingTable = params => {
  return axios({
    method: 'post',
    url: `${base}/getRoutingTable`,
    headers: {'Content-Type': 'application/json'},
    data: params
  }).then(res => res.data)
}

export const getDeviceType = params => {
  return axios({
    method: 'post',
    url: `${base}/getDeviceType`,
    headers: {'Content-Type': 'application/json'},
    data: params
  }).then(res => res.data)
}

export const getInfo = params => {
  return axios({
    method: 'post',
    url: `${base}/getInfo`,
    headers: {'Content-Type': 'application/json'},
    data: params
  }).then(res => res.data)
}

export const updateStatus = params => {
  return axios({
    method: 'post',
    url: `${base}/updateStatus`,
    headers: {'Content-Type': 'application/json'},
    data: params
  }).then(res => res.data)
}

export const setAdminStatus = params => {
  return axios({
    method: 'post',
    url: `${base}/setAdminStatus`,
    headers: {'Content-Type': 'application/json'},
    data: params
  }).then(res => res.data)
}

export const getTraps = params => {
  return axios({
    method: 'get',
    url: `${base}/getTraps`
  }).then(res => res.data)
}
