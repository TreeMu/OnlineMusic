<template>
     <div class="adver">
      <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in imgLists" :key="item">
        <img :src="item" class="pic"/>
      </el-carousel-item>
    </el-carousel>
    </div>
    <div class="recom">
      <span>推荐歌单 ></span>
      <div class="demo-image">
      <div v-for="url in urlLists" class="block">
        <router-link to="/recom">
          <img :src="url.img" class="img">
        </router-link>
        <span class="title">{{ url.title }}</span>
      </div>
      </div>
    </div>
</template>
<style>
    
  .adver{
      width: 65%;
      position: absolute;
      left: 20%;
      top: 100px;
    }
  .pic {
    width: 100%;
    margin: 0;
    text-align: center;
    height: 100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  } 
  
  .recom{
    position: absolute;
    width: 68%;
    top: 400px;
    left: 20%;
  }
  .img{
    width: 160px;
    height: 160px;
    margin-bottom: 25px;
  }
  .title{
    padding-left: 0%;
    font-size: 5px;
  }
  .demo-image .block {
    padding: 20px 0px;
    padding-right: 50px;
    text-align: center;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }
  .demo-image .block:last-child {
    border-right: none;
  }
  .demo-image .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    margin-bottom: 20px;
  }
  </style>

<script lang="ts" setup>

    const imgLists = [
      require("@/assets/ad_img/ad1.png"),
      require("@/assets/ad_img/ad2.png"),
      require("@/assets/ad_img/ad3.png"),
    ]
    interface MyObject {
      title: string;
       img: any;
    }
      const urlLists: MyObject[] = [
      {title:"顶级悲伤BGM",img:require("@/assets/rec_img/rec1.jpeg")},
      {title:"哭完了吗 挂了",img:require("@/assets/rec_img/rec2.jpeg")},
      {title:"欧美控精选",img:require("@/assets/rec_img/rec3.jpeg")},
      {title:"2023超好听歌曲",img:require("@/assets/rec_img/rec4.jpeg")},
      {title:"百听不厌的歌",img:require("@/assets/rec_img/rec5.jpeg")},
    ]
</script>