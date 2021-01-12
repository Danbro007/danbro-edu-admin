import request from '@/utils/request'
export default {
    //1 生成统计数据
    createStaData(day) {
        return request({
            url: 'statistic/daily/register-count/'+day,
            method: 'get'
          })
    },
    //2 获取统计数据
    getDataSta(searchObj) {
        return request({
            url: `statistic/daily/count/${searchObj.type}?begin=${searchObj.begin}&end=${searchObj.end}`,
            method: 'get',
          })
    }
}