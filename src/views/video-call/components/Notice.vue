<template>
  <Transition name="notice">
    <div class="notice show-box" v-if="isShow">
      <div class="left">
        <SvgIcon icon="video-user" color="#67C23A" size="48px" />
        <span>{{
          username ? `${username}` + $t('msg.videoCall.call') : $t('msg.videoCall.unkonw')
        }}</span>
      </div>
      <div class="right">
        <!-- <SvgIcon
          icon="video-close"
          color="#fe6c6f"
          size="48px"
          class="svg-call svg-close"
          @click="handleClose"
        />
        <SvgIcon
          icon="video-close"
          color="#67C23A"
          size="48px"
          class="svg-call"
          @click="handleCall"
        /> -->
        <el-button type="danger" icon="PhoneFilled" circle @click="handleClose" />
        <el-button type="success" icon="PhoneFilled" circle @click="handleCall" />
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// import SvgIcon from './SvgIcon.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
let username = ref('')
let isShow = ref(false)
function showNotice(toUsername: string) {
  isShow.value = true
  username.value = toUsername
}
defineExpose({ showNotice })

const handleClose = () => {
  this.$emit('call', false)
  this.isShow = false
}
const handleCall = () => {
  this.$emit('call', true)
  this.isShow = false
}
</script>
<style lang="scss" scoped>
.notice {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2001;
  width: 98%;
  height: 89px;
  background-color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 24px;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
      font-size: 18px;
      font-weight: bold;
      color: gray;
    }
  }
  .svg-call {
    cursor: pointer;
    transition: 0.22s;
    &:active {
      transform: scale(0.9);
    }
  }
  .svg-close {
    transform: rotate(180deg);
    margin-right: 32px;
    &:active {
      transform: rotate(180deg) scale(0.9);
    }
  }
}
.notice-enter-active {
  animation: notice-in 0.5s;
}
.notice-leave-active {
  animation: notice-in 0.5s reverse;
}
@keyframes notice-in {
  0% {
    top: -100px;
  }
  100% {
    top: 10px;
  }
}
</style>
