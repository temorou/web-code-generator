import axios from 'axios';
export function get(url, params={}){
    return axios.get(url, {
        params: params
    }).then((response)=>{
        return response.data;
    }).catch((err)=>{
        console.error(err);
    });
}
export function post(url, data={}){
    return axios.post(url, data).then((response)=>{
        return response.data;
    }).catch((err)=>{
        console.error(err);
    });
}
