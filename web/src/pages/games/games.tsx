import { FC } from "react";
import { games } from "./gamesData";
import { NavLink } from "react-router-dom";

const GamesPage: FC = () => {
  return (
    <div>
      {Object.entries(games).map(([key, game]) => (
        <div key={key}>
          <button className="button">
          <NavLink to={`/games/${key}`}>{game.name}</NavLink>
          </button>
        </div>
      ))}
    </div>
  );
};

export default GamesPage;
