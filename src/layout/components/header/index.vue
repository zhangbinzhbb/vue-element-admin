<template>
  <div class="header-contanier">
    <div class="img-left">
      <img v-if="!sidebar.opened" src="@/assets/layout/logo-shrink.png" alt="">
      <img v-else src="@/assets/layout/logo-open.png" alt="">
    </div>
    <div class="user-right">
      <span class="project-name">{{ projectName }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    projectName: {
      get() {
        return this.$store.state.settings.projectName
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-contanier{
  width: 100%;
  height: 49px;
  padding: 0 25px 0 12px;
  display: flex;
  justify-content: space-between;
  .project-name{
    color: #fff;
    font-size: 16px;
    font-weight: bolder;
  }
  .img-left,.user-right{
    display: flex;
    align-items: center;
  }
}
</style>
