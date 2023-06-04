<template>
  <div class="interest">
    <el-card>
      <div slot="header">
        <el-row :gutter="20">
          <el-col :span="12">
            <h3>Follows</h3>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-input v-model="searchval" placeholder="Search" suffix-icon="el-icon-search" @keyup.enter="enterSearch" ></el-input>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" class="mt-20">
        <el-col :span="6" v-for="item in userLists" :key="item">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="user-card">
              <img src="https://via.placeholder.com/150" />
              <div class="user-info">
                <p class="user-name">{{ item.name}}</p>
                <p class="user-sex">{{ item.sex }}&nbsp; {{item.age }}岁</p>
                <p class="user-desc">
                    {{ item.describe }}
                </p>
              </div>
              <div class="user-action">
                <el-button size="small" type="primary"  :class="{ followed: item.followed }"  round @click="handleClick(item)">  {{ item.followed ? 'Followed' : 'Follow' }}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { python,csvtojson ,add_follow, del_follow,get_follow} from '@/http';

import { ref, onMounted, reactive, watch } from 'vue'

const searchval = ref('');


const userLists:any = ref([])

const fetchData = async () => {
//   python('../api_demo/interest.py')
  const response = await get_follow();
  const data = await response.data;
  for (const item of data) {
    console.log(item)
    var sex = ''
    if(item.person.sex.low==1){sex='男'}
    else if(item.person.sex.low==0){sex='女'}
    else{sex='保密'}
    var isfollow = false
    if(item.rel == 'FOLLOWS'){
      isfollow = true
    }
    const row = {
      name: item.person.name,
      sex:  sex,
      age: item.person.age.low,
      describe: item.person.describe,
      followed: isfollow
    }
    userLists.value.push(row)
  }
};
fetchData()


const enterSearch = () =>{
    
}

const handleClick = (item:any)=>{
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || "{}");
    const username = userInfo.username
    console.log(item)
    item.followed = !item.followed;
    if(item.followed ){
        add_follow(username,item.name)
    }else{
        del_follow(username,item.name)
    }
}

</script>

<style scoped>
.followed {
  background-color: green !important;
}
.interest{
    margin-left: 8.5%;
    margin-top: -1.3%;
}
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 240px;
  border: 1px solid #e0e6ed; 
  padding: 20px;
}
.user-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
}
.user-info {
  text-align: center;
}
.user-info .user-name {
  font-weight: bold;
}
.user-desc {
  font-size: 14px;
  line-height: 20px;
  color: #9c9da2;
  margin-bottom: 20px;
}
.user-action {
  width: 100%;
}
</style>
*/
// This code will create a Card UI element that contains multiple Card UI elements for representing each user. 
// These user cards have an image, a name, a description, and a Follow button. 
// You can replace the placeholder data (such as user name, description, and image URL) with real data from your application 
// or API response to implement the actual Netease Cloud Music user follow page using Vue and Element Plus.