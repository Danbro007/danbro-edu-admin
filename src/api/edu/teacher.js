import request from '@/utils/request'

export function pagingFindByCondition(current, limit, teacherQuery) {
    return request({
        url: `edu/teacher/${current}/${limit}`,
        method: 'post',
        data: teacherQuery
    })
}

export function deleteById(id) {
    return request({
        url: `edu/teacher/${id}`,
        method: 'delete'
    })
}

export function update(teacher) {
    return request({
        url: `edu/teacher`,
        method: 'put',
        data: teacher
    })
}

export function save(teacher) {
    return request({
        url: `edu/teacher`,
        method: 'post',
        data: teacher
    })
}

export function getById(id) {
    return request({
        url: `edu/teacher/${id}`,
        method: 'get',
    })
}

