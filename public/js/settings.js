let tournamentData = null;

async function loadSettings() {
    const response = await fetch("/api/tournament");
    tournamentData = await response.json();

    document.getElementById("title-input").value = tournamentData.title;

    const teamInputs = document.getElementById("team-inputs");
    teamInputs.innerHTML = "";

    tournamentData.teams.forEach((team, index) => {
        const input = document.createElement("input");
        input.value = team;
        input.dataset.index = index;
        teamInputs.appendChild(input);
    });

    renderMatchControls();
}

function renderMatchControls() {
    const container = document.getElementById("match-controls");
    container.innerHTML = "";

    tournamentData.matches.forEach((match, index) => {
        const div = document.createElement("div");
        div.className = "match-box";

        div.innerHTML = `
            <p>${match.team1} VS ${match.team2}</p>
            <button onclick="setWinner(${index}, '${match.team1}', '${match.team2}')">${match.team1} Winner</button>
            <button onclick="setWinner(${index}, '${match.team2}', '${match.team1}')">${match.team2} Winner</button>
        `;

        container.appendChild(div);
    });
}

function setWinner(index, winner, loser) {
    tournamentData.matches[index].winner = winner;
    tournamentData.matches[index].loser = loser;

    if (!tournamentData.loserBracket.includes(loser)) {
        tournamentData.loserBracket.push(loser);
    }

    saveTournament();
}

function shuffleTeams() {
    tournamentData.teams.sort(() => Math.random() - 0.5);

    for (let i = 0; i < tournamentData.matches.length; i++) {
        tournamentData.matches[i].team1 = tournamentData.teams[i * 2];
        tournamentData.matches[i].team2 = tournamentData.teams[i * 2 + 1];
        tournamentData.matches[i].winner = null;
        tournamentData.matches[i].loser = null;
    }

    tournamentData.loserBracket = [];

    saveTournament();
}

async function saveTournament() {
    const inputs = document.querySelectorAll("#team-inputs input");

    tournamentData.title = document.getElementById("title-input").value;

    inputs.forEach(input => {
        const index = input.dataset.index;
        tournamentData.teams[index] = input.value;
    });

    await fetch("/api/tournament", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tournamentData)
    });

    loadSettings();
}

document.getElementById("shuffle-btn").addEventListener("click", shuffleTeams);
document.getElementById("save-btn").addEventListener("click", saveTournament);

loadSettings();