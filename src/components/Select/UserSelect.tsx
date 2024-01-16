import React, { FC, useEffect, useRef, useState } from "react";
import { UserSelectProps } from "../../types/components/UserSelect";
import Chip from "../Chip/Chip";
import { User } from "../../types/User";

const UserSelect: FC<UserSelectProps> = ({ userList }) => {
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const selectInputDivRef = useRef<HTMLDivElement>(null);

    const [selectedList, setSelectedList] = useState<User[]>([]);
    const [inputState, setInputState] = useState({
        isFocused: false,
        value: "",
        isMouseIn: false,
        selectedChip: -1,
    });

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    const handleOutsideClick = (e: any) => {
        if (
            selectInputDivRef.current &&
            !selectInputDivRef.current.contains(e.target)
        ) {
            setInputState((o) => ({ ...o, isFocused: false }));
        }
    };

    const onMouseIn = () => {
        setInputState((o) => ({ ...o, isMouseIn: true }));
    };

    const onMouseOut = () => {
        setInputState((o) => ({ ...o, isMouseIn: false }));
    };

    const onInputFocus = () => {
        setInputState((o) => ({ ...o, isFocused: true }));
        if (inputFieldRef.current !== null) inputFieldRef.current.focus();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState((o) => ({ ...o, value: e.target.value }));
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
            if (!inputState.value) {
                if (inputState.selectedChip === -1) {
                    setInputState((o) => ({
                        ...o,
                        selectedChip: selectedList.length - 1,
                    }));
                } else if (selectedList.length) {
                    setSelectedList(selectedList.slice(0, -1));
                    setInputState((o) => ({
                        ...o,
                        selectedChip: -1,
                    }));
                }
            }
        }
    };

    const onUserSelect = (user: User) => {
        const index = selectedList.findIndex(
            (item) => item.email === user.email
        );
        if (index === -1) {
            setSelectedList((o) => [...o, user]);
        }
        setInputState((o) => ({ ...o, value: "" }));
    };

    const onRemoveUserChip = (user: User) => {
        setSelectedList(
            selectedList.filter((item) => item.email !== user.email)
        );
    };

    return (
        <div>
            <div
                id="userInput"
                className={`border-b-4 rounded-md ${
                    inputState.isMouseIn || inputState.isFocused
                        ? "border-blue-500 bg-gray-50 "
                        : "border-gray-500 bg-white"
                } min-h-16 `}
                onMouseEnter={onMouseIn}
                onMouseLeave={onMouseOut}
                onClick={onInputFocus}
                onKeyDown={onKeyDown}
                ref={selectInputDivRef}
            >
                <div className="px-3 py-2 flex flex-row gap-3 items-center justify-normal flex-wrap">
                    {/* selected chips */}
                    {selectedList.map((item, idx) => (
                        <Chip
                            name={item.name}
                            thumbnail={item.thumbnail}
                            onRemove={() => onRemoveUserChip(item)}
                            selected={inputState.selectedChip === idx}
                            key={idx}
                        />
                    ))}

                    {/* input field */}
                    <div className="relative">
                        <input
                            placeholder="Add new user..."
                            value={inputState.value}
                            className="h-9 focus:outline-none bg-transparent"
                            onChange={onInputChange}
                            onFocus={onInputFocus}
                            ref={inputFieldRef}
                        />
                        <div className="absolute top-10 left-0">
                            {inputState.isFocused && (
                                <div className="px-1 py-1 flex flex-col gap-3 bg-gray-50 shadow-lg w-[40rem] max-h-72 overflow-auto">
                                    {userList.map((item, idx) => {
                                        if (inputState.value) {
                                            if (
                                                item.name
                                                    .toLowerCase()
                                                    .includes(
                                                        inputState.value.toLowerCase()
                                                    ) &&
                                                selectedList.findIndex(
                                                    (selectedItem) =>
                                                        selectedItem === item
                                                ) === -1
                                            )
                                                return (
                                                    <div
                                                        onClick={() =>
                                                            onUserSelect(item)
                                                        }
                                                        className="hover:bg-gray-200 hover:cursor-pointer px-3 py-2 rounded-md"
                                                        key={`user_select_${idx}`}
                                                    >
                                                        <div className="flex flex-row gap-4 flex-wrap items-center">
                                                            <div className="w-10 h-10">
                                                                <img
                                                                    src={
                                                                        item.thumbnail
                                                                    }
                                                                    className="w-full h-full object-contain rounded-full"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <p className="text-lg text-gray-700 font-semibold w-48">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500 font-medium">
                                                                {item.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            else return null;
                                        }

                                        return selectedList.findIndex(
                                            (selectedItem) =>
                                                selectedItem === item
                                        ) === -1 ? (
                                            <div
                                                onClick={() =>
                                                    onUserSelect(item)
                                                }
                                                className="hover:bg-gray-200 hover:cursor-pointer px-3 py-2 rounded-md"
                                                key={`user_select_${idx}`}
                                            >
                                                <div className="flex flex-row gap-4 flex-wrap items-center">
                                                    <div className="w-10 h-10">
                                                        <img
                                                            src={item.thumbnail}
                                                            className="w-full h-full object-contain rounded-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="text-lg text-gray-700 font-semibold w-48">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 font-medium">
                                                        {item.email}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSelect;
