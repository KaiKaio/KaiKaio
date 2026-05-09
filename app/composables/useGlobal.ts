export const useGlobal = () => {
  const isHideTool = useState<boolean>('isHideTool', () => false)
  
  const setIsHideTool = (value: boolean) => {
    isHideTool.value = value
  }
  
  return {
    isHideTool,
    setIsHideTool
  }
}
