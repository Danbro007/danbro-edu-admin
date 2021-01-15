import request from '@/utils/request'

const api_name = '/admin/acl/user'

export default {
  // 分页查询后端用户
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: searchObj // url查询字符串或表单键值对
    })
  },
  // 查询某个后台用户的基本信息
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  // 添加用户
  save(user) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: user
    })
  },
  // 更新用户信息
  updateById(user) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: user
    })
  },
  // 查找用户的角色
  getAssign(userId) {
    return request({
      url: `${api_name}/role/${userId}`,
      method: 'get'
    })
  },
  // 给用户添加角色
  saveAssign(userId, roleId) {
    return request({
      url: `${api_name}/role`,
      method: 'post',
      params: { userId, roleId }
    })
  },
  // 删除角色 
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  // 批量删除角色
  removeRows(idList) {
    return request({
      url: `${api_name}`,
      method: 'delete',
      data: idList
    })
  }
}
