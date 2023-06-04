import axios from 'axios'
import { pa } from 'element-plus/es/locale'

const get = (artistName: string) => {
    return axios.get(`/api/get?artistName=${artistName}`)
}

const findByName = (Name: string) => {
    return axios.get(`/api/findByName?Name=${Name}`)
}

const add = (req: {}) => {
    return axios.post(`/api/add`, req)
}


const edit = (req: {}) => {
    return axios.post(`/api/edit`, req)
}

const del = (id: string) => {
    return axios.get(`/api/del?_id=${id}`)
}

const addfavor = (username:string,fname:string)=>{
    return axios.post(`/api/addfavor?username=${username}&fname=${fname}`)
}

const delfavor = (username:string,fname:string)=>{
    return axios.post(`/api/delfavor?username=${username}&fname=${fname}`)
}


const findByfavor = (username:string)=>{
    return axios.get(`/api/findByfavor?username=${username}`)
}

const checklogin = (username:string,password:string) => {
    return axios.get(`/api/checklogin?username=${username}&password=${password}`)
}

const getmusic_path = (songname:string)=>{
    return axios.get(`/api/getmusic_path?songname=${songname}`)
}

const python = ()=>{
    return axios.get(`/api/python`)
}

const add_recom = (req:{}) => {
    return axios.post(`/api/add_recom`,req)
}

const get_recom = () => {
    return axios.get(`/api/get_recom`)
}

const register = (req:{}) => {
    return axios.post(`/api/register`,req)
}

const csvtojson = () => {
    return axios.get(`/api/csvtojson`)
}

const get_follow = () => {
    return axios.get(`/api/get_follow`)
}

const add_follow = (name1:string,name2:string)=>{
    return axios.post(`/api/add_follow?name1=${name1}&name2=${name2}`)
}

const del_follow = (name1:string,name2:string)=>{
    return axios.post(`/api/del_follow?name1=${name1}&name2=${name2}`)
}

export {
    get, add, edit, del, findByName, 
    checklogin, register,
    addfavor, findByfavor, delfavor, 
    getmusic_path, 
    python, add_recom, get_recom,
    csvtojson, add_follow, del_follow, get_follow
}