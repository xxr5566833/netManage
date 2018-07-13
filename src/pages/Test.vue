<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="column is-10 is-offset-1 ">
          <a class="button is-info is-focused level-item" @click="startTest">开始考试</a>
          <span v-if="isChat">{{ip1}}与{{ip2}}存在通讯行为</span>
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
          isChat:false,
          ip1:"",
          ip2:"",
          t
        }
      },
        methods:{
          startTest(){
            let vm=this;
            getChat().then((res) => {
              vm.isChat = res.isChat;
              vm.ip1=res.ip1;
              vm.ip2=res.ip2;
              if(!vm.isChat)
                t=setTimeout("startTest",100);
            })
          }
        }
    }
</script>

<style scoped>

</style>
