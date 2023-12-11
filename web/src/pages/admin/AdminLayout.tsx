import {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useUserContext} from "../../context/userContext";
import {AccountTypeEnum} from "../../types/accountType.ts";

const AdminLayout: FC = () => {
  const { account } = useUserContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(account?.type);
  //   if (account?.type !== AccountTypeEnum.ADMIN) {
  //     navigate("/");
  //   }
  // }, [account, navigate]);
  // console.log("przed if")
  // console.log(account)
  // if (account?.type !== AccountTypeEnum.ADMIN){
  //   console.log("w ifie")
  //   console.log(account)
  //   navigate("/");
  // }
  console.log(account?.type)
  console.log(AccountTypeEnum.ADMIN)
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
