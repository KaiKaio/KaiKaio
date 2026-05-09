export const useMusic = () => {
  const musicList = useState<any[]>('musicList', () => [])
  const playIndex = useState<number>('playIndex', () => 0)
  const playStatus = useState<boolean>('playStatus', () => false)
  const currentTime = useState<number>('currentTime', () => 0)
  
  const fetchMusicList = async () => {
    try {
      const data = await $fetch<{
        data: any[]
      }>('/api/Music')
      musicList.value = data?.data || []
      return musicList.value
    } catch (error) {
      console.error('获取音乐列表错误:', error)
      return []
    }
  }
  
  const changeIndex = (mark: 'prev' | 'next' | number) => {
    if (mark === 'prev') {
      playIndex.value = playIndex.value === 0 ? musicList.value.length - 1 : playIndex.value - 1
    } else if (mark === 'next') {
      playIndex.value = playIndex.value === musicList.value.length - 1 ? 0 : playIndex.value + 1
    } else {
      playIndex.value = mark
    }
  }
  
  const togglePlayStatus = () => {
    playStatus.value = !playStatus.value
  }
  
  const updateCurrentTime = (time: number) => {
    currentTime.value = time
  }
  
  return {
    musicList,
    playIndex,
    playStatus,
    currentTime,
    fetchMusicList,
    changeIndex,
    togglePlayStatus,
    updateCurrentTime
  }
}
