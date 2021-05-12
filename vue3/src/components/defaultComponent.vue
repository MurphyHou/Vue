<template>
  <div class="hello">
    <h1>{{ book }} {{type}}</h1>
  </div>
</template>

<script>
//import {toRef} from 'vue'
export default {
  name: 'defaultComponent',
  props: ['book','type'],
  setup(props,ctx) {
    // props: 组件传递的参数
		// 需注意：组件传递的参数,不要使用解构赋值,会使得参数失去响应性
   /*  const data = toRef(props,'book')
    console.log('toref',data); */
	console.log(props,ctx); 
		// context上下文对象, 对应2.0(setup没有this)
		// context.parent === this.$parent
		// context.root === this
		// context.emit === this.$emit
		// context.refs === this.$refs
		// context.slots === this.slots
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
