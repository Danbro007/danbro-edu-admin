import request from '@/utils/request'
// 带有条件的分页查询讲师
export function pagingFindByCondition(current, limit, teacherQuery) {
    return request({
        url: `edu/teacher/list/${current}/${limit}`,
        method: 'post',
        data: teacherQuery
    })
}
// 删除讲师
export function deleteById(id) {
    return request({
        url: `edu/teacher/${id}`,
        method: 'delete'
    })
}
// 更新讲师
export function update(teacher) {
    return request({
        url: `edu/teacher`,
        method: 'put',
        data: teacher
    })
}
// 添加讲师
export function save(teacher) {
    return request({
        url: `edu/teacher`,
        method: 'post',
        data: teacher
    })
}
// 获取讲师信息
export function getById(id) {
    return request({
        url: `edu/teacher/${id}`,
        method: 'get',
    })
}

// 获取所有讲师
export function getAllTeacher() {
    return request({
        url: `edu/teacher/list`,
        method: 'get',
    })
}

