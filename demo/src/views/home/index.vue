<template>
  <div class="common-layout">
    <el-container>

      <el-header>
        <el-row class="header">
          <span style="color: aliceblue;margin-left: 1%;">GC音乐</span>
          <el-col :span="12" class="input">
            <el-input v-model="searchVal" name="query" placeholder="Please input" class="input-with-select"
              @keyup.enter="enterSearch" />
          </el-col>
          <router-link to="./login" class="status" v-if="!userInfo.isLogin">登录状态</router-link>
          <el-row v-else class="login_menu">
            <el-row class="login_name">欢迎：{{ userInfo.username }}</el-row>
            <el-row class="login_center">个人中心</el-row>
            <el-row class="login_exit" @click="exit">退出</el-row>
          </el-row>
        </el-row>
      </el-header>

      <el-container>

        <Navmenu />

        <el-container>
          <el-main class="main">
            <router-view :key="$route.fullPath"/>
          </el-main>
          <el-footer>
            <audio controls ref="audio" class="aud" id="myAudio" @play="onplay" @pause="onpause">
              <source id="musicPath" src=""/>
            </audio>
            <hr class="cross">
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

  
<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from 'vue'
import Navmenu from './menu.vue'
import { useRouter } from 'vue-router';
import { removeGlobalNode } from 'element-plus/es/utils';



const route = useRouter()
const load = async () => {
  await route.push({ path: '/listsong', query: { list: searchVal.value } })
  console.log(searchVal.value)
}

watch(route.currentRoute, () => {
            console.log("路由发生了变化");
        });

let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
console.log(userInfo)
const audio = ref();
audio.value = document.getElementById('myAudio') as HTMLAudioElement;
let musicInfo = JSON.parse(localStorage.getItem('musicInfo') || "{}");
console.log(musicInfo)
setTimeout(() => {
  audio.value.setAttribute("src", musicInfo.src as string)
},10)
const searchVal = ref('');
const enterSearch = async () => {
  await load()
}

const onplay =()=> {
  let musicInfo = JSON.parse(localStorage.getItem('musicInfo') || "{}");
  let music_path = {
      songname : musicInfo.songname, 
      src : musicInfo.src,
      isplay :true
     }

    localStorage.setItem("musicInfo",JSON.stringify(music_path))
  console.log(music_path);
}

const onpause =()=> {
  let musicInfo = JSON.parse(localStorage.getItem('musicInfo') || "{}");
  let music_path = {
      songname : musicInfo.songname, 
      src : musicInfo.src,
      isplay :false
     }
    localStorage.setItem("musicInfo",JSON.stringify(music_path))
  console.log('关闭声音');
}

const exit = () => {
  localStorage.removeItem("userInfo");
  if (window.location.href.indexOf("#reloaded") == -1) {
    window.location.href = window.location.href + "#reloaded";
    window.location.reload();
  }


}
const beforeunloadFn = (e:BeforeUnloadEvent) => {
  let musicInfo = JSON.parse(localStorage.getItem('musicInfo') || "{}");
  let music_path = {
      songname : musicInfo.songname, 
      src : musicInfo.src,
      isplay :false
     }
    localStorage.setItem("musicInfo",JSON.stringify(music_path))
 }
 onMounted(()=>{
  window.addEventListener('beforeunload', e => beforeunloadFn(e))
 })
</script>
  
<style>
.el-header {
  padding: 0%;
}

.header {
  padding-top: 15px;
  height: 60px;
  width: 100%;
  background-color: rgb(0, 0, 0);
}

.input {
  padding-left: 151px;
}

.aud {
  width: 1000px;
  margin-left: 15%;
  margin-top: 1%;
}

.photos {
  top: 10px;
  left: 1000px;
  position: absolute;
}

.login_menu {
  position: absolute;
  left: 950px;
  top: 20px;

}

.login_name {
  font-size: 15px;
  color: #878282;
}

.login_center {
  margin-left: 320px;
  font-size: 15px;
  color: aquamarine;
}

.login_center:hover {
  cursor: pointer;
}

.login_exit {
  margin-left: 20px;
  font-size: 15px;
  color: rgb(240, 1, 1);
}

.login_exit:hover {
  cursor: pointer;
  margin-left: 20px;
  font-size: 15px;
  color: #878282;
}

.status {
  position: absolute;
  left: 1050px;
  top: 20px;
  font-size: 12px;
  color: #878282;
}

.sets {
  position: absolute;
  right: 5%;
}

.main {
  width: 100%;
  height: 650px;
}

/* .cross{
      margin-top: 500px;
    } */
</style>
  