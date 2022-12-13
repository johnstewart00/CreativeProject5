import { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import "./Home.css";

const Home = () => {
    
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  
  const fetchAllPlayers = async() => {
    try {      
      const response = await axios.get("/api/players");
      setPlayers(response.data.players);
    } catch(error) {
      setError("error retrieving players: " + error);
    }
  }
  
  const fetchPlayers = async() => {
    try {
      console.log("sport is", sport);
      const response = await axios.get("/api/specific/" + sport);
      setPlayers(response.data.players);
      console.log("players is ", players);
    } catch(error) {
      setError("error retrieving players: " + error);
    }
  }
  
  const fetchTeam = async() => {
    try {
      console.log("team is", team);
      const response = await axios.get("/api/team/" + team);
      setPlayers(response.data.players);
    } catch (error) {
      setError("error retrieving players: " + error);
    }
  }
  
   useEffect(() => {
    fetchPlayers();
  },[]);
  
  const findPlayers = async(e) => {
    e.preventDefault();
    await fetchPlayers(sport);
    console.log(players);
    fetchPlayers();
  }
  
  const findTeam = async(e) => {
    e.preventDefault();
    await fetchTeam(team);
    console.log(players);
    fetchPlayers();
  }

  return (
      <div className = "Home">
      <div className = "header">
      <h1>Welcome to John's Sports Page</h1>
      <p>On this page, by entering either a sport or team name, you can access players that you previously entered on the <Link to="/AddPlayer">Add a Player</Link> page </p>
      </div>
      <div className = "main">
        <div className = "sidebar">
          <h3> About John </h3>
          <p>John has been creating websites for months now with the goal to promote sports. He wants to facilitate creating local sports teams, learning sports facts, and improving yourself. The dream is for everyone to 
          be able to enjoy sports as much as he does. While this is a lofty goal, this website can help people learn sports information to enjoy the game more. </p>
        </div>
        <div className = "content">
          <h1>Enter a sport</h1>
          <form onSubmit={findPlayers}>
              <div>
                <label>
                  Sport:
                  <input type="text" value={sport} onChange={e => setSport(e.target.value)} />
                </label>
              </div>
              <input type="submit" value="Submit" />
          </form>
        
      

          <h1>Or </h1>
          <h1>Enter a team</h1>
          <form onSubmit={findTeam}>
              <div>
                <label>
                  Team:
                  <input type="text" value={team} onChange={e => setTeam(e.target.value)} />
                </label>
              </div>
              <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
        <div className = "playersTitle">
          <h1 >Players</h1>
        </div>
          {players.map( player => (
            <div key={player.id} className="player">
             <div className="sport">
                <p className = "title">Name: </p>
                <p className = "item"> {player.name}</p>
                <p className = "title">Sport: </p>
                <p className = "item">{player.sport}</p>
                <p className = "title">Age: </p>
                <p className = "shortItem">{player.age}</p>
                <p className = "title">Team: </p>
                <p className = "item">{player.team}</p>
                <p className = "title">Note: </p>
                <p className = "longItem">{player.note}</p>
               
              </div>
            </div>
          ))} 
          <div className = "footer">
            <h3 className = "footerNote"> Thanks for visiting the website! </h3>
          </div>
      </div>
    );
};

export default Home;