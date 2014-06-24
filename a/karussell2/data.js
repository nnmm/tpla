var d = {
    "block": "Das Karussell II",
    "blocktext": "Im Zentrum des Karussells befindet sich eine Welle, die dessen kinetische Energie aufnimmt. Die Welle führt zu einem Getriebe mit einem Wirkungsgrad von 99 %. Von dort aus führt eine weitere Welle zu einem Generator (Wirkungsgrad = 70 %), der die kinetische Energie in Strom umwandelt.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": " Wie groß ist der Gesamtwirkungsgrad des Systems?",
            "image": false,
            "given": [
                { "letter": "η", "index": "Getriebe", "value": "0,99", "unit": "" },
                { "letter": "η", "index": "Generator", "value": "0,7", "unit": "" }

            ],
            "equations": [
                "η_gesamt = η⋅η"
            ],
            "solution": {
                "letter": "η",
                "index": "gesamt",
                "value": "0,693",
                "unit": "%",
                "unit_long": "Prozent",
                "equation": "η<sub>gesamt</sub> = η<sub>1</sub>⋅η<sub>12</sub>"
            },
            "alternative_solution_equations": [
                "η<sub>gesamt</sub> = η<sub>1</sub>/η<sub>12</sub>",
                "η<sub>gesamt</sub> = η<sub>1</sub>+η<sub>12</sub>"
            ],
            "units": {
                "correct": "%",
                "wrong": [
                    "N",
                    "J"
                ]
            },
            "correct_solution_phrase": "Der Gesamtwirkungsgrad des Systems beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Der Gesamtwirkungsgrad des Getriebes beträgt {{solution.value}} {{solution.unit}}.",
                "Der Gesamtwirkungsgrad des Generators beträgt {{solution.value}} {{solution.unit}}.",
                "Der Gesamtwirkungsgrad beträgt {{solution.value}} {{solution.unit}}.",
                "Der Gesamtwirkungsgrad des Systems beträgt 0,693%."
            ]
        },
        {
            "type": "tpla",
            "title": "b",
            "problem": "Der durch das Karussell erzeugte Strom soll genutzt werden um zwei 30 Watt Glühbirnen zum leuchten zu bringen. Ist das möglich? (Die Kinder stecken in 5 Minuten 29 kJ in das Karussell)",
            "image": false,
            "given": [
                { "letter": "E", "index": "Kinder", "value": "29", "unit": "kJ" },
                { "letter": "∆t", "index": "", "value": "300", "unit": "s" },
                { "letter": "η", "index": "gesamt", "value": "0,693", "unit": "" }

            ],
            "equations": [
                "η = E_ab/E_zu",
                "P = E/∆t",

            ],
            "solution": {
                "letter": "P",
                "index": "Kraussell",
                "value": "66,99",
                "unit": "W",
                "unit_long": "Watt",
                "equation": "P = [E<sub>zu</sub>⋅η]/[∆t]",
            },
            "alternative_solution_equations": [
                "P = [E<sub>ab</sub>⋅η]/[∆t]",
                "P = [E<sub>zu</sub>]/[∆t⋅η]",
                "P = [E<sub>ab</sub>]/[∆t⋅η]",
                "P = E<sub>zu</sub>⋅∆t⋅η"
            ],
            "units": {
                "correct": "J/s",
                "wrong": [
                   "J⋅s",
                   "s/J",
                ]
            },

            "correct_solution_phrase": "Die erzeugte Leistung reicht aus um die zwei Lampen zu betreiben.",
            "alternative_solution_phrases": [
                "Die erzeugte Leistung reicht nicht aus um die zwei Lampen zu betreiben.",
                "Die Lampen gehen kaputt, da zu viel Leistung erzeugt wird.",
                "Die Leistung reicht lediglich um eine Lampe zu betreiben.",
                "Die Leistung reicht nicht aus eine Lampe zu betreiben."
            ]
        }
    ]
};