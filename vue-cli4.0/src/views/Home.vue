<template>
  <div class="home">
    <h4>父组件</h4>
    <mySlot>
      <!-- <p class="slot">默认插槽</p> -->
      <!--  可简写为#hasName
      <template v-slot:hasName>
        <p style="color:red">具名插槽</p>
      </template> -->

      <!-- 多具名插槽 -->
      <template v-slot:center>
        <p style="color:blue">中间具名插槽</p>
      </template>
      <template #footer>
        <p style="color:red">底部具名插槽</p>
      </template>
      <template #header>
        <p style="color:pink">头部具名插槽</p>
      </template>

      <!-- 作用域插槽传值 -->
      <!-- 匿名的作用域插槽和具名的作用域插槽 区别在v-slot:defult="接受的名称"(defult(匿名的可以不写，具名的相反要写的是对应的name)) 
        v-solt可以解构接收 解构接收的字段要和传的字段一样才可以 例如 :slotUser 对应  v-slot="{slotUser}" -->
      <template v-slot="{slotUser}">
        <p style="background:sandybrown">匿名插槽————{{slotUser.name}}</p>
      </template>
      <template v-slot:sendData="sendData">
        <p style="background:#ccc">匿名插槽————{{sendData.emitUser.name}}</p>
      </template>
    </mySlot>
  </div>
</template>

<script>
  // @ is an alias to /src
  import mySlot from "@/components/SlotTest.vue";

  export default {
    name: "Home",
    components: {
      mySlot
    }
  };
</script>
<style lang="less" scoped>
  .home {
    height: 100%;
    background: #eee;

    .slot {
      background: green;
      color: sandybrown;
    }
  }
</style>