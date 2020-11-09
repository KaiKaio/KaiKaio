<template>
  <div id="tool">
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
  width: 20%;
  min-width: 252px;
}
</style>
