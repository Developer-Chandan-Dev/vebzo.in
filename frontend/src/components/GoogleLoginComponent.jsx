import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const GoogleLoginComponent = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const decoded = jwt_decode(credential);
      console.log("Google Profile:", decoded);

      // Send token to your backend for verification & registration
      const response = await axios.post(`${VITE_API_URL}/api/v1/auth/google`, { token: credential }, { withCredentials: true });

      if (response.data.success) {
        alert("Login Successful!");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_API_GOOGLE_CLIENT_ID}>
      <div className="App">
        <h1 className="my-1">Login with Google</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
