import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../features/auth";
import { login } from "../../store/features/userSlice";
import SmallSpinner from "../../components/utility/SmallSpinner";
import { fetchCartItems } from "../../store/features/cartSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    if (password.length < 6) {
      setLoading(false);
      return setError("Password must be atleast 6 characters");
    }

    const res = await authService.login(email, password);
    if (res.data.success === true) {
      // Dispatch the login action
      dispatch(login(res.data.user));
      setEmail("");
      setPassword("");
      setLoading(false);
      setError(null);
      navigate("/");
      dispatch(fetchCartItems());
    } else if (res.data.success === false) {
      setError(res.data.error);
      setLoading(false);
    } else {
      console.log(res);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex-center">
      <div
        className="w-11/12 h-[90%] rounded-3xl overflow-hidden flex items-center bg-white"
        style={{ boxShadow: "rgba(0, 0, 0, 0.13) 0px 0px 50px -10px" }}
      >
        <div className="w-full lg:w-1/2 h-full ">
          <div className="signup-mainBox w-80 lg:w-96 h-full flex-center flex-col py-3 mx-auto">
            <div>
              <Link to="/">
                <img
                  src="/public/images/organic-store-logo5.svg"
                  className="h-16 mb-4"
                />
              </Link>
            </div>
            <h1 className="text-6xl py-3 font-semibold ">Hi there!</h1>
            <p>Welcome to Apna Organic Store Login.</p>

            <form className="py-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  className="inputBox px-3 w-80 py-3 rounded-lg border"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="inputBox px-3 w-80 py-3 rounded-lg border my-4"
                  placeholder="Your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                className="inputBox w-80 py-[10px] my-4 border rounded-3xl bg-black text-white font-semibold"
              >
                {loading ? <SmallSpinner /> : "Log In"}
              </button>

              <p>
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 h-full banner-image"></div>
      </div>
    </div>
  );
};

export default LoginPage;
