import request from '@/utils/request'

export function insert(video) {
    return request({
        url: `edu/video`,
        method: 'post',
        data: video
    })
}


export function deleteVideo(videoId) {
    return request({
        url: `edu/video/${videoId}`,
        method: 'delete'
    })
}

export function update(video) {
    return request({
        url: `edu/video`,
        method: 'put',
        data: video
    })
}
