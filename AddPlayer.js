import { useState, useEffect } from 'react';
import axios from 'axios';
import './addPlayer.css';


const AddPlayer = () => {
    
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [note, setNote] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("");

  const fetchPlayers = async() => {
    try {      
      const response = await axios.get("/api/players");
      setPlayers(response.data.players);
    } catch(error) {
      setError("error retrieving players: " + error);
    }
  }
  const createPlayer = async() => {
    try {
      console.log("note is, ", note);
      await axios.post("/api/players", {name: name, sport: sport, note: note, age: age, team: team});
    } catch(error) {
      setError("error adding a player: " + error);
    }
  }
  const deleteOnePlayer = async(player) => {
    try {
      await axios.delete("/api/players/" + player.id);
    } catch(error) {
      setError("error deleting a player" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchPlayers();
  },[]);

  const addPlayer = async(e) => {
    e.preventDefault();
    await createPlayer();
    fetchPlayers();
    setName("");
    setSport("");
    setNote("");
    setAge("");
    setTeam("");
  }

  const deletePlayer = async(player) => {
    await deleteOnePlayer(player);
    fetchPlayers();
  }

    
    
  return (
      <div className = "AddPlayer">
          {error}
          <h1>Add a Player</h1>
          <form onSubmit={addPlayer}>
            <div>
              <label>
                Name:
                <input className = "input" type="text" value={name} onChange={e => setName(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Sport:
                <input className = "input" value={sport} onChange={e=>setSport(e.target.value)}></input>
              </label>
            </div>
            <div>
              <label>
                Age:
                <input className = "input" value={age} onChange={e=>setAge(e.target.value)}></input>
              </label>
            </div>
            <div>
              <label>
                Team (or Independent):
                <input className = "input" value={team} onChange={e=>setTeam(e.target.value)}></input>
              </label>
            </div>
             <div>
              <label className = "label">
               Notable Characteristics:
                <textarea className = "input" value={note} onChange={e=>setNote(e.target.value)}></textarea>
              </label>
            </div>
            
            <input className = "submit" type="submit" value="Submit" />
          </form>
          <h1>Players</h1>
          {players.map( player => (
            <div key={player.id} className="player">
              <div className="sport">
                <p className = "item"> Name: {player.name}</p>
                <p className = "item"> Sport: {player.sport}</p>
                <p className = "shortItem"> Age: {player.age}</p>
                <p className = "item"> Team: {player.team}</p>
                <p className = "longItem"> Note: {player.note}</p>
                <button onClick={e => deletePlayer(player)}>Delete</button>
              </div>
              
            </div>
          ))}     
    </div>
    );
};

export default AddPlayer;