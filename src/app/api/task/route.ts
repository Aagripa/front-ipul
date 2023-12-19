import axios from 'axios';
import Cookies from 'js-cookie';
import {base} from '@/app/api/user/route'

interface TaskData{
    name        :string,
    forUser?    :string| null,
    forName?    :string| null,
    startDate?  :string| null,
    endDate?    :string| null,
    taskDesc?   :string| null,
    parentId?   :string| null,
    status?     :string| null,
    comment?    :string| null,
}

export async function getAllTask() {
    try{
        const authToken = Cookies.get('authToken');
        const res = await axios.get(`http://192.168.1.50:${base}/api/v1/tasks`,{    
        headers: {
            Authorization: `Bearer ${authToken}`,
                }})
        return res.data
    }catch(error){
        throw error;
    }
}

export async function getTask(id:string) {
    try{
        const authToken = Cookies.get('authToken');
        const res = await axios.get(`http://192.168.1.50:${base}/api/v1/tasks/${id}`,{    
        headers: {
            Authorization: `Bearer ${authToken}`,
                }})
        return res.data
    }catch(error){
        throw error;
    }
}

export async function getTaskProject(idProject:number) {
    try{
        const authToken = Cookies.get('authToken');
        const res = await axios.get(`http://192.168.1.50:${base}/api/v1/tasks/project/${idProject}`,{
            headers: {
                Authorization: `Bearer ${authToken}`,
            }})
            return res.data
    }catch(error){
        throw error;
    }
}

export async function getTaskUser(nip:string) {
    try{
        const authToken = Cookies.get('authToken');
        const response = await axios.get(`http://192.168.1.50:${base}/api/v1/tasks/byUser/${nip}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
    }catch(error){
        throw error;
    }
}

export async function postTask(teamId:number, projectId:number, taskData:TaskData) {
    try{
        const authToken = Cookies.get('authToken');
        const nip = Cookies.get('authNip');
        const response = await axios.post(`http://192.168.1.50:${base}/api/v1/tasks/${teamId}/${nip}/${projectId}`, taskData, {
            headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
    }catch(error){
        throw error;
    }
}

export async function putTask(id:string,taskData:TaskData) {
    try{
        const authToken = Cookies.get('authToken');
        const response = await axios.put(`http://192.168.1.50:${base}/api/v1/tasks/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
    }catch(error){
        throw error;
    }
}

export async function deleteTask(id:string) {
    try{
        const authToken = Cookies.get('authToken');
        const response = await axios.delete(`http://192.168.1.50:${base}/api/v1/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
    }catch(error){
        throw error;
    }
}