import { User } from "../User";

export interface UserSelectProps {
    userList: User[];
    onChange?: () => void;
}
