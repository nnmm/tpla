var d = {
    "block": "Das Klettergerüst",
    "blocktext": "Ein 50 kg schwerer Junge klettert auf ein 2,0 m hohes Klettergerüst. Er lässt sich Zeit und benötigt für das Erklimmen der Spitze 10 Sekunden.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": "Welche durchschnittliche Leistung muss für das Klettern aufgewendet werden? Gib bitte auch die Erdbeschleunigung g = 9,81 m/s² als gegebene Größe an.",
            "image": false,
            "given": [
                { "letter": "∆t", "index": "", "value": "10", "unit": "s" },
                { "letter": "m",  "index": "Junge", "value": "50", "unit": "kg" },
                { "letter": "g",  "index": "", "value": "9,81", "unit": "m/s²" },
                { "letter": "∆h",  "index": "Klettergerüst", "value": "2,0", "unit": "m" }
            ],
            "equations": [
                "E = m⋅g⋅h",
                "P = E/∆t"
            ],
            "solution": {
                "letter": "P",
                "index": "Junge",
                "value": "98",
                "unit": "W",
                "unit_long": "Watt",
                "equation": "P = m⋅g⋅∆h/∆t"
            },
            "alternative_solution_equations": [
                "P = E/∆t",
                "P = m⋅g⋅h/∆t²",
                "E = ∆t/m⋅g⋅h",
                "E = ∆t⋅m⋅g⋅h"
            ],
            "units": {
                "correct": "[kg⋅m²/s²]/[s]",
                "wrong": [
                    "[kg⋅m²/s²]/[h]",
                    "[kg⋅m²]/[s]"
                ]
            },
            "correct_solution_phrase": "Der Junge wendet eine durchschnittliche Leistung von {{solution.value}} {{solution.unit}} auf.",
            "alternative_solution_phrases": [
                "Der Junge braucht eine Energie von {{solution.value}} {{solution.unit}}.",
                "Der Junge schafft es nicht auf das Klettergerüst.",
                "Der Junge hat eine Leistung von {{solution.value}} {{solution.unit}}.",
                "Der Junge generiert {{solution.value}} {{solution.unit}} an Energie."
            ]
        }
    ]
};