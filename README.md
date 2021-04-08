# Vue   
- 本练习项目基于Vue-cli4.0脚手架开发  
- Vue2.0脚手架已被我废弃，如需要请重新创建vue-cli2.0的脚手架，此vue-cli2.0已无法正常运行  

- 目前Vue-cli4.0脚手架写的是Vue2.x的代码，Vue3.0的项目代码后面后继续创建练习编码  
1. 初始化项目
    ```
    npm install 
    ``` 
2. 运行项目  
    ```
    npm run serve 
    ```
3. 打包项目  
    ```
    npm run build
    ```
 ## Git 操作
1. 将代码提交到暂存区
    ```
    git add .  
    ```
2. 将文件提交到本地仓库  
    ```
    git commit -m '记录'
    ```
3. 撤销暂存中的代码
   ```
   git reset
   ```
4. 撤销工作区所以的修改
   ```
   git checkout
   ```
5. 查看本地分支和远程追踪情况
   ```
   git remote show origin
   ```
6. 回退到某一次提交版本
   ```
   git reset --hard "版本号git log"
   ```

## Vue脚手架
1. vue-cli3.0和vue-cli4.0
   ```
   npm install -g @vue/cli
   ```
   ```
   vue create my-project
   ```
2. vue2.0桥接工具
   ```
   npm install -g @vue/cli-init
   ```
   ```
   vue init webpack my-project
   ```




