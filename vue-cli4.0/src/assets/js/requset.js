import axios from 'axios'
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Authorization')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//相应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data && response.data.tokenCode === '01') {

        } else {
            localStorage.removeItem('Authorization')
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

const request = (type, url, param) => {
    const host = '',
        config = {};
    config.method = type.toLowerCase();
    config.url = host + url;
    config.transformRequest = [
        function (data) {
            let ret = '';
            for (const it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret
        }
    ];
    config.headers = {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
    switch (type.toLowerCase()) {
        case "post":
            config.data = param
            break;
        case "get":
            config.param = param
            break
    }
    return new Promise((resolve, reject) => {
        axios(config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject({
                error: err
            })
        })
    })
}
export default request;