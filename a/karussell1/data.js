var d = {
    "block": "Das Karussell I",
    "blocktext": "Ein Karussell auf einem Spielplatz besteht aus einer 240kg schweren Holzscheibe mit 4m Durchmesser. Vier Kinder schieben das Karussell tangential entlang dem Rand an. Für eine Umdrehung benötigen sie 2,6 s.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": "Wie groß ist die Winkelgeschwindigkeit?",
            "image": false,
            "given": [
                { "letter": "r", "index": "Karussell", "value": "240", "unit": "kg" },
                { "letter": "s",  "index": "Umdrehung", "value": "2,6", "unit": "s" }
            ],
            "equations": [
                "ω = ∆φ/∆t",
                "φ = s/r"
            ],
            "solution": {
                "letter": "ω",
                "index": "Karussell",
                "value": "2,42",
                "unit": "1/s",
                "unit_long": "1/s",
                "equation": "ω = (s/r)/∆t"
            },
            "alternative_solution_equations": [
                "ω = ∆t/(s/r)",
                "E = ∆t/(r/s)",
                "E = (r/s)/∆t",
                "E = (s/r)⋅∆t"
            ],
            "units": {
                "correct": "(m/m)/s",
                "wrong": [
                    "m²/s",
                    "m/s"
                ]
            },
            "correct_solution_phrase": "Das Karussell hat eine Winkelgeschwindigkeit von {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Das Karussell hat eine Geschwindigkeit von {{solution.value}} km/h.",
                "Das Karussell fährt echt schnell.",
                "Das Karussell dreht sich braucht 2,6 Sekunden für eine Umdrehung.",
                "Es würden 3 Kinder reichen, um die Winkelgeschwindigkeit von {{solution.value}} {{solution.unit}} zu erreichen."
            ]
        },
        {
            "type": "tpla",
            "title": "b",
            "problem": "Wie groß ist die Zentripetalkraft?",
            "image": false,
            "given": [
                { "letter": "r", "index": "Karussell", "value": "2", "unit": "m" },
                { "letter": "ω", "index": "Karussell", "value": "2,42", "unit": "1/s" },
                { "letter": "m", "index": "Karussell", "value": "240", "unit": "kg" }

            ],
            "equations": [
                "F<sub>Z</sub> = m⋅r⋅ω²"
            ],
            "solution": {
                "letter": "F<sub>Z</sub>",
                "index": "Karussell",
                "value": "2,81",
                "unit": "kN",
                "unit_long": "Kilonewton",
                "equation": "F<sub>Z</sub> = m⋅r⋅ω²",
            },
            "alternative_solution_equations": [
                "F<sub>Z</sub> = m⋅r⋅ω",
                "F<sub>Z</sub> = m⋅r/ω²",
                "F<sub>Z</sub> = m²⋅r⋅ω²",
                "F<sub>Z</sub> = (m⋅r⋅ω)²"
            ],
            "units": {
                "correct": "kg⋅m/s²",
                "wrong": [
                    "kg⋅m/s",
                    "(kg⋅m/s)²"
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
            "title": "c",
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
            "title": "d",
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
            "title": "e",
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