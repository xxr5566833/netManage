<template lang="html">
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div>
          <ul class="nav nav-tabs">
            <!-- 注意这里this.selected == x 不要加引号 -->
            <li :class = "{active : this.selected == 0}"><router-link to = "/system">系统信息</router-link></li>
            <li :class = "{active : this.selected == 1}"><router-link to="/interface">端口信息</router-link></li>
            <li :class = "{active : this.selected == 2}"><router-link to="/routingTable">路由信息</router-link></li>
            <li :class = "{active : this.selected == 3}"><router-link to="/vlan">vlan信息</router-link></li>
            <li :class = "{active : this.selected == 4}"><router-link to="/disk">磁盘管理</router-link></li>
            <li :class = "{active : this.selected == 5}"><router-link to="/process">进程查看</router-link></li>
            <li :class = "{active : this.selected == 6}"><router-link to="/translationTable">地址转换表信息</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    name : 'navbar',
    props: ['selected'],
}
</script>

