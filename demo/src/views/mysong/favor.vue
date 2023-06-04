
<template>
  <el-table :data="tableData" stripe height="638" style="    
        width: 100%;
        height: 638px;
        position: absolute;
        left: 173px;" ref="myTable">
    <el-table-column prop="id" label="" width="50" />
    <el-table-column prop="name" label="音乐标题" width="280" />
    <el-table-column prop="artist" label="歌手" width="280" />
    <el-table-column prop="album" label="专辑" width="280" />
    <el-table-column prop="duration" label="时长" width="280" />
    <el-table-column prop="hot" label="热度" width="120" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleDelete(scope.$index, scope.row)">-</el-button>
        <el-button size="small" @click="handleload(scope.$index, scope.row)">↓</el-button>
        <el-button size="small" @click="handlePlay(scope.$index, scope.row)">▶</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script lang="ts" setup>

import { onMounted, reactive, ref } from 'vue';

import { findByName,findByfavor,delfavor} from  '../../http/index'

const tableData: any = ref([])



import { useRoute } from 'vue-router';
import { de } from 'element-plus/es/locale';
const route = useRoute()

interface rowdata {
  name: string,
  artist: string,
  album: string,
  duration: string,
  hot: string,
  src: string
}
var count = 0
let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}"); //传username
const fetchData = async () => {
  // const key: string = route.query.list + ''
  const response = await findByfavor(userInfo.username);
  const data = await response.data;
  for (const item of data) {
    for (const music of item.songList)
    {
      console.log(music)
      count = count+1;
      const row = {
      id:count.toString().padStart(2, '0'),
      name: music.name,
      artist: music.artist,
      album: music.album,
      duration: music.duration,
      hot: music.hot,
      src: music.src
    }
    console.log(row)
    tableData.value.push(row)
    }
  }
};





const handleload = (index: number, row: rowdata) => {
  console.log(index, row)
}

const handleDelete = (index: number, row: rowdata) => {
  console.log(index, row)
  const res = delfavor(userInfo.username,row.name+'')
  console.log(res)
  tableData.value.splice(index, 1)
}

const handlePlay = async(index: number, row: rowdata) => {
  
  // console.log(index, row)
  // const path= (await getmusic_path(row.name + '')).data;
  const audio = ref<HTMLAudioElement>();
  audio.value = document.getElementById('myAudio') as HTMLAudioElement;
  const src=ref();
  let musicInfo = JSON.parse(localStorage.getItem('musicInfo') || "{}");
  
  if (musicInfo.songname!=row.name ){
    let music_path = {
      songname : row.name, 
      src : row.src,
      isplay :true
     }
    localStorage.setItem("musicInfo",JSON.stringify(music_path))
    audio.value.setAttribute("src", row.src as string)
    audio.value.load()
    audio.value.play()  
    
  }else{
    if(!musicInfo.isplay)
  {
    let music_path = {
      songname : row.name, 
      src : row.src,
      isplay :true
     }
     console.log(music_path)
    localStorage.setItem("musicInfo",JSON.stringify(music_path))
    audio.value.play() 
  }
  else{
    let music_path = {
      songname : row.name, 
      src : row.src,
      isplay : false
     }
    localStorage.setItem("musicInfo",JSON.stringify(music_path))
    audio.value.pause() 
  }
  }
  
}



onMounted(async () => {
  await fetchData();
  // if (window.location.href.indexOf("#reloaded") == -1) {
  //   window.location.href = window.location.href + "#reloaded";
  //   window.location.reload();
  // }
}
)
</script>