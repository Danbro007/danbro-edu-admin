import request from '@/utils/request'

export function getAllSubject() {
    return request({
        url: `edu/subject`,
        method: 'get'
    })
}


