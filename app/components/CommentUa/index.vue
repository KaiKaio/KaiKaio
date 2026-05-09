<template>
  <span class="agent">
    <span class="os">
      <svg class="icon" aria-hidden="true">
        <title>{{ osIconName }}</title>
        <use :xlink:href="`#icon-${osIconName}`" />
      </svg>
      <span>{{ os.name }}</span>
      <span>{{ os.version }}</span>
    </span>
    <span class="browser">
      <svg class="icon" aria-hidden="true">
        <title>{{ browserIconName }}</title>
        <use :xlink:href="`#icon-${browserIconName}`" />
      </svg>
      <span>{{ browser.name }}</span>
      <span>{{ browser.major }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { uaParser } from '~/composables/ua'

const props = defineProps<{
  ua: string
}>()

const osIconsNameMap: Record<string, string> = {
  'Mac OS': 'mac',
  'Windows': 'windows',
  'Android': 'android',
  'Ubuntu': 'ubuntu',
  'Linux': 'linux',
  'iOS': 'mac',
  'Unix': 'unix'
}

const browersIconsNameMap: Record<string, string> = {
  'Chrome': 'chrome',
  'Chromium': 'chrome',
  'WeChat': 'wechat',
  'Safari': 'safari',
  'Mobile Safari': 'safari',
  'UCBrowser': 'uc',
  'Maxthon': 'maxthon',
  'Firefox': 'firefox',
  'IE': 'ie',
  'Opera': 'opera',
  'Edge': 'edge'
}

const parser = computed(() => uaParser(props.ua))
const os = computed(() => parser.value.getOS())
const browser = computed(() => parser.value.getBrowser())

const osIconName = computed(() => {
  const osName = os.value.name
  return osName && osIconsNameMap[osName]
})

const browserIconName = computed(() => {
  const browserName = browser.value.name
  return browserName && browersIconsNameMap[browserName]
})
</script>
