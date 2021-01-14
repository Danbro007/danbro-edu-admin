import request from '@/utils/request'


// 添加小节
export function insert(video) {
    return request({
        url: `edu/video`,
        method: 'post',
        data: video
    })
}
// 删除小节
export function deleteVideo(videoId) {
    return request({
        url: `edu/video/${videoId}`,
        method: 'delete'
    })
}
// 删除阿里云的视频
export function deleteVodVideo(videoId) {
    return request({
        url: `edu/video/aliyun/${videoId}`,
        method: 'delete'
    })
}

// 修改小节
export function update(video) {
    return request({
        url: `edu/video`,
        method: 'put',
        data: video
    })
}

