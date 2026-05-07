<template>
  <div class="global-background">
    <div class="background-image" :style="{
      backgroundImage: `url(${backgroundUrl})`
    }"></div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const backgroundUrl = ref('https://kaikai-bloga.oss-cn-beijing.aliyuncs.com/background/Moon.jpeg')

onMounted(async () => {
  try {
    console.log(config, '=> config')
    const { data } = await useFetch(`${config.public.baseUrl}/Background`)
    if (data.value?.data?.[0]?.url) {
      backgroundUrl.value = data.value.data[0].url
    }
  } catch (err) {
    console.error('获取背景失败', err)
  }
})
</script>

<style lang="scss" scoped>
.global-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  filter: brightness(0.9);
  z-index: -1;
  > .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
  }
}
</style>
