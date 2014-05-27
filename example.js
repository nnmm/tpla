var jsonObject = {
    "type": "tpla",
    "block": "Kuckucksuhr",
    "blocktext": "Eine Kuckucksuhr hängt an der Wand und tickt schon seit 250 Jahren vor sich hin. Die beiden Eisengewichte (Fichtenzapfen) von je 3,5 kg werden einmal in der Woche hochgezogen und liefern auf ihrer Talfahrt von 85 cm die nötige Energie für das Uhrwerk und den Antrieb des Kuckucks.",
    "title": "Aufgabe 1",
    "problem": "Was ist die Leistung der Uhr?",
    "image": false,
    "given": [
        { "letter": "Δt", "index": "1", "value": 604800, "unit": "s" },
        { "letter": "m",  "index": "Gewichte", "value": 7, "unit": "kg" },
        { "letter": "h",  "index": "", "value": 0.85, "unit": "m" },
        { "letter": "g",  "index": "", "value": 9.81, "unit": "m/s²" }
    ],
    "equations": [
        "P = E/Δt",
        "E = m⋅g⋅h"
    ],
    "solution": {
        "letter": "P",
        "index": "",
        "value": 0.000096,
        "unit": "W",
        "unit_long": "Watt",
        "equation": "P = m⋅g⋅h/Δt",
    },
    "alternative_solution_equations": [
        "P = Δt/(m⋅g⋅h)",
        "P = m/Δt ⋅ g/h",
        "P = Δt + m⋅g⋅h",
        "P = m⋅g⋅h - Δt"
    ],
    "units": {
        "correct": "N⋅m/s",
        "wrong": [
            "J⋅m/s²",
            "m²/(s⋅kg)"
        ]
    },

    "correct_solution_phrase": "Die Leistung, die zum Betrieb der Uhr benötigt wird, ist {{solution.value}} {{solution.unit}}.",
    "alternative_solution_phrases": [
        "Die Leistung der Uhr pro Woche ist {{solution.value}} {{solution.unit}}.",
        "Die Energie der Uhr ist {{solution.value}} {{solution.unit}}.",
        "Die Uhr ist 250 Jahre alt.",
        "Die Uhr generiert {{solution.value}} {{solution.unit}} an Leistung"
    ]
};