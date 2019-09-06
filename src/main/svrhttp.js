import axios from 'axios'

const svrhttp = {
  get: url => { return axios.get(url) },
  post: (url, data = {}, cfg = {}) => { return axios.post(url, data, cfg) },
  put: (url, data = {}, cfg = {}) => { return axios.put(url, data, cfg) },
  delete: (url, cfg = {}) => { return axios.delete(url, cfg) }
}

export default svrhttp
