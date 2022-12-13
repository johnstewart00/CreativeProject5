import { useState, useEffect } from 'react';
import "./MoreStats.css"

const MoreStats = () => {
    const [team, setTeam] = useState("");
    const [id, setID] = useState("");
    const [ids, setIDS] = useState("");
    const [totalWins, settotalWins] = useState("");
    const [logo, setLogo] = useState("");
    const [otherStats, setOtherStats] = useState("");
    const [home, setHome] = useState("");
    const [away, setAway] = useState("");
  const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1d5b269f5emshb0c58c27fb456e1p156ae3jsnc119f8011b7b',
		'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
	}
};

const getData = async(e) => {
	e.preventDefault();
    fetch('https://api-basketball.p.rapidapi.com/statistics?season=2019-2020&league=12&team=' + id, options1)
    .then(function(response){
	    return response.json();
	}).then(function(json) {
	    console.log(json);
	    let tempWins = "Total wins for the " + team + " are: ";
	    tempWins += json.response.games.wins.all.total;
	    tempWins += " in the " + json.parameters.season + " season";
	    let logoURL = json.response.team.logo;
	    console.log(logoURL);
	    setLogo(logoURL);
	    console.log("logo is ", logo);
	    settotalWins(tempWins);
	    console.log(tempWins);
	    let record = "";
	    record += "The " + team + " played a total of " + json.response.games.played.all + " games. ";
	    record +=  "The number of home games was " + json.response.games.played.home + ". ";
	    record += " Number of games played away was: " + json.response.games.played.away + ". ";
	    setOtherStats(record);
	    let tempHome = "Number of games won at home and percentage: " + json.response.games.wins.home.total + ", " + json.response.games.wins.home.percentage;
		setHome(tempHome);
		let tempAway = "Number of games won away and percentage: " + json.response.games.wins.away.total + ", " + json.response.games.wins.away.percentage;
		setAway(tempAway);
	});
}

const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1d5b269f5emshb0c58c27fb456e1p156ae3jsnc119f8011b7b',
		'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
	}
};

const getTeam = async(e) => {
    e.preventDefault();
    fetch('https://api-basketball.p.rapidapi.com/teams?search=' + team, options2)
	.then(function(response){
	    return response.json();
	}).then(function(json) {
	    console.log(json);
	    let Ids = "";
	    for (let i=0; i<json.response.length; i++){
	    	Ids += json.response[i].name;
	    	Ids += " id is: "
	    	Ids += json.response[i].id;
	    	if(i !== json.response.length-1){
	    		Ids += ", ";
	    	}
	    }
	    
	    setIDS(Ids);
	    console.log(Ids);
	});
}

  

  return (
      <div>
        <h1>Enter a NBA team</h1>
        <form onSubmit={getTeam}>
        <input className = "input" value={team} onChange={e=>setTeam(e.target.value)}></input>
        <input className = "submit" type="submit" value="Submit" />
        </form>
        <p> the name and ID's of all basketball teams are retrieved are: </p>
        <p> {ids} </p>
         <form onSubmit={getData}>
    	  Enter ID here: <input className = "input" value={id} onChange={e=>setID(e.target.value)}></input>
          <input className = "submit" type="submit" value="Submit" />
        <div className = "data">
        <p className = "item"> {totalWins}</p>
        <p className = "item"> {otherStats}</p>
        <p className = "item"> {home}</p>
        <p className = "item"> {away}</p>
        </div>
        <img src = {logo} alt="Team Logo"/>
        </form>
      </div>
    );
};

export default MoreStats;