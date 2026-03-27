import Mock from 'mockjs'
// 定义标签池
const tags = ['前端', '后端', '职场', 'AI', '副业', '面经', '算法']
// 生成45条模拟文章数据
const posts = Mock.mock({
  'list|45': [
    // 生成45条数据（|45表示数量）
    {
      title: '@ctitle(8,20)', // 随机中文标题（8-20字）
      brief: '@ctitle(20,100)', // 简介
      totalComments: '@integer(1,30)', // 评论数
      totalLikes: '@integer(0,500)', // 点赞数
      publishedAt: 'datetime("yyyy-MM-dd HH:mm")', // 发布时间
      user: {
        // 用户信息
        id: '@integer(1,100)',
        name: '@cname(2,3)',
        avatar: '@image(300*200)',
      },
      tags: () => Mock.Random.pick(tags, 2), // 随机2个标签
      thumbnail: '@image(300*200)', // 缩略图
      pics: ['@image(300*200)', '@image(300*200)', '@image(300*200)'], // 图片组
      id: '@increment(1)', // 自增ID
    },
  ],
}).list

export default [
  {
    url: '/api/posts', // 匹配接口地址
    method: 'get', // 匹配请求方法
    response: ({ query }, res) => {
      // 1. 解析分页参数（默认page=1，limit=10）
      const { page = '1', limit = '10' } = query
      const currentPage = parseInt(page, 10)
      const size = parseInt(limit, 10)
      // 2. 校验参数合法性
      if (isNaN(currentPage) || isNaN(size) || currentPage < 1 || size < 1) {
        return {
          code: 400,
          msg: 'Invalid page or pageSize',
          data: null,
        }
      }
      // 3. 计算分页数据：总条数、起始/结束索引
      const total = posts.length // 数据总条数
      const start = (currentPage - 1) * size // 数据起始位置
      const end = start + size // 数据结束位置
      const pagenatedData = posts.slice(start, end) // 切割分页数据
      // 4. 返回分页结果
      return {
        code: 200,
        msg: 'success',
        items: pagenatedData, // 当前页数据列表
        pagination: {
          // 分页信息
          current: currentPage, // 当前页码
          limit: size, // 每页条数
          total, // 总条数
          totalPage: Math.ceil(total / size), // 总页数
        },
      }
    },
  },
]
