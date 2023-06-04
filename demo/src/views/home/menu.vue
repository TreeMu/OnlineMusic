<template>
    <el-aside width="200px" class="menu">
        <el-menu
        active-text-color="#ffd04b"
        default-active="2"
        class="el-menu-vertical-demo"
        >
        <router-link to="/findmusic" class="no-underline">
            <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>发现音乐</span>
            </el-menu-item>
        </router-link>
        <router-link to="/interest" class="no-underline">
          <el-menu-item index="2">
            <el-icon><document /></el-icon>
            <span>关注</span>
          </el-menu-item>
        </router-link>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
            <span>我的音乐</span>
          </template>
            <router-link to="/favor" class="no-underline">
                <el-menu-item index="3-1" class="item">&nbsp;&nbsp;我喜欢的音乐</el-menu-item>
            </router-link>
            <router-link to="/localmusic" class="no-underline">
                <el-menu-item index="3-2" class="item">&nbsp;&nbsp;本地音乐管理</el-menu-item>
            </router-link>
            <router-link to="recplay" class="no-underline">
                <el-menu-item index="3-3" class="item">&nbsp;&nbsp;最近播放</el-menu-item>
            </router-link>
            <router-link to="/collect" class="no-underline">
                <el-menu-item index="3-4" class="item">&nbsp;&nbsp;我的收藏</el-menu-item>
            </router-link>
          <!-- <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu> -->
        </el-sub-menu>
      </el-menu>
      <el-divider direction="vertical" />
    </el-aside>
</template>
      
<script lang="ts" setup>

</script>

<style>
    .menu{
        position: absolute;
        left: -40px;
        top: 60px;
        margin: 10px;
        height: 756px;
        border-right: 1px black;
        padding-left: 5px;
        border-right: solid 1px var(--el-menu-border-color);
    }
    .no-underline{
        text-decoration: none;
    }
</style>
      