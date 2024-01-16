import React, { FC } from "react";
import { ChipProps } from "../../types/components/Chip";

const Chip: FC<ChipProps> = ({ name, thumbnail, onRemove, selected }) => {
    return (
        <div
            className={`flex flex-row items-center gap-3 pr-1.5 w-fit h-10 rounded-full overflow-hidden ${
                selected
                    ? "bg-yellow-200/60 border-2 border-yellow-700/50"
                    : "bg-stone-200/50"
            }`}
        >
            <div className="w-10 h-10 rounded-full">
                <img
                    src={thumbnail}
                    alt=""
                    className="w-full h-full rounded-full"
                />
            </div>
            <div>
                <p className="text-md">{name}</p>
            </div>
            <div className="">
                <button
                    onClick={onRemove}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-300"
                >
                    <img
                        className="w-[70%] h-[70%]"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVR4nO2VXQrCMBAGxwtalZY86NkVLP6hN6hQCaQgJdXdsFHEDOQt+02TbBooFP6JBrgBB2ChqFsCJ+AK1FrpLBT2YXSAE9S5MHeo8xlqLk8BEvlY6sc5RbyKBE3JY9IuZCRRRwLvwGbUC7E561SpRJ5N+m4rpUdhvvJsK5XKs0qZONNYw31E2ueUu280V/Piykjuubl0wFxeGfwyfYaa1uCR2KeIjwbPos9QU4Uv3iq3zM/dhdp5irhQ+E0ekyummbane5EAAAAASUVORK5CYII="
                    />
                </button>
            </div>
        </div>
    );
};

export default Chip;
