import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import spring_logo from "../assets/spring-logo.png"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AuthenticationLayout: FC = () => {

    const token = window.localStorage.getItem("token");
    const navigation = useNavigate();

    useEffect(() => {
        if (token != null && token !== "null") {
            navigation("/");
        }
    }, [token, navigation]);

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <main className="h-screen flex justify-center items-center">
                <div className="flex w-[70vw] h-[80vh] shadow-large-shadow">
                    <div className="bg-nice-green h-[100%] w-[40%]">
                        <img src={spring_logo} alt="GreenGameIO" className="w-[55%] ml-auto mr-auto pt-[15%]"/>
                        <p className="font-sans text-3xl italic font-medium mt-7 text-center">GreenGameIO</p>
                    </div>

                    <div className="bg-white h-[100%] w-[60%]">
                        <Outlet/>
                    </div>
                </div>
            </main>
        </>


)
    ;
}

export default AuthenticationLayout;