# OnlineMusic
# 模拟网页云音乐界面
## 使用Vue+Element-plus绘制前端页面,Nodejs+Express实现后端api接口
## 开发工具为VsCode
首先需要进入demo和api_demo下载对应的第三方包<br>
例如：<br>
进入api_demo，执行<br>
#### cnpm i express
查看或安装Vue Cli：

1. 打开终端窗口，进入到你的 Vue CLI 项目的根目录下。

2. 确保你已经全局安装了 Vue CLI，可以使用以下命令来检查：

   ```
   vue --version
   ```

   如果显示 Vue CLI 的版本号，则表示已经安装成功。如果没有安装，请使用以下命令来全局安装 Vue CLI 4 或更高版本：

   ```
   npm install -g @vue/cli
   ```

3. 在项目目录下，使用以下命令安装 "@vue/cli-plugin-babel" 模块：

   ```
   npm install @vue/cli-plugin-babel --save-dev
   ```

   这个命令会下载 "@vue/cli-plugin-babel" 模块并将其添加到项目的 "devDependencies" 中。

4. 如果你使用了 Vue CLI 3，请在项目目录下运行以下命令来重新生成它的配置文件：

   ```
   vue upgrade --next
   ```

5. 如果这个问题仍然存在，请尝试删除 `node_modules` 目录和 `package-lock.json` 文件并重新安装依赖：

   ```
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

通过这些步骤，你应该能够成功解决找不到 "@vue/cli-plugin-babel" 模块的问题，并且能够正常运行你的 Vue CLI 项目。
