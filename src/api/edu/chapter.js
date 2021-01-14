import request from '@/utils/request'
// 添加章节
export function insert(chapter) {
    return request({
        url: `edu/chapter`,
        method: 'post',
        data: chapter
    })
}

// 更新章节
export function update(chapter) {
    return request({
        url: `edu/chapter`,
        method: 'put',
        data: chapter
    })
}
// 删除章节
export function deleteChapter(chapterId) {
    return request({
        url: `edu/chapter/${chapterId}`,
        method: 'delete',
    })
}