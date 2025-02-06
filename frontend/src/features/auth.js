import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
export class AuthService {
  async createAccount(username, email, password) {
    try {
      const res = await axios.post(`${VITE_API_URL}/api/v1/auth/register`, {
        username,
        email,
        password,
      });

      if (res.data.status === true) {
        // call another method
        console.log(res);
        return res;
      } else {
        return res;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  async login(email, password) {
    try {
      const res = await axios.post(
        `${VITE_API_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res) {
        return res;
      }
    } catch (error) {
      return error.response;
    }
  }

  async logout() {
    try {
      const res = await axios.post(`${VITE_API_URL}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      return error.response;
    }
  }
}

const authService = new AuthService();

export default authService;
