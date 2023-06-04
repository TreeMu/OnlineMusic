# OnlineMusic
# 模拟网页云音乐界面
## 使用Vue+Element-plus绘制前端页面,Nodejs+Express实现后端api接口
## 开发工具为VsCode
首先需要进入demo和api_demo下载对应的第三方包<br>
例如：<br>
进入api_demo，执行<br>
#### cnpm i express

### 建议先自行创建vue项目，后将代码复制到你的vue项目中<br>
### 创建Vue项目
要创建 Vue 项目，你可以使用 Vue CLI。可以按照以下步骤：

打开终端窗口，进入到你想要创建 Vue 项目的目录中。

确保你已经全局安装了 Vue CLI，可以使用以下命令来检查：

vue --version
如果显示 Vue CLI 的版本号，则表示已经安装成功。如果没有安装，请使用以下命令来全局安装 Vue CLI 4 或更高版本：

npm install -g @vue/cli
在终端中运行以下命令来创建一个新的 Vue 项目：

vue create my-project
这个命令会提示你选择一些选项来自定义你的项目，例如选择 Babel 和 TypeScript 支持，并选择你喜欢的 CSS 预处理器等等。你可以根据你的需要进行选择。

当你完成了所有选项后，Vue CLI 将会自动下载并安装所有必要的依赖项，并为你生成一个新的 Vue 项目。

进入到项目目录中，使用以下命令来启动 Vue 开发服务器：

npm run serve
这将会启动一个开发服务器，并在浏览器中打开你的 Vue 应用程序。

通过这些步骤，你就可以创建一个新的 Vue 项目，并开始编写你的应用程序了。

于缺少 “@vue/cli-plugin-babel” 模块所致。要解决这个问题，可以按照以下步骤：：

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
