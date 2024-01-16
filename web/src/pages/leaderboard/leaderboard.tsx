import { FC, useEffect, useState } from "react";
import { LeaderboardType } from "../../types/LeaderboardType.ts";
import { api } from "../../api/api.config.ts";
import LeaderboardTable from "../../components/LeaderboardTable.tsx";

export const Leaderboard: FC = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardType[]>([]);

    const handleGet = (game: string) => {
        api.get("/leaderboard/" + game).then((res) => {
            setLeaderboardData(res.data);
        });
    };

    useEffect(() => {
        console.log(leaderboardData);
    }, [leaderboardData]);

    return (
        <>
            <div className="container mx-auto my-8">
                <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
                <div className="flex justify-center space-x-4 mb-3">
                    <button
                        className="btn"
                        onClick={() => handleGet("snake")}
                    >
                        Snake
                    </button>

                    <button
                        className="btn"
                        onClick={() => handleGet("lights-out")}
                    >
                        Lights out!
                    </button>

                    <button
                        className="btn"
                        onClick={() => handleGet("fruit-catcher")}
                    >
                        Fruit catcher
                    </button>

                    <button
                        className="btn"
                        onClick={() => handleGet("plumber")}
                    >
                        Plumber
                    </button>
                </div>

                {leaderboardData.length !=0 && <LeaderboardTable className="" data={leaderboardData} />}
            </div>
        </>
    );
};
