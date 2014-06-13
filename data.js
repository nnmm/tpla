var d = {
    "block": "Der Lastwagen",
    "blocktext": "Ein Obsttransporter fährt auf der Autobahn von München nach Berlin. Da er voll beladen ist beträgt seine Masse 40 Tonnen. Da es der Fahrer nicht besonders eilig hat fährt er durchschnittlich mit einer Geschwindigkeit von 72.0 km/h.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "Aufgabe a",
            "problem": "Welche kinetische Energie, in Megajoule, besitzt der LKW?",
            "image": false,
            "given": [
                { "letter": "v", "index": "LKW", "value": "72.0", "unit": "km/h" },
                { "letter": "m",  "index": "LKW", "value": "40", "unit": "t" },
            ],
            "equations": [
                "E = ½⋅m⋅v²"
            ],
            "solution": {
                "letter": "E",
                "index": "LKW",
                "value": "8,0",
                "unit": "MJ",
                "unit_long": "Megajoule",
                "equation": "E = ½⋅m⋅v²",
            },
            "alternative_solution_equations": [
                "E = 2⋅m⋅v²",
                "E = ½⋅m⋅v",
                "E = ½⋅v⋅m²",
                "E = ½⋅m²⋅v²"
            ],
            "units": {
                "correct": "kg⋅m²/s²",
                "wrong": [
                    "kg⋅km/h",
                    "t⋅km/h"
                ]
            },
            "correct_solution_phrase": "Der LKW hat eine kinetische Energie von {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Der Lastwagen fährt mit einer kinetischen Energie von {{solution.value}} {{solution.unit}}.",
                "Der Obsttransporter fährt von Berlin nach München.",
                "Der LKW hat eine Leistung von {{solution.value}} {{solution.unit}}.",
                "Der Lastwagen generiert {{solution.value}} {{solution.unit}} an Energie"
            ]
        },
        {
            "type": "tpla",
            "title": "Aufgabe 2",
            "problem": "Auf welche Höhe in Metern ließe sich der LKW mit dieser Energie heben? Die Erdbeschleunigung g = 9,81 m/s² kann hierfür als gegeben vorausgesetzt werden.",
            "image": false,
            "given": [
                { "letter": "v", "index": "LKW", "value": "72,0", "unit": "km/h" },
                { "letter": "m",  "index": "LKW", "value": "40", "unit": "t" },
                { "letter": "m",  "index": "LKW", "value": "40", "unit": "t" },
                { "letter": "g",  "index": "", "value": "9,81", "unit": "m/s²" }


            ],
            "equations": [
                "E = ½⋅m⋅v²",
                "E = m⋅g⋅h"
            ],
            "solution": {
                "letter": "h",
                "index": "LKW",
                "value": "20",
                "unit": "m",
                "unit_long": "Meter",
                "equation": "h = ½⋅m⋅v²/m⋅g",
            },
            "alternative_solution_equations": [
                "h = [½⋅m⋅v²]/[m⋅g²]",
                "h = [½⋅v²]/[m⋅g]",
                "h = m⋅g/½⋅m⋅v",
                "h = m⋅g/½⋅m⋅v²"
            ],
            "units": {
                "correct": "[(m/s)²]/[m/s²]",
                "wrong": [
                    "[m/s²]/[m/s²]",
                    "[m²/s]/[m/s²]"
                ]
            },

            "correct_solution_phrase": "Der LKW ließe sich auf eine Höhe von {{solution.value}} {{solution.unit}} heben.",
            "alternative_solution_phrases": [
                "Der Lastwagen könnte {{solution.value}} {{solution.unit}} bergauf fahren.",
                "Würde der Fahrer aufhören Gas zu geben würde sein Lastwagen noch {{solution.value}} {{solution.unit}} rollen.",
                "Der LKW hat eine Leistung von {{solution.value}} {{solution.unit}}.",
                "Der Lastwagen hat eine potentielle Energie von {{solution.value}} {{solution.unit}}."
            ]
        },
        {
            "type": "tpla",
            "title": "Aufgabe 3",
            "problem": "Der LKW trifft nun auf ein Stauende und muss abrupt von 72 auf 18 km/h abbremsen. Hierbei wird eine Energieform in einer andere überführt. Wie groß ist der überführte Energiebetrag?",
            "image": false,
            "given": [
                { "letter": "v", "index": "max", "value": 72, "unit": "km/h" },
                { "letter": "v",  "index": "min", "value": 18, "unit": "km/h" },
                { "letter": "m",  "index": "LKW", "value": 40, "unit": "t" },
                { "letter": "m",  "index": "LKW", "value": 40, "unit": "t" }
            ],
            "equations": [
                "E = ½⋅m⋅v²",
                "E = ½⋅m⋅v²",
                "∆E = E - E"
            ],
            "solution": {
                "letter": "∆E",
                "index": "",
                "value": "7,5",
                "unit": "mJ",
                "unit_long": "Megajoule",
                "equation": "∆E = ½⋅m⋅v² - ½⋅m⋅v²",
            },
            "alternative_solution_equations": [
                "∆E = ½⋅m⋅v + ½⋅m⋅v²",
                "∆E = ½⋅m⋅v² + ½⋅m⋅v²",
                "∆E = ½⋅m⋅v - ½⋅m⋅v²",
                "∆E = ½⋅m⋅v² - ½⋅m⋅v"
            ],
            "units": {
                "correct": "kg⋅m²/s² - kg⋅m²/s²",
                "wrong": [
                    "kg⋅km/h - kg⋅km/h",
                    "m/s - m/s"
                ]
            },

            "correct_solution_phrase": "Der überführte Energiebetrag beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Es entsteht eine Energie von {{solution.value}} {{solution.unit}}.",
                "Der Lastwagen schafft es nicht mehr abzubremsen. Es gibt einen Unfall mit {{solution.value}} Toten.",
                "Der LKW hat eine Wärmeenergie von {{solution.value}} {{solution.unit}}.",
                "Der Lastwagen hat eine potentielle Energie von {{solution.value}} {{solution.unit}}."
            ]
        },
        {
            "type": "tpla",
            "title": "Aufgabe 4",
            "problem": "Da der Verkehr bald wieder fließt, beschleunigt der LKW jetzt wieder von 18 auf 54 km/h. Er benötigt dafür 20 Sekunden. Welche durchschnittliche Leistung ist für den Beschleunigungsvorgang nötig?",
            "image": false,
            "given": [
                { "letter": "v", "index": "max", "value": "54", "unit": "km/h" },
                { "letter": "v",  "index": "min", "value": "18", "unit": "km/h" },
                { "letter": "m",  "index": "LKW", "value": "40", "unit": "t" },
                { "letter": "m",  "index": "LKW", "value": "40", "unit": "t" },
                { "letter": "Δt",  "index": "Beschleunigung", "value": "20", "unit": "s" }


            ],
            "equations": [
                "P = ∆E/Δt",
                "∆E = E - E",
                "E = ½⋅m⋅v²",
                "E = ½⋅m⋅v²"
            ],
            "solution": {
                "letter": "P",
                "index": "Beschleunigung",
                "value": "200",
                "unit": "kW",
                "unit_long": "Kilowatt",
                "equation": "P = (½⋅m⋅v² - ½⋅m⋅v²)/Δt",
            },
            "alternative_solution_equations": [
                "P = ∆t/(½⋅m⋅v² - ½⋅m⋅v²)",
                "P = (½⋅m⋅v - ½⋅m⋅v²)/Δt",
                "P = ∆t/(½⋅m⋅v² - ½⋅m⋅v)",
                "P = ∆t/(½⋅m⋅v² + ½⋅m⋅v)"
            ],
            "units": {
                "correct": "(kg⋅m²/s²)/s",
                "wrong": [
                    "(kg⋅km/h)/s",
                    "(kg⋅m/s)/h"
                ]
            },

            "correct_solution_phrase": "Die Leistung, die zur Beschleunigung des LKWs nötig ist beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Leistung des LKWs pro Sekunde beträgt {{solution.value}} {{solution.unit}}.",
                "Der LKW generiert {{solution.value}} {{solution.unit}} an Leisung",
                "Da ist schon wieder ein Stau. Der LKW rast hinein und es gibt 300 Tote.",
                "Der Lastwagen hat jetzt eine potentielle Energie von {{solution.value}} {{solution.unit}}."
            ]
        },
        {
            "type": "tpla",
            "title": "Aufgabe 5",
            "problem": "Im Fahrzeugschein des LKWs steht, dass der Motor eine maximale Leistung von 500 kW aufweist. Welcher Bruchteil α der maximalen Motorleistung wird für die vorherige Beschleunigung benötigt?",
            "image": false,
            "given": [
                { "letter": "P",  "index": "Beschleunigung", "value": "200", "unit": "kW" },
                { "letter": "P",  "index": "Motor", "value": "500", "unit": "kW" }
            ],
            "equations": [
                "α = P/P"
            ],
            "solution": {
                "letter": "α",
                "index": "",
                "value": "40",
                "unit": "%",
                "unit_long": "",
                "equation": "α = P/P",
            },
            "alternative_solution_equations": [
                "α = P⋅P",
                "α = P+P",
                "α = P-P",
                "α = P²"
            ],
            "units": {
                "correct": "W/W",
                "wrong": [
                    "W⋅W",
                    "W²"
                ]
            },
            "correct_solution_phrase": "Der Bruchteil der Motorleistung der für die Beschleunigung nötig ist beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Der Motor braucht {{solution.value}} {{solution.unit}} mal so viel Leistung, wie normal.",
                "Der Bruchteil der Motorleistung der für die Beschleunigung nötig ist beträgt 0.4 %.",
                "Da ist schon wieder ein Stau. Der LKW rast hinein und es gibt 0.4 Tote",
                "Der  Motorleistung wird nur teilweise ausgenutzt."
            ]
        }
    ]
};