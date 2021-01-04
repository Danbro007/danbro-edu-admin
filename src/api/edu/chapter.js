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

export function deleteChapter(chapterId) {
    return request({
        url: `edu/chapter/${chapterId}`,
        method: 'delete',
    })
}