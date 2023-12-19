import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

interface formData {
	username: string,
	password: string
}

export interface postD{
  nip       :string,
  name      :string,
  email     :string,
  nohp      :number,
  password?  :string,
  repassword?:string,
  role      :string,
  status?:string
}

let authToken = '';
let nip ='';

export const base = '4000'

export async function Login(data: formData) {
  try {
    const response = await axios.post(
      `http://192.168.1.50:${base}/api/v1/auth/login`,
      data
    );

if (response.data.user) {
        authToken = response.data.token;
        nip = response.data.user.nip;

          Cookies.set('authToken', authToken);
          Cookies.set('authNip', nip);
      return response.data; // Return data jika respons memiliki properti 'user'
    } else {
      const errorMessage = response.data.message || "Terjadi kesalahan pada server.";
      return { error: errorMessage };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function getUser() {
  try {
    const authToken = Cookies.get('authToken');
    
    const response = await axios.get(`http://192.168.1.50:${base}/api/v1/auth/user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }});

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function postUser(data:postD){
 try {
    const authToken = Cookies.get('authToken');
    const response = await axios.post(
      `http://192.168.1.50:${base}/api/v1/auth/signup`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.data.statusCode) {
      return response.data;
    } else {
      const errorMessage = response.data.message || "Terjadi kesalahan pada server.";
      return { error: errorMessage };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function putUser(data: postD): Promise<any> {
  try {
    const authToken = Cookies.get('authToken');
    const userId = data.nip;

    const response = await axios.put(
      `http://192.168.1.50:${base}/api/v1/auth/update-user/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (!response.data.statusCode) {
      return response.data;
    } else {
      const errorMessage = response.data.message || "Terjadi kesalahan pada server.";
      return { error: errorMessage };
    }
  } catch (error) {
    console.error('Error Update Data:', error);
    throw error;
  }
}

export async function deleteUser(nip: string): Promise<any> {
  try {
    const authToken = Cookies.get('authToken');

    const response = await axios.delete(`http://192.168.1.50:${base}/api/v1/auth/user/${nip}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function getAvatar() : Promise<any> {
  try {
    const nip = Cookies.get('authNip');
    const response: AxiosResponse<any> = await axios.get(`http://192.168.1.50:${base}/api/v1/auth/avatar/${nip}`);
    const {data} = response.data
    return data;
  }catch (error) {
    console.error('error get avatar', error);
    return "/images/profile/user-1.jpg"; // Mengembalikan placeholder URL jika terjadi kesalahan
  }
}

export async function postAvatar(avatar: File): Promise<any> {
  try {
    const nip = Cookies.get('authNip');
    const formData = new FormData();
    formData.append('data', avatar); // Mengubah properti 'avatar' menjadi 'data'
    const response = await axios.post(`http://192.168.1.50:${base}/api/v1/auth/avatar/${nip}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.data.statusCode) {
      return response.data;
    } else {
      const errorMessage = response.data.message || "Terjadi kesalahan pada server.";
      return { error: errorMessage };
    }
  } catch (error) {
    console.error('error posting avatar', error);
    throw new Error('Failed to post avatar');
  }
}

export async function putAvatar(avatar: File | null): Promise<any> {
  try {
    const nip = Cookies.get('authNip');
    const formData = new FormData();
    if (avatar) {
      formData.append('avatar', avatar);
      const response = await axios.put(`http://192.168.1.50:${base}/api/v1/auth/avatar/${nip}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.data.statusCode) {
        return response.data;
      } else {
        const errorMessage = response.data.message || "Terjadi kesalahan pada server.";
        return { error: errorMessage };
      }
    }
  } catch (error) {
    console.error('error putting avatar', error);
    return "/images/profile/user-1.jpg"; // Mengembalikan placeholder URL jika terjadi kesalahan
  }
}

export async function deleteAvatar(): Promise<any> {
  try {
    const nip = Cookies.get('authNip');
    const response = await axios.delete(`http://192.168.1.50:${base}/api/v1/auth/avatar/${nip}`);
    if (!response.data.statusCode) {
      return response.data;
    } else {
      const errorMessage = response.data.message || "Terjadi kesalahan pada server.";
      return { error: errorMessage };
    }
  } catch (error) {
    console.error('error deleting avatar', error);
    throw new Error('Failed to delete avatar');
  }
}


export async function GetProfil(): Promise<any> {
    try {
    const authToken = Cookies.get('authToken');
    const nip = Cookies.get('authNip');

    const response = await axios.get(
      `http://192.168.1.50:${base}/api/v1/auth/user/by-nip/${nip}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
      return response.data;
  } catch (error) {
    console.error('Error fetching user data by NIP:', error);
    throw error;
  }
}

interface ChangePassword {
    currentPassword: string;
    newPassword: string;
}

export async function changePassword(data: ChangePassword): Promise<any> {
  try {
    const userId = Cookies.get('authNip');

    const authToken = Cookies.get('authToken');
    const response = await axios.put(
      `http://192.168.1.50:${base}/api/v1/auth/update-password/${userId}`,
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  
    if (response.status === 403) {
      return response.data; // return the data upon successful response
    } else {
      const errorMessage = response.data.message || 'Terjadi kesalahan pada server.';
      return { error: errorMessage };
    }
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}




export const hapusToken = () => {
  Cookies.remove('authToken');
  Cookies.remove('authNip')
}
