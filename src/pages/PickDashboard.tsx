import React, { FC, useState } from "react";
import UserSelect from "../components/Select/UserSelect";
import USER_LIST from "../data/Users.json";
import { User } from "../types/User";

const PickDashboard: FC = () => {
    const [selectedUsers, setSelectedUser] = useState({});

    const getUserList = (): User[] => {
        return USER_LIST.users.map((item) => ({
            name:
                item.user.name.first.toLocaleUpperCase() +
                " " +
                item.user.name.last.toLocaleUpperCase(),
            email: item.user.email,
            thumbnail: item.user.picture.thumbnail,
        }));
    };

    return (
        <div className="px-3 py-5">
            <div className="w-full">
                <h1 className="text-center text-3xl text-blue-900 font-semibold">
                    Pick Users
                </h1>
            </div>
            <div className="p-5 mt-5">
                <UserSelect userList={getUserList()} />
            </div>
        </div>
    );
};

export default PickDashboard;
