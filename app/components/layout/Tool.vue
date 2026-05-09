<template>
  <transition name="fade">
    <div id="tool" v-show="!isHideTool">
      <Calendar />
    </div>
  </transition>
</template>

<script setup lang="ts">
const { isHideTool } = useGlobal()
</script>

<style lang="scss">
#tool {
  display: flex;
  flex-direction: column;
  width: 252px;
  flex-shrink: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-leave-active {
  position: absolute;
  right: 0px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
  right: 0px;
  transform: translateX(50px);
}
</style>
