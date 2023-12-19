import axios from 'axios';
import Cookies from 'js-cookie';
import {base} from '@/app/api/user/route'

export async function getTeam() {
  try {
    const authToken = Cookies.get('authToken');
    const response = await axios.get(`http://192.168.1.50:${base}/api/v1/team/allTeam`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching team data:', error);
    throw error;
  }
}

export async function getTeamById(idtim:string) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.get(`http://192.168.1.50:${base}/api/v1/team/${idtim}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching team data by ID:', error);
    throw error;
  }
}

export async function postTeam(namaTim:string) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.post(`http://192.168.1.50:${base}/api/v1/team`, { namaTim }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error posting team data:', error);
    throw error;
  }
}

export async function putTeam(idTim:string,namaTim:string) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.put(`http://192.168.1.50:${base}/api/v1/team/${idTim}`, { namaTim }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error posting team data:', error);
    throw error;
  }
}

export async function deleteTeam(idtim:string) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.delete(`http://192.168.1.50:${base}/api/v1/team/${idtim}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting team data:', error);
    throw error;
  }
}

