var d = {
    "block": "Der Klettergerüst",
    "blocktext": "Ein 50 kg schwerer Junge klettert auf ein 2m hohes Klettergerüst. Für das Erklimmen der Spitze benötigt er 10s.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": "Welche Leistung benötigt er dafür?",
            "image": false,
            "given": [
                { "letter": "∆t", "index": "", "value": "10", "unit": "s" },
                { "letter": "m",  "index": "Junge", "value": "50", "unit": "kg" },
                { "letter": "g",  "index": "", "value": "9,81", "unit": "m/s²" },
                { "letter": "∆h",  "index": "Klettergerüst", "value": "2", "unit": "m" }
            ],
            "equations": [
                "E = m⋅g⋅h",
                "P = E/∆t"
            ],
            "solution": {
                "letter": "P",
                "index": "Junge",
                "value": "98,1",
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
                "correct": "(kg⋅m²/s²)/s",
                "wrong": [
                    "(kg⋅m²/s²)/h",
                    "kg⋅m²/s"
                ]
            },
            "correct_solution_phrase": "Der Junge benötigt eine Leistung von {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Der Junge braucht eine Energie von {{solution.value}} {{solution.unit}}.",
                "Der Junge schafft es nicht auf das Klettergerüst",
                "Der Junge hat eine Leistung von {{solution.value}} {{solution.unit}}.",
                "Der Junge generiert {{solution.value}} {{solution.unit}} an Energie"
            ]
        }
    ]
};