
<template>
  <el-table :data="tableData" stripe height="638" style="    
        width: 100%;
        height: 638px;
        position: absolute;
        left: 173px;" ref="myTable">
    <el-table-column prop="name" label="音乐标题" width="280" />
    <el-table-column prop="artist" label="歌手" width="280" />
    <el-table-column prop="album" label="专辑" width="280" />
    <el-table-column prop="duration" label="时长" width="280" />
    <el-table-column prop="hot" label="热度" width="120" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">+</el-button>
        <el-button size="small" @click="handleload(scope.$index, scope.row)">↓</el-button>
        <el-button size="small" @click="handlePlay(scope.$index, scope.row)">▶</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script lang="ts" setup>

import { ElTable, rowContextKey } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { get, addfavor } from '../../http/index'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter()

const route = useRoute()

const tableData: any = ref([]);

const fetchData = async () => {
  const key: string = route.query.list + ''
  const response = await get(key);
  const data = await response.data;
  for (const item of data) {
    const row = {
      name: item.name,
      artist: item.artist,
      album: item.album,
      duration: item.duration,
      hot: item.hot,
      src: item.src
    }
    tableData.value.push(row);
    console.log(row)
  }
};

fetchData();



console.log(tableData)



interface rowdata {
  name: string,
  artist: string,
  album: string,
  duration: string,
  hot: string
  src: String
}


const handleEdit = (index: number, row: rowdata) => {
  console.log(index, row)
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
  const username = userInfo.username
  console.log(username)
  const res = addfavor(username, row.name + '');
  console.log(res)
}

const handleload = (index: number, row: rowdata) => {
  console.log(index, row)
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
// onMounted(async () => {
//   await handleEdit;

// }

</script>

<style scoped>
/* .example-showcase .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  } */
</style>
