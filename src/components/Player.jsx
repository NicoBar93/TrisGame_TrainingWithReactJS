import {useState} from 'react';


export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((wasEditing) => !isEditing);

        if(isEditing){
            onChangeName(symbol, playerName)
        }
    }

    function handleChangeName(event) {
        setPlayerName(event.target.value);
    }

    let editPlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing) {  
        editPlayerName = <input type="text" required value={playerName} onChange={handleChangeName} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editPlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}