export const useArticle = () => {
  const articleList = useState<any[]>('articleList', () => [])
  
  const fetchArticleList = async () => {
    try {
      const data = await $fetch<{
        data: any[]
      }>('/api/Article')
      articleList.value = data?.data || []
      return articleList.value
    } catch (error) {
      console.error('获取文章列表错误:', error)
      return []
    }
  }
  
  return {
    articleList,
    fetchArticleList
  }
}
