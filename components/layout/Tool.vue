<template>
  <transition name="fade">
    <div id="tool" v-show="!isHideTool">
      <Calendar />
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import Calendar from '@/components/archive/Calendar'

export default {
  name: 'Tool',
  props: {
    navWidth: Number,
    marginLeft: Number,
  },
  computed: {
    ...mapState({
      isHideTool: state => state.Global.isHideTool,
    }),
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

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-leave-active {
  position: absolute;
  right: 0px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  position: absolute;
  right: 0px;
  transform: translateX(50px);
}
</style>
