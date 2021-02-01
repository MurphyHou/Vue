import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    name: "Murphy",
    testMsg: '数据管理状态'
  },
  /* *
   * getter可以理解为是对store中state的一些派生状态，也可以理解为一种计算属性，因为它像计算属性一样，返回值会根据它的依赖被缓存起来，
   * 且依赖对象发生改变的时候它才会被重新计算
   *  getter的使用对我来讲就是将对store中某个属性相同的处理操作抽出出来，做了一个公共的处理 
   * 实时监听state值的变化（最新状态）
   */
  getters: {
    getCount(state) {
      return state.count
    }
  },
  //更改store中状态的唯一方法
  mutations: {
    //不带参数
    changeName(state) {
      state.name = "Jack"
      console.log('mutations中姓名更改为Jack了');
    },
    //带参数
    changeNameParam(state, payload) {
      state.name = payload.name
    }
  },
  /* 异步更改状态,mutation中规则上是不允许异步操作的，于是vuex为我们提供了action
  action中不能直接更改状态，它是通过提交mutation来实现操作 */
  actions: {
    //1.无参数提交
    changeNameAsync(context) {
      //在actions中可以通过context.state来获取store中的变量
      let _name = context.state.name
      //异步更改
      setTimeout(() => {
        context.commit('changeName')
      }, 1000);
      console.log('actions异步提交了');
    },
    //2.有参数提交
    changeNameParamAsync(context, payload) {
      setTimeout(() => {
        context.commit('changeNameParam', payload)
      }, 1000);
    },
    actionA({
      commit
    }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    },
    /*  async actionA ({ commit }) {
       commit('gotData', await getData())
     },
     async actionB ({ dispatch, commit }) {
       await dispatch('actionA') // 等待 actionA 完成
       commit('gotOtherData', await getOtherData())
     } */
  },
  modules: {}
});