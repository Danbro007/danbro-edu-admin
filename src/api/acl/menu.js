import request from '@/utils/request'

const api_name = '/admin/acl/permission'

export default {
  // 获取所有的权限
  getNestedTreeList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  },
  // 删除某个权限及其子权限
  removeById(permissionId) {
    return request({
      url: `${api_name}/${permissionId}`,
      method: "delete"
    })
  },
  // 添加权限 后端未完成
  saveLevelOne(menu) {
    return request({
      url: `${api_name}`,
      method: "post",
      data: menu
    })
  },
  // 更新菜单 后端未完成
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: menu
    })
  },
  // 查询角色的权限
  toAssign(roleId) {
    return request({
      url: `${api_name}/${roleId}`,
      method: 'get'
    })
  },
  // 给角色分配权限
  doAssign(roleId, permissionId) {
    return request({
      url: `${api_name}`,
      method: "post",
      params: { roleId, permissionId }
    })
  }
}