import axios from 'axios';
import Cookies from 'js-cookie';
import {base} from '@/app/api/user/route'

export async function getMemberByIdTeam(idtim:any) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.get(`http://192.168.1.50:${base}/api/v1/team/members/${idtim}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching member data by ID team:', error);
    throw error;
  }
}

export async function postMemberByIdTeam(idtim:string, nip:string) {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.post(`http://192.168.1.50:${base}/api/v1/team/${idtim}/add-member`, { memberId: nip }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error:any) {
    if (error.response) {
    // Tangkap respon error
    const errorResponseData = error.response.data;
    console.error('Error respon:', errorResponseData);
    // Gunakan data error di sini
  } else {
    console.error('Error tidak terduga:', error);
  }
}
}

export async function deleteMemberbyIdTeam(idtim: string, nip?: string) {
    try {
        const authToken = Cookies.get('authToken');

        const response = await axios.delete(
            `http://192.168.1.50:${base}/api/v1/team/${idtim}/members/${nip}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response.data; // Jika Anda ingin mengembalikan data dari respons
    } catch (error) {
        console.error('Error deleting member:', error);
        throw error;
    }
}
