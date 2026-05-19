export const useDevice = () => {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)
  const screenWidth = ref(0)

  const breakpoints = {
    mobile: 768,
    tablet: 1024,
  }

  const checkDevice = () => {
    if (typeof window === 'undefined') return
    
    screenWidth.value = window.innerWidth
    isMobile.value = window.innerWidth < breakpoints.mobile
    isTablet.value = window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet
    isDesktop.value = window.innerWidth >= breakpoints.tablet
  }

  onMounted(() => {
    checkDevice()
    window.addEventListener('resize', checkDevice)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkDevice)
    }
  })

  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    screenWidth: readonly(screenWidth),
  }
}
