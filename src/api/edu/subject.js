import request from '@/utils/request'

//获取所有的分类（树形结构）
export function getNestedTreeList() {
    return request({
        url: `edu/subject`,
        method: 'get'
    })
}


