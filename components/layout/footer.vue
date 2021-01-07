<template>
  <footer id="footer">
    <p>Powered by: Kaikaio_System</p>
    <p>Copyright © 2021 Kaikaio.com</p>
    <a href="https://beian.miit.gov.cn" target="_blank">琼ICP备20000436号-1</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  color: #fff;
  text-align: center;
  padding: 6px 0px;
  line-height: 20px;
  font-size: 12px;
  a {
    text-decoration: none;
    color: inherit;
    transition: all .3s;
    &:hover {
      color: burlywood;
    }
  }
}
</style>
