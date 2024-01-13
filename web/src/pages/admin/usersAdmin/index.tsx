import { FC, useEffect, useState } from "react";
import { api } from "../../../api/api.config";
import { AccountType } from "../../../types/accountType";

const AdminUsers: FC = () => {

    const [users, setUsers] = useState<AccountType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await api.get('/users');
            const data = response.data as AccountType[];
            setUsers(data.filter(user => user.type !== 'ADMINISTRATOR'));
        }

        fetchUsers();
    }, []);

    const deleteUser = async (username: string | undefined) => {
        if (username !== undefined) {
            await api.delete(`/users/username/${username}`);
            setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
        }
    }

    return (
        <div className="bg-neutral-200 flex justify-center flex-col w-full">
            <table className="mx-20 table-fixed border-collapse border border-slate-500 min-w-max">
                <thead className="bg-neutral-400">
                    <tr>
                        <th className="border border-slate-600 px-5 py-3">Nazwa użytkownika</th>
                        <th className="border border-slate-600 px-5 py-3">Email</th>
                    </tr>
                </thead>
                <tbody className="bg-neutral-300">
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border border-slate-700 px-3 py-1">{user.username}</td>
                            <td className="border border-slate-700 px-3 py-1">{user.email}</td>
                            <td className="border hover:cursor-pointer hover:text-green-500 border-slate-700 text-center">Aktualizuj</td>
                            <td className="border hover:cursor-pointer hover:text-green-500 border-slate-700 text-center">Ustaw nowe hasło</td>
                            <td className="border hover:cursor-pointer hover:text-green-500 border-slate-700 text-center"
                                onClick={() => {
                                    deleteUser(user.username);
                                }}>Usuń</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUsers;