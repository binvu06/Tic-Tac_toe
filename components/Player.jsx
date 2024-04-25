import { useState } from "react";

export default function Player({
   initialPlayerName,
   symbol,
   isActive,
   onChangeName,
}) {
   const [playerName, setPlayerName] = useState(initialPlayerName);
   const [isEditing, setIsEditing] = useState(false);

   function handleEditClick() {
      setIsEditing(wasEditing => !wasEditing); // tối ưu nhất
      // setIsEditing(!isEditing);
      // setIsEditing(isEditing ? false : true);

      if (isEditing) {
         onChangeName(symbol, playerName);
      }
   }

   function handleChange(event) {
      setPlayerName(event.target.value);
   }

   let editablePlayerName = <span className="player-name">{playerName}</span>;
   //  let btnCaption = "Edit";

   if (isEditing) {
      editablePlayerName = (
         <input
            type="text"
            required
            // defaultValue={playerName}
            value={playerName}
            onChange={handleChange}
         />
      );
      // btnCaption = "Save";
   }

   return (
      <li className={isActive ? "active" : undefined}>
         <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
         </span>
         <button onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
         </button>
      </li>
   );
}
