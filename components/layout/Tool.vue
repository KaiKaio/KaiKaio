<template>
  <div id="tool" :style="{ width: navWidth + 'px', right: marginLeft + 'px'}">
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/archive/Calendar'

export default {
  name: 'Tool',
  props: {
    navWidth: Number,
    marginLeft: Number
  },
  components: {
    Calendar
  }
}
</script>

<style lang="scss">
#tool {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 5.2rem;
  right: 0rem;
}
</style>
