import { FC } from "react";
import { Outlet } from "react-router-dom";


const AdminLayout: FC = () => {
    return (
        <main className="h-screen flex justify-center items-center bg-nice-green">
            <div className="w-2/3 min-h-5/6 bg-white rounded-lg grid grid-cols-3 place-items-center">
                <Outlet />
            </div>
        </main>
    );
}

export default AdminLayout;