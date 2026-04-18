// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dataPath = path.join(__dirname, "public", "data", "tournament.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function loadTournament() {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return {
            title: "Rocket League Turnier",
            teams: [
                "Team 1",
                "Team 2",
                "Team 3",
                "Team 4",
                "Team 5",
                "Team 6",
                "Team 7",
                "Team 8"
            ],
            matches: [
                {
                    id: 1,
                    team1: "Team 1",
                    team2: "Team 2",
                    winner: null,
                    loser: null
                },
                {
                    id: 2,
                    team1: "Team 3",
                    team2: "Team 4",
                    winner: null,
                    loser: null
                },
                {
                    id: 3,
                    team1: "Team 5",
                    team2: "Team 6",
                    winner: null,
                    loser: null
                },
                {
                    id: 4,
                    team1: "Team 7",
                    team2: "Team 8",
                    winner: null,
                    loser: null
                }
            ],
            winnerBracket: [],
            loserBracket: []
        };
    }
}

function saveTournament(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), "utf8");
}

app.get("/api/tournament", (req, res) => {
    const tournament = loadTournament();
    res.json(tournament);
});

app.post("/api/tournament", (req, res) => {
    const updatedData = req.body;
    saveTournament(updatedData);
    res.json({
        success: true,
        message: "Turnier gespeichert"
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
