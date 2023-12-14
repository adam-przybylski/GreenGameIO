import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { AccountTypeEnum } from "../../types/accountType";
import AdministrationNav from "../../components/AdministrationNav";
import SubPanel from "../../components/SubPanel";
import AdminUsers from "./usersAdmin";
import AdminTasks from "./tasksAdmin";
import LogoutButton from "../../components/LogoutButton";
import { logoutUser } from "../../api/logout";
import AdminQuizzes from "./quizzesAdmin";

const panels = {
  users: <AdminUsers />,
  tasks: <AdminTasks />,
  quizzes: <AdminQuizzes />,
} as const;

export type Panel = keyof typeof panels;

const AdminLayout: FC = () => {
  const { account } = useUserContext();
  const navigation = useNavigate();
  const [panel, setPanel] = useState<Panel>("users");

  useEffect(() => {
    if (account?.type !== AccountTypeEnum.ADMIN) {
      navigation("/");
    }
  }, [account, navigation]);

  const handleSubPanelClick = (
    _event: React.MouseEvent<HTMLDivElement>,
    message: Panel
  ) => {
    setPanel(message);
  };

  return (
    <>
      <AdministrationNav>
        <SubPanel onClick={handleSubPanelClick} message="users">
          <p>Użytkownicy</p>
        </SubPanel>
        <SubPanel onClick={handleSubPanelClick} message="quizzes">
          <p>Quizy</p>
        </SubPanel>
        <SubPanel onClick={handleSubPanelClick} message="tasks">
          <p>Zadania codzienne</p>
        </SubPanel>
        <LogoutButton logoutUser={logoutUser}></LogoutButton>
      </AdministrationNav>
      <main>{panels[panel]}</main>
    </>
  );
};

export default AdminLayout;
