interface Response<T> {
  data: T
  msg: string
  code: number
}

interface IArticle {
  _id: string
  title: string
  description: string
  content: string
  createtime: string
  cover: string
  __v: number
}

export const useArticle = () => {
  const articleList = useState<Omit<IArticle, 'content'>[]>('articleList', () => [])
  
  const fetchArticleList = async () => {
    try {
      const res = await $fetch<Response<Omit<IArticle, 'content'>[]>>('/api/Article')
      articleList.value = res?.data || []
      return articleList.value
    } catch (error) {
      console.error('获取文章列表错误:', error)
      return []
    }
  }

  const fetchArticleDetailById = async (id: string) => {
    try {
      const res = await $fetch<Response<IArticle[]>>(`/api/Article/?id=${id}`)
      return res?.data
    } catch (error) {
      console.error('获取文章列表错误:', error)
      return []
    }
  }
  
  return {
    articleList,
    fetchArticleDetailById,
    fetchArticleList
  }
}
