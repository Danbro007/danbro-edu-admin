import request from '@/utils/request'

const api_name = '/admin/acl/role'

export default {
  // 添加以及带分页的查询角色
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/list/${page}/${limit}`,
      method: 'post',
      data: searchObj // url查询字符串或表单键值对
    })
  },
  // 获取角色基本信息
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  // 添加角色
  save(role) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: role
    })
  },
  // 更新角色信息 
  updateById(role) {
    return request({
      url: `${api_name}`,
      method: 'put',
      data: role
    })
  },
  // 获取角色权限
  getAssign(roleId) {
    return request({
      url: `${api_name}/permission/${roleId}`,
      method: 'get'
    })
  },
  // 删除角色
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  // 删除多个角色 
  removeRows(idList) {
    return request({
      url: `${api_name}`,
      method: 'delete',
      data: idList
    })
  }

}
