import request from '@/utils/request'

export function insert(chapter) {
    return request({
        url: `edu/chapter`,
        method: 'post',
        data: chapter
    })
}


export function update(chapter) {
    return request({
        url: `edu/chapter`,
        method: 'put',
        data: chapter
    })
}

export function deleteChapter(chapter) {
    return request({
        url: `edu/chapter`,
        method: 'delete',
        data:chapter
    })
}