<template>
  <!-- 全局提示框 -->
  <div v-show="visible">
    <article class="message is-link  my-blue my-trans my-border-blue" >
      <div class="message-body my-blue">
        {{message}}
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        message: ' '
      }
    },
    methods: {
      close: function () {
        this.visible = false
      }
    }
  }
</script>
