var d = {
    "block": "Das Karussell II",
    "blocktext": "In der Mitte des Karussells befindet sich eine Welle, die mit dem Karussell rotiert. Ein an die Welle angeschlossenes Getriebe erhöht wie bei einer Gangschaltung eines Fahrrads die Drehgeschwindigkeit, mit einem Wirkungsgrad von 95 %. Von dort aus führt eine weitere Welle zu einem Generator mit Wirkungsgrad 70 %, der die kinetische Energie in Strom umwandelt. Energieverluste durch Reibung sollen vernachlässigt werden.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": "Wie groß ist der Gesamtwirkungsgrad des Systems? Wirkungsgrade sollen als dimensionslose Größe (nicht in Prozent) angegeben werden.",
            "image": false,
            "given": [
                { "letter": "η", "index": "Getr", "value": "0,95", "unit": "" },
                { "letter": "η", "index": "Gen", "value": "0,7", "unit": "" }

            ],
            "equations": [
                "η = P_ab/P_zu"
            ],
            "solution": {
                "letter": "η",
                "index": "ges",
                "value": "0,67",
                "unit": "",
                "unit_long": "",
                "equation": "η<sub>ges</sub> = η<sub>Getr</sub>⋅η<sub>Gen</sub>"
            },
            "alternative_solution_equations": [
                "η<sub>ges</sub> = η<sub>Getr</sub>/η<sub>Gen</sub>",
                "η<sub>ges</sub> = η<sub>Getr</sub>+η<sub>Gen</sub>"
            ],
            "units": {
                "correct": "1",
                "wrong": [
                    "N",
                    "J"
                ]
            },
            "correct_solution_phrase": "Der Gesamtwirkungsgrad des Systems beträgt {{solution.value}}.",
            "alternative_solution_phrases": [
                "Der Gesamtwirkungsgrad des Getriebes beträgt {{solution.value}}.",
                "Der Gesamtwirkungsgrad des Generators beträgt {{solution.value}}.",
                "Der Gesamtwirkungsgrad beträgt {{solution.value}}.",
                "Der Gesamtwirkungsgrad des Systems beträgt {{solution.value}} %."
            ]
        },
        {
            "type": "tpla",
            "title": "b",
            "problem": "Wir nehmen nun an, dass 25 % der Energie der spielenden Kinder in Elektrizität umgewandelt wird, der Wirkungsgrad der Umwandlung 67 % beträgt und ein Kind, wie zuvor berechnet, während einer fünfminütigen Spieleinheit auf dem Karussell 60 kJ abgibt. Die elektrische Energie, die aus einer solchen Spieleinheit gewonnen werden kann, nennen wir eine Kinderspieleinheit (KSE). Wie viel Energie, in KSE, ist nötig, um zwei 30-W-Glühlampen für eine Stunde zum Leuchten zu bringen?",
            // 1 KSE = 0.25⋅0.67⋅60kJ = 10,05 kJ
            "image": false,
            "given": [
                { "letter": "η", "index": "Kar", "value": "0,25", "unit": "" },
                { "letter": "η", "index": "Getr, Gen", "value": "0,67", "unit": "" },
                { "letter": "∆t", "index": "", "value": "300", "unit": "s" },
                { "letter": "∆E", "index": "Kind, 5 min", "value": "60", "unit": "kJ" },
                { "letter": "P", "index": "Lampe", "value": "30", "unit": "W" },
            ],
            "equations": [
                "η = E_ab/E_zu",
                "ΔE_E2 = ΔE_E1/ΔE_E12",
                "P = ΔE/∆t",
            ],
            "solution": {
                "letter": "ΔE",
                "index": "Licht",
                "value": "21,50",
                "unit": "KSE",
                "unit_long": "Kinderspieleinheiten",
                "equation": "ΔE<sub>Licht</sub> = [2⋅P<sub>Lampe</sub>⋅Δt]/[η<sub>Kar</sub>⋅η<sub>Getr, Gen</sub>⋅ΔE<sub>Kind, 5 min</sub>]",
            },
            "alternative_solution_equations": [
                "ΔE<sub>Licht</sub> = [2⋅η<sub>Kar</sub>⋅η<sub>Getr, Gen</sub>⋅ΔE<sub>Kind, 5 min</sub>]/[P<sub>Lampe</sub>⋅Δt]",
                "ΔE<sub>Licht</sub> = [E<sub>Lampe</sub>⋅Δt]/[ΔE<sub>Kind, 5 min</sub>]",
                "ΔE<sub>Licht</sub> = [η<sub>Kar</sub>⋅η<sub>Getr, Gen</sub>⋅P<sub>Lampe</sub>⋅Δt]/[ΔE<sub>Kind, 5 min</sub>]",
                "ΔE<sub>Licht</sub> = [η<sub>Kar</sub>⋅η<sub>Getr, Gen</sub>⋅ΔE<sub>Kind, 5 min</sub>]/[Δt]"
            ],
            "units": {
                "correct": "J/J",
                "wrong": [
                   "J⋅W",
                   "W/(J⋅Δt)",
                ]
            },
            "correct_solution_phrase": "Die Energie für den Betrieb der beiden Lampen entspricht {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Energie für den Betrieb der beiden Lampen entspricht 3,6 {{solution.unit}}.",
                "Mit einer KSE können die Lampen etwa 1,38 min betrieben werden.",
                "Die Leistung reicht lediglich, um eine Lampe zu betreiben.",
                "Die Frage kann mit den gegebenen Größen nicht gelöst werden."
            ]
        }
    ]
};