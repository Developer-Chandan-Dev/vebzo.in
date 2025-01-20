import './style.css'
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="w-full h-screen flex-center ">
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
            <p>Welcome to Apna Organic Store Registration.</p>

            <form className="py-6">
              <div>
                <input
                  type="text"
                  className="inputBox px-3 w-80 py-3 rounded-lg border"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  className="inputBox px-3 w-80 py-3 rounded-lg border mt-4"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  className="inputBox px-3 w-80 py-3 rounded-lg border my-4"
                  placeholder="Your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="inputBox w-80 py-[10px] my-4 border rounded-3xl bg-black text-white font-semibold"
              >
                Register
              </button>

              <p>
                Don&apos;t have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-500 hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 h-full bg-slate-500"></div>
      </div>
    </div>
  );
};

export default SignupPage;
