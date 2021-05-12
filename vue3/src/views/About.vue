<template>
  <div class="about">
    <h1>This is an toRaw page</h1>
    <p>{{user.name}}_{{count}}</p>
    <button @click="myFn">btn</button>
    <h3>{{book.name}}-{{book.autor}}</h3>
    <h4>计算属性computed：{{userName}}</h4>
  </div>
</template>
<script>
import { ref, reactive,toRaw,onMounted,computed } from 'vue'
export default {
  setup() {
    const count = ref(1);
    /*
    * ref/reactive数据特点：都是一个Proxy对象，每次修改数据都会被追踪，操作频发比较消耗性能，
    * 如果需要修改不需要更新UI视图的数据，可以使用toRaw，官方不建议这么操作。不建议保留对原始对象的持久引用
    */
    let obj = {name: 'Murphy',age: 20}
    const user = reactive(obj)
    const obj2 = toRaw(user);
    const book = reactive({});

    const myFn = () =>{
      obj2.name ="Jack";
     /*  console.log(user);
      console.log(obj2); */
    }
    
    //计算属性
    const userName = computed(() =>
      book.name + ' + ' + book.autor
    )

    onMounted(()=>{
      book.name = 'Vue'
      book.autor = 'Murphy'
    })

    return {count,user,myFn,book,userName }
  }
}
</script>
