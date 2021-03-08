<template>
    <div>
        <h1>{{msg || ''}}1 {{getCount}}</h1>
        <h1>{{testMsg}}2</h1>
        <h4>store中的姓名：{{this.$store.state.name}}</h4>
        <button @click="setDefaultName">不带参数设置 {{name}}</button>
        <br>
        <input type="text" v-model="userName" />
        <button @click="setName">带参数设置</button>
        <hr>
        <br>
        <h4>store中的姓名：{{this.$store.state.name}}</h4>
        <button @click="setDefaultNameAsync">异步不带参数设置</button>
        <br>
        <input type="text" v-model="userNameAync" />
        <button @click="setNameAsync">异步带参数设置</button>
    </div>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                name: '铁蛋',
                userName: '',
                userNameAync: ''
            }
        },
        mounted() {
            //console.log(this.$store);
            
        },
        computed:{
            //当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
            /* ...mapState(['testMsg']),
            testMsg() {
                return this.$store.state.testMsg
            } 
            getCount(){
                return this.$store.getters.getCount
            },*/
            ...mapGetters(['getCount']),
            ...mapState({
            // 箭头函数可使代码更简练
            msg: state => state.testMsg,
            // 传字符串参数 'count' 等同于 `state => state.count`
            testMsg: 'testMsg',
            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            /*  countPlusLocalState(state) {
                return state.testMsg + this.msg 
            }  */
            })
        },
        methods: {
            ...mapMutations(['changeName', 'changeNameParam']),
            setDefaultName() {
                //this.$store.commit('changeName');
                this.changeName()
            },
            setName() {
                /* Mutation是同步操作（规则上是不允许异步操作的，虽然异步也可以执行，但是对devtool调试的状态跟踪或多个状态更改操作相互依赖是很不好的）
                1.载荷提交，载荷可以出纳入一个值，但大多数情况下是对象的形式
                this.$store.commit('changeNameParam',{
                    name: this.userName
                }) */
                //2.对象提交
                this.changeNameParam({
                    name: this.userName
                })
                /* mapMutations写法 等同于下代码
                  this.$store.commit({
                     type: 'changeNameParam', //固定的
                     name: this.userName
                 }) */
            },

            /* 
            //异步提交 Mutation
            setDefaultNameAsync() {
                this.$store.dispatch('changeNameAsync');
               // store.dispatch返回相应action的执行结果，而action的处理函数返回的就是Promise，所以store.dispatch仍然返回一个Promise。
                store.dispatch('actionA').then(() => {
                // ...
                })
            },
            setNameAsync() {
                //对象形式
                this.$store.dispatch({
                    type: 'changeNameParamAsync',
                    name: this.userNameAync
                })
            }, 
            mapActions写法如下代码
            */
            ...mapActions([
                'changeNameAsync',
                'changeNameParamAsync'
            ]),
            setDefaultNameAsync() {
                this.changeNameAsync()
            },
            setNameAsync() {
                this.changeNameParamAsync({
                    name: this.userNameAync
                })
            }
        },
    }
</script>