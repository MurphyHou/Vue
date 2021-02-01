<template>
  <div class="main">
    <slot name="header"></slot>
    <h4>子组件</h4>
    <slot name="center"></slot>
    <slot name="footer"></slot>

    <!-- <slot name="hasName"></slot> -->
    <h4>作用域插槽传值</h4>
    <slot :slotUser="user"></slot>
    <slot name="sendData" :emitUser="userData"></slot>
  </div>
</template>

<script>
export default {
  name: "mySlot",
  props: {
    msg: String
  },
  data() {
    return {
      user:{
        name: "Jack",
        age: 20
      },
      userData:{
        name: "Murphy",
        age: 21
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main{
 border: 1px solid red;
 h4{
   margin-top: 40px;
 }
}
</style>
