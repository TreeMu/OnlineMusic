 
<template>

    <el-button type="primary" icon="el-icon-plus" 
    style="position: absolute;background-color: white;
    border-color: gainsboro;
    text-align: center;
    color: black;
    width: 80px;
    margin-left: 1600px;
    z-index: 2;">添加音乐</el-button>

    <el-table :data="tableData" stripe height="638" style="width: 100%;
        height: 620px;position: absolute;left: 173px;">
        <el-table-column prop="name" label="音乐标题" width="280" />
        <el-table-column prop="artist" label="歌手" width="280" />
        <el-table-column prop="album" label="专辑" width="280" />
        <el-table-column prop="duration" label="时长" width="280" />
        <el-table-column prop="hot" label="热度" width="120" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">-</el-button>
                <el-button size="small" @click="handleload(scope.$index, scope.row)">🖊</el-button>
                <el-button size="small" @click="handleload(scope.$index, scope.row)">↓</el-button>
                <el-button size="small" @click="handlePlay(scope.$index, scope.row)">▶</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { get, addfavor ,delfavor} from '../../http/index'
import { onMounted, reactive, ref } from 'vue';
const tableData: any = ref([
    {
        name: '七里香',
        artist: '周杰伦',
        album: '七里香',
        duration: '4:59'
    },
    {
        name: '夜曲',
        artist: '周杰伦',
        album: '十一月的肖邦',
        duration: '3:45'
    },
    {
        name: '告白气球',
        artist: '周杰伦',
        album: '周杰伦的床边故事',
        duration: '3:35'
    }
]);

interface rowdata {
    name: string,
    artist: string,
    album: string,
    duration: string,
    hot: string
    src: String
}

let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}"); //传username

const handleEdit = (index: number, row: rowdata) => {
  console.log(index, row)
  const res = delfavor(userInfo.username,row.name+'')
  console.log(res)
  tableData.value.splice(index, 1)
}

const handleload = (index: number, row: rowdata) => {
    console.log(index, row)
}

const handlePlay = async (index: number, row: rowdata) => {

    // console.log(index, row)
    // const path= (await getmusic_path(row.name + '')).data;
    const audio = ref<HTMLAudioElement>();
    audio.value = document.getElementById('myAudio') as HTMLAudioElement;
    const src = ref();
    let musicInfo = JSON.parse(localStorage.getItem('musicInfo') || "{}");

    if (musicInfo.songname != row.name) {
        let music_path = {
            songname: row.name,
            src: row.src,
            isplay: true
        }
        localStorage.setItem("musicInfo", JSON.stringify(music_path))
        audio.value.setAttribute("src", row.src as string)
        audio.value.load()
        audio.value.play()

    } else {
        if (!musicInfo.isplay) {
            let music_path = {
                songname: row.name,
                src: row.src,
                isplay: true
            }
            console.log(music_path)
            localStorage.setItem("musicInfo", JSON.stringify(music_path))
            audio.value.play()
        }
        else {
            let music_path = {
                songname: row.name,
                src: row.src,
                isplay: false
            }
            localStorage.setItem("musicInfo", JSON.stringify(music_path))
            audio.value.pause()
        }
    }
}
</script> 
  
  