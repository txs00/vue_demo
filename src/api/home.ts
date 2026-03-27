import request from '@/utils/request'
export function HomeList(params: string) {
    console.log(params);

    return request({
        url: '/api/posts',
        method: 'get',
        // params: { params }
    })
}