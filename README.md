# OnlineMusic
# 模拟网易云音乐界面
## 使用Vue+Element-plus绘制前端页面,Nodejs+Express实现后端api接口
## 开发工具为VsCode

### 搭建 Node.js 环境，需要按照以下步骤进行操作：

1. 下载并安装 Node.js

   在 Node.js 的官方网站上可以下载到适合你操作系统的安装包。选择你所需要的版本，下载后运行安装程序进行安装。

2. 验证 Node.js 安装是否成功

   安装完成后，在终端或命令提示符中输入以下命令：

   ```
   node -v
   ```

   如果输出了类似于 `v14.16.0` 的版本号，则表示安装成功。如果没有，则表示安装可能出现了问题。

3. 安装并使用 Node.js 的包管理器 npm

   npm 是 Node.js 的默认包管理器，可以使用它来下载和安装各种库和模块。在终端或命令提示符中输入以下命令来验证 npm 是否已经安装：

   ```
   npm -v
   ```

   如果输出了类似于 `6.14.11` 的版本号，则表示 npm 已经安装成功。否则，你需要单独安装 npm。

   ```
   npm install npm -g
   ```

4. 验证 Node.js 与 npm 是否正常工作

   创建一个名为 `index.js` 的文件，内容如下：

   ```
   console.log("Hello, Node.js!");
   ```

   在命令提示符或终端中进入该文件所在的目录，然后运行以下命令：

   ```
   node index.js
   ```

   如果输出了 "Hello, Node.js!" 的信息，则表示 Node.js 环境已经搭建成功。

通过这些步骤，你应该已经成功地搭建了 Node.js 环境，并且可以使用它来运行和开发 Node.js 应用程序。


首先需要进入demo和api_demo下载对应的第三方包<br>
例如：<br>
进入api_demo，执行<br>
#### cnpm i express

### 建议先自行创建vue项目，后将代码复制到你的vue项目中<br>
### 创建Vue项目
要创建 Vue 项目，你可以使用 Vue CLI。可以按照以下步骤：

1. 打开终端窗口，进入到你想要创建 Vue 项目的目录中。

2. 确保你已经全局安装了 Vue CLI，可以使用以下命令来检查：

   ```
   vue --version
   ```

   如果显示 Vue CLI 的版本号，则表示已经安装成功。如果没有安装，请使用以下命令来全局安装 Vue CLI 4 或更高版本：

   ```
   npm install -g @vue/cli
   ```

3. 在终端中运行以下命令来创建一个新的 Vue 项目：

   ```
   vue create my-project
   ```

   这个命令会提示你选择一些选项来自定义你的项目，例如选择 Babel 和 TypeScript 支持，并选择你喜欢的 CSS 预处理器等等。你可以根据你的需要进行选择。

4. 当你完成了所有选项后，Vue CLI 将会自动下载并安装所有必要的依赖项，并为你生成一个新的 Vue 项目。

5. 进入到项目目录中，使用以下命令来启动 Vue 开发服务器：

   ```
   npm run serve
   ```

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
