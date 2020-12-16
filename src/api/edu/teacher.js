import request from '@/utils/request'

export function pagingFindByCondition(current, limit, teacherQuery) {
    return request({
        url: `/eduTeacher/${current}/${limit}`,
        method: 'post',
        data: teacherQuery
    })
}

export function deleteById(id) {
    return request({
        url: `/eduTeacher/${id}`,
        method: 'delete'
    })
}
