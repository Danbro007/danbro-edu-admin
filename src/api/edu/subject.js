import request from '@/utils/request'

export function getNestedTreeList() {
    return request({
        url: `edu/subject`,
        method: 'get'
    })
}


