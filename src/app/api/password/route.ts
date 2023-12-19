import axios from 'axios';
import Cookies from 'js-cookie';
import {base} from '@/app/api/user/route'

let Token = '';

interface resetpass {
    newPassword: string;
    confPassword: string;
}

function setCookieWithExpiryInMinutes(cookieName: string, cookieValue: string, minutes: number) {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 60000 * minutes;
    now.setTime(expireTime);
    Cookies.set(cookieName, cookieValue, { expires: now });
}

export async function forPass(email: string) {
    try {
        const res = await axios.post(`http://192.168.1.50:${base}/api/v1/auth/forgot-password`, { email });
        Token = res.data.resetPasswordToken;
        Cookies.set('resetToken', Token);
        setCookieWithExpiryInMinutes('resetToken', Token, 6);
        if (!res.data.statusCode) {
        return res.data;
      } else {
        const errorMessage = res.data.message || "Terjadi kesalahan pada server.";
        return { error: errorMessage };
      }
    } catch (error) {
    console.error('error putting avatar', error);
    return "/images/profile/user-1.jpg"; // Mengembalikan placeholder URL jika terjadi kesalahan
  }
}

export async function resPass(data: resetpass) {
    try {
        const Token = Cookies.get('resetToken');
        const res = await axios.post(`http://192.168.1.50:${base}/api/v1/auth/reset-password/${Token}`,data
    );
    if (!res.data.statusCode) {
        return res.data;
      } else {
        const errorMessage = res.data.message || "Terjadi kesalahan pada server.";
        return { error: errorMessage };
      }
    } catch (error) {
    console.error('error putting avatar', error);
    return "/images/profile/user-1.jpg"; // Mengembalikan placeholder URL jika terjadi kesalahan
  }
}
