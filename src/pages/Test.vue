<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="column is-10 is-offset-1 ">
          <a class="button is-info is-focused level-item" @click="startTest">开始考试</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import { getChat } from '../api/api'
    export default {
        name: "Test",
        data () {
        return {
          isChat:'0',
          ip:""
        }
      },
        methods:{
          startTest(){

          }
        }
    }
</script>

<style scoped>

</style>
