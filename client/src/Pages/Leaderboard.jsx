import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setUsers(data.leaderboard);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 mb-8">
          <h1 className="text-4xl font-bold text-white">
            🏆 Leaderboard
          </h1>

          <p className="text-cyan-100 mt-2">
            Top learners of Cogniverse
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-blue-700 text-white">

              <tr>

                <th className="p-4 text-left">
                  Rank
                </th>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-center">
                  Level
                </th>

                <th className="p-4 text-center">
                  XP
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user,index)=>(
                <tr
                  key={user._id}
                  className="border-b hover:bg-blue-50"
                >

                  <td className="p-4 font-bold">

                    {index===0 ? "🥇" :
                     index===1 ? "🥈" :
                     index===2 ? "🥉" :
                     `#${index+1}`}

                  </td>

                  <td className="p-4">

                    <div className="font-semibold">
                      {user.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {user.email}
                    </div>

                  </td>

                  <td className="text-center">
                    {user.level}
                  </td>

                  <td className="text-center font-bold text-cyan-700">
                    {user.xp}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Leaderboard;