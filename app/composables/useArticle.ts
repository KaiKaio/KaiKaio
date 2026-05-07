export const useArticle = () => {
  const articleList = useState<any[]>('articleList', () => [])
  
  const fetchArticleList = async () => {
    const config = useRuntimeConfig()
    try {
      const { data } = await useFetch(`${config.public.baseUrl}/Article`)
      articleList.value = data.value?.data || []
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
