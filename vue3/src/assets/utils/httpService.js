import axios from "axios"
//创建新的axios实例，
const instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000 * 10
})
//可在此设置请求头部
//service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截器
instance.interceptors.request.use(config => {
  //此处可设置请求头部、设置请求loading和数据转化等
  //config.data = JSON.stringify(config.data);
  config.transformRequest = [
    data => {
      var ret = "";
      for (var it in data) {
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
      }
      return ret
    }
  ];
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const token = localStorage.getItem('Authorization');
  //token也可以放在vuex里面
  //const token = store.state.token; 
  if (token) {
    config.headers.Authorization = token
  } else {
    localStorage.removeItem('Authorization')
  }
  return config
}, error => {
  return Promise.error(error);
})

//响应拦截器
instance.interceptors.response.use(response => {
  //如果返回的状态码为200，说明请求成功，否则抛出错误
  if (response.status === 200) {
    return response.data
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        alert('错误请求')
        break;
      case 403:
        alert('登录过期，请重新登录')
        localStorage.removeItem('Authorization')
        //store.commit('loginSuccess', null);
        //跳转到指定页面
        /* setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 3000); */
        break;
      case 404:
        alert('网络请求不存在')
        break;
      default:
        alert(error.response.data.message)
    }
  } else {
    if (JSON.stringify(error).includes('timeout')) {
      alert('服务器响应超时，请刷新当前页')
    }
    error.message('连接服务器失败')
  }
})



//get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}