import { FC } from "react";
import { useParams } from "react-router-dom";
import { games, isGameKey } from "./gamesData";

const GamePage: FC = () => {
  const { name } = useParams();
  if (!name) return;
  if (!isGameKey(name)) return;
  const game = games[name];

  let localStorageAccount = localStorage.getItem("account") || "null";
  let userID = localStorageAccount !== "null" ? JSON.parse(localStorageAccount).id : null;

  return (
    <iframe
      src={`http://localhost:8081/${game.url}?id=${userID}`}
      className="w-full h-full"
    />
  );
};

export default GamePage;
