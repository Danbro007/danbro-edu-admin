import request from '@/utils/request'

export function insert(courseInfo) {
    return request({
        url: `edu/course/info`,
        method: 'post',
        data: courseInfo
    })
}

export function update(courseInfo) {
    return request({
        url: `edu/course/info`,
        method: 'put',
        data: courseInfo
    })
}


export function getCourseInfo(courseId) {
    return request({
        url: `edu/course/info/${courseId}`,
        method: 'get'
    })
}

export function getChapterInfo(courseId) {
    return request({
        url: `edu/chapter/${courseId}`,
        method: 'get'
    })
}
export function getCoursePublishInfoById(courseId) {
    return request({
        url: `edu/course/publish/${courseId}`,
        method: 'get'
    })
}


export function deleteById(courseId) {
    return request({
        url: `edu/course/${courseId}`,
        method: 'delete'
    })
}

export function updatePublish(publishStatus) {
    return request({
        url: `edu/course/publish/status`,
        method: 'put',
        data: publishStatus
    })
}


export function pagingFindByCondition(current, limit, courseQuery) {
    return request({
        url: `edu/course/list/${current}/${limit}`,
        method: 'post',
        data: courseQuery
    })
}

