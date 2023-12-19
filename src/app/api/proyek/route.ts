//https://s4n2k5b2-3000.asse.devtunnels.ms/api/v1/projects

import axios from 'axios'
import Cookies from 'js-cookie'
import {base} from '@/app/api/user/route'

export async function getProject() {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.get(`http://192.168.1.50:${base}/api/v1/projects/AllProject`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function getProjectByIdTeam(idtim:string) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.get(`http://192.168.1.50:${base}/api/v1/projects/by-team/${idtim}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching project data by ID team:', error);
    throw error;
  }
}

interface ProjectData {
  projectName : string;
  startDate  ?: string;
  endDate    ?: string;
  projectDesc?: string;
  status?     : string;
}

export async function postProjectByIdTeam(idtim: string, projectData: ProjectData) {
  try {
    const authToken = Cookies.get('authToken');

    const response = await axios.post(
      `http://192.168.1.50:${base}/api/v1/projects/${idtim}/projects`,
      projectData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error posting project data by ID team:', error);
    throw error;
  }
}

export async function deleteProjectById(id: number) {
    try {
        const authToken = Cookies.get('authToken');

        const response = await axios.delete(`http://192.168.1.50:${base}/api/v1/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data; // Jika Anda ingin mengembalikan data dari respons
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export async function putProjectsById(id:number, projectData: ProjectData){
  try {
    const authToken = Cookies.get('authToken');
    const response = await axios.put(`http://192.168.1.50:${base}/api/v1/projects/${id}`, projectData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update project:', error);
    throw error;
  }
}