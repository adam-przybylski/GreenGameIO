import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { AccountTypeEnum } from "../../types/accountType.ts";

const AdminLayout: FC = () => {
  const { account } = useUserContext();

  return (
    account?.type == AccountTypeEnum.ADMIN ?
      <main className="h-screen flex justify-center items-center bg-nice-green">
        <div className="w-2/3 min-h-5/6 bg-white rounded-lg grid grid-cols-3 place-items-center">
          <Outlet />
        </div>
      </main> : <Navigate to={"/"}></Navigate>
  );
};

export default AdminLayout;
