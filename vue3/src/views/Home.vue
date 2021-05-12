<template>
  <div class="home">
    {{count}}
    <br>
    <button @click="myFn">btn</button>
    <hr>
    {{testName}}
    <input type="text" v-model="userInfo.list.id">
    <input type="text" v-model="userInfo.list.name">
    <input type="text" v-model="userInfo.list.age">
    <input type="submit" @click="addUser">
    <ul>
      <li @click="deleteName(index)" v-for="(item,index) in state.list" :key="index">
        {{item.name}} - {{item.age}}
      </li>
    </ul>
    <hr>
    <defaultComponent :book="book" :type="type"></defaultComponent>
  </div>
</template>

<script>
  // @ is an alias to /src
  import defaultComponent from '@/components/defaultComponent.vue'
  import {
    ref,
    toRefs,
    reactive
  } from 'vue'

  export default {
    name: 'Home',
    components:{
      defaultComponent
    },
    data() {
      return {
        type: 'QQ'
      }
    },
    setup() {
      let count = ref(0);
      let book = ref('Java');
      function myFn() {
        console.log(count)
        count.value += 1;
      }

      /*  let state = reactive({
         list:[
           {id: 1,name: 'Jack',age: 20},
           {id: 2,name: 'Murphy',age: 10},
           {id: 3,name: 'Danny',age: 30},
         ]
       })

       function deleteName(index){
         state.list = state.list.filter((item,idx) => idx !== index);
       } */
      let {
        state,
        deleteName,
        ...testData
      } = deleteUserName();

      let {
        userInfo,
        addUser
      } = addUserInfo(state);

      return {
        book,
        count,
        myFn,
        state,
        deleteName,
        userInfo,
        addUser,
        ...testData
      }

    }
  }
  /*可以将操作数据和逻辑从setup中提取出来，左后在引入setup中*/
  //删除用户操作
  function deleteUserName() {
    let state = reactive({
      list: [{
          id: 1,
          name: 'Jack',
          age: 20
        },
        {
          id: 2,
          name: 'Murphy',
          age: 10
        },
        {
          id: 3,
          name: 'Danny',
          age: 30
        },
      ]
    })
    const test = reactive({
      testName: "MMM",
      testAge: 22
    })

    const testData = toRefs(test);
    function deleteName(index) {
      state.list = state.list.filter((item, idx) => idx !== index);
    }

    return {
      state,
      deleteName,
      ...testData
    }
  }

  //增加用户信息
  function addUserInfo(state) {
    let userInfo = reactive({
      list: {
        id: '',
        name: '',
        age: ''
      }
    });

    function addUser(e) {
      e.preventDefault();
      const user = Object.assign({}, userInfo.list)
      state.list.push(user)
      userInfo.list.id = '',
        userInfo.list.name = '',
        userInfo.list.age = ''
    }

    return {
      userInfo,
      addUser
    }
  }
</script>