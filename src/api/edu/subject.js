// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/subject'

// 假设本地服务器接口还没写完.先使用mock
// const MOCK_URL = 'http://localhost:8888/admin/edu/subject'

// 获取讲师
export function reqGetSubject(page, limit) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET'
  })
}
