import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const AdminLayout: FC = () => {
  const { accountType } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (accountType !== "Admin") {
      navigate("/");
    }
  }, [accountType, navigate]);

  return (
    <main className="h-screen flex justify-center items-center bg-nice-green">
      <div className="w-2/3 min-h-5/6 bg-white rounded-lg grid grid-cols-3 place-items-center">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
