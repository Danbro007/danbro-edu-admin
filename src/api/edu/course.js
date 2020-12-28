import request from '@/utils/request'

export function insert(courseInfo) {
    return request({
        url: `edu/course/info`,
        method: 'post',
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


