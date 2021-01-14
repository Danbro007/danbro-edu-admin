import request from '@/utils/request'
// 添加课程基本信息
export function insert(courseInfo) {
    return request({
        url: `edu/course/info`,
        method: 'post',
        data: courseInfo
    })
}
// 修改课程基本信息
export function update(courseInfo) {
    return request({
        url: `edu/course/info`,
        method: 'put',
        data: courseInfo
    })
}

// 查看课程基本信息
export function getCourseInfo(courseId) {
    return request({
        url: `edu/course/info/${courseId}`,
        method: 'get'
    })
}
// 获取课程下面的所有章节
export function getChapterInfo(courseId) {
    return request({
        url: `edu/chapter/${courseId}`,
        method: 'get'
    })
}
// 获取将要发布的课程信息
export function getCoursePublishInfoById(courseId) {
    return request({
        url: `edu/course/publish/${courseId}`,
        method: 'get'
    })
}

// 删除课程
export function deleteById(courseId) {
    return request({
        url: `edu/course/${courseId}`,
        method: 'delete'
    })
}
// 更新课程的发布状态
export function updatePublish(publishStatus) {
    return request({
        url: `edu/course/publish/status`,
        method: 'put',
        data: publishStatus
    })
}

// 带调价的分页查询
export function pagingFindByCondition(current, limit, courseQuery) {
    return request({
        url: `edu/course/list/${current}/${limit}`,
        method: 'post',
        data: courseQuery
    })
}

