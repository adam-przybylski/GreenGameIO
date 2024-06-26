import { FC, useEffect, useState } from "react";
import { api } from "../../../api/api.config";
import { AccountType } from "../../../types/accountType";
import NewPasswordModal from "../../../components/modals/NewPasswordModal";
import { toast } from "react-toastify";

interface errorType {
    response: {
        data: string;
    }
}

const AdminUsers: FC = () => {

    const [users, setUsers] = useState<AccountType[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string>('');
    const [value, setValue] = useState<string>('');

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
            try {
                await api.delete(`/users/username/${username}`);
                toast.success("Dezaktywowano użytkownika");
                const response = await api.get('/users');
                const data = response.data as AccountType[];
                setUsers(data.filter(user => user.type !== 'ADMINISTRATOR'));
            } catch (error) {
                toast.error((error as errorType).response.data);
            }
        }
    }

    const handleChange = (id: string, value: string | number, field: string) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    [field]: value,
                }
            }
            return user;
        }));
    }

    const handleUpdate = async (id: string) => {
        const user = users.find(user => user.id === id);
        if (user !== undefined) {
            try {
                await api.put(`/users/id/${id}`, user);
                const response = await api.get('/users');
                const data = response.data as AccountType[];
                setUsers(data.filter(user => user.type !== 'ADMINISTRATOR'));
                toast.success("Zaktualizowano użytkownika");
            } catch (error) {
                const response = await api.get('/users');
                const data = response.data as AccountType[];
                setUsers(data.filter(user => user.type !== 'ADMINISTRATOR'));
                toast.error((error as errorType).response.data);
            }
        }
    }

    return (
        <div className="bg-neutral-200 flex justify-center flex-col w-full">
            <input className="w-1/2 mx-auto my-5 p-1 border border-slate-500 rounded-md" type="text" placeholder="Wyszukaj użytkownika"
                onChange={v => {
                    setValue(v.target.value.toLowerCase());
                }} />
            <table className="mx-20 table-fixed border-collapse border border-slate-500 min-w-max">
                <thead className="bg-neutral-400">
                    <tr>
                        <th className="border border-slate-600 px-5 py-3">Nazwa użytkownika</th>
                        <th className="border border-slate-600 px-5 py-3">Email</th>
                        <th colSpan={3}> Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-neutral-300">
                    {users
                        .filter(user => user.username.toLowerCase().includes(value))
                        .map(user => (
                            <tr key={user.id}>
                                <td className="border border-slate-700 px-3 py-1">
                                    <input className="w-full bg-transparent p-1" type="text" value={user.username}
                                        onChange={v => {
                                            handleChange(user.id, v.target.value, 'username');
                                        }} />
                                </td>
                                <td className="border border-slate-700 px-3 py-1">
                                    <input className="w-full bg-transparent p-1" type="email" value={user.email}
                                        onChange={v => {
                                            handleChange(user.id, v.target.value, 'email');
                                        }} />
                                </td>
                                <td className="border hover:cursor-pointer hover:text-green-500 border-slate-700 text-center"
                                    onClick={() => {
                                        handleUpdate(user.id);
                                    }}>Aktualizuj</td>
                                <td className="border hover:cursor-pointer hover:text-green-500 border-slate-700 text-center"
                                    onClick={() => {
                                        setId(user.id);
                                        setIsOpen(true);
                                    }}>Ustaw nowe hasło</td>
                                <td className="border hover:cursor-pointer hover:text-green-500 border-slate-700 text-center"
                                    onClick={() => {
                                        deleteUser(user.username);
                                    }}>Dezaktywuj</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {isOpen && <NewPasswordModal id={id} reset={() => setIsOpen(false)} />}
        </div>
    );
}

export default AdminUsers;