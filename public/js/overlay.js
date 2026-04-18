async function loadTournament() {
    const response = await fetch("/api/tournament");
    const data = await response.json();

    document.getElementById("tournament-title").innerText = data.title;

    const winnerBracket = document.getElementById("winner-bracket");
    const loserBracket = document.getElementById("loser-bracket");

    winnerBracket.innerHTML = "";
    loserBracket.innerHTML = "";

    data.matches.forEach(match => {
        const div = document.createElement("div");
        div.className = "match-box";
        div.innerHTML = `
            <strong>${match.team1}</strong> VS <strong>${match.team2}</strong>
        `;
        winnerBracket.appendChild(div);
    });

    data.loserBracket.forEach(team => {
        const div = document.createElement("div");
        div.className = "match-box";
        div.innerText = team;
        loserBracket.appendChild(div);
    });
}

loadTournament();
setInterval(loadTournament, 3000);