import {FC} from "react";
import {games} from "./gamesData";
import {NavLink} from "react-router-dom";

const GamesPage: FC = () => {
    return (

            <div className="flex align-middle w-full h-full items-center justify-evenly ">
                {Object.entries(games).map(([key, game]) => (
                    <div key={key} className="w-[15%]">
                        <button className="button border p-10 rounded-md w-full hover:border-green-500 hover:text-green-500">
                            <NavLink to={`/games/${key}`}>{game.name}</NavLink>
                        </button>
                    </div>
                ))}
            </div>

    );
};

export default GamesPage;
