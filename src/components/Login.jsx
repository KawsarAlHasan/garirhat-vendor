import { FaFacebook } from "react-icons/fa";
import Logo from "../assets/gariir.png";
import { Divider } from "antd";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../authprovider/AuthProvider";


const Login = () => {
  const {handleGoogle} = useContext(AuthContext);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="flex w-9/12 mx-auto rounded-lg bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 p-8 text-white rounded-l-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <img src={Logo} alt="" width={230} />
            <h2 className="text-2xl font-bold">
              Welcome to Vendor Dashboard by
            </h2>
            <h1 className="text-3xl font-extrabold">Garir Hat</h1>
            <p className="text-sm text-center mt-4"></p>
            <div className="mt-6 text-xs flex gap-4">
              <a href="#" className="underline">
                Terms & Conditions
              </a>
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create your account
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">E-mail Address</label>
              <input
                type="email"
                placeholder="Enter your mail"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-TextColor"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-TextColor"
              />
            </div>
            <div className="flex gap-4">
              <button className="w-full bg-ButtonColor text-white py-2 rounded hover:bg-ButtonHover">
                Sign Up
              </button>
            </div>
          </form>
          <Divider
            variant="dotted"
            style={{
              borderColor: "#3eb4e7",
            }}
          >
            Or
          </Divider>
          <div className="flex gap-4">
            <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
              <FcGoogle /> Continus With Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
              <FaFacebook className="text-blue-700" /> Continus With Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
