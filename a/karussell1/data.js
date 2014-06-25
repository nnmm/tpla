var d = {
    "block": "Das Karussell I",
    "blocktext": "In Ghana testet die Organisation Empower Playgrounds Inc. nun, ob ein Karussell zur Stromerzeugung genutzt werden kann. Für die Berechnungen geht man von folgender Situation aus: Vier Kinder schieben ein Karussell mit dem Radius 2,0 m an, und zwar mit jeweils 40 N und der Winkelgeschwindigkeit 2,5 rad/s. Aufgrund von Reibung und der Gewinnung von elektrischer Energie aus der Drehung wird das Karussell nicht schneller oder langsamer. Um eine Entscheidung zu treffen muss zunächst die Energie berechnet werden, die die Kinder in das Karussell einspeisen.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": "Wie groß ist die Zentrifugalkraft für ein Kind mit einem Gewicht von 30 kg, welches zum Anschieben mit der genannten Geschwindigkeit um das Karussell herumläuft?",
            "image": false,
            "given": [
                { "letter": "r", "index": "Karussell", "value": "2,0", "unit": "m" },
                { "letter": "ω", "index": "Karussell", "value": "2,5", "unit": "rad/s" },
                { "letter": "m", "index": "Kind", "value": "30", "unit": "kg" }

            ],
            "equations": [
                "F_Z = m⋅r⋅ω²"
            ],
            "solution": {
                "letter": "F",
                "index": "Z",
                "value": "9,5",
                "unit": "N",
                "unit_long": "Newton",
                "equation": "F_Z = m⋅r⋅ω²"
            },
            "alternative_solution_equations": [
                "F_Z = m⋅r²⋅ω²",
                "F_Z = m⋅r²"
            ],
            "units": {
                "correct": "kg⋅m⋅(1/s)²",
                "wrong": [
                    "kg⋅m⋅s",
                    "kg⋅m²⋅1/s"
                ]
            },
            "correct_solution_phrase": "Die Zentrifugalkraft beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Zentripetalkraft beträgt {{solution.value}} kN.",
                "Die Zentrifugalkraft ist so groß, dass die Kinder aus dem Karussell fallen.",
                "Das Karussell hat einen zu großen Radius um es anzuschieben.",
                "Die Zentrifugalkraft beträgt {{solution.value}} kN."
            ]
        },
        {
            "type": "tpla",
            "title": "b",
            "problem": "Welche Leistung, zusammengenommen, fließt in Wärmeenergie und elektrische Energie?",
            "image": false,
            "given": [
                { "letter": "F", "index": "Kind", "value": "40", "unit": "N" },
                { "letter": "ω", "index": "Karussell", "value": "2,5", "unit": "rad/s" },
                { "letter": "r", "index": "Karussell", "value": "2,0", "unit": "m" }

            ],
            "equations": [
                "P = F⋅v",
                "v = ω⋅r"
            ],
            "solution": {
                "letter": "P",
                "index": "Karussell",
                "value": "800",
                "unit": "W",
                "unit_long": "Watt",
                "equation": "P = 4⋅F⋅ω⋅r",
            },
            "alternative_solution_equations": [
                "P = F⋅ω⋅r⋅t",
                "P = 4⋅F⋅ω⋅r⋅t²",
                "P = F⋅s⋅t",
                "P = 4⋅F⋅ω⋅r²"
            ],
            "units": {
                "correct": "N⋅1/s⋅m",
                "wrong": [
                   "N⋅s⋅m",
                   "N⋅1⋅s",
                ]
            },

            "correct_solution_phrase": "Die abgegebne Leistung beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Enrgie beträgt {{solution.value}} {{solution.unit}}.",
                "Die Energie die das zurückgelegt beträgt {{solution.value}} {{solution.unit}}.",
                "Die Leistung des Karussells beträgt {{solution.value}} kW.",
                "Die gespeicherte leistung beträgt {{solution.value}} {{solution.unit}}."
            ]
        },
        {
            "type": "tpla",
            "title": "c",
            "problem": "Welche Arbeit, in kJ, muss jedes der Kinder aufwenden, wenn sie 5 min lang das Karussell anschieben?",
            "image": false,
            "given": [
                { "letter": "F", "index": "Kind", "value": "40", "unit": "N" },
                { "letter": "ω", "index": "Karussell", "value": "2,5", "unit": "rad/s" },
                { "letter": "r", "index": "Karussell", "value": "2,0", "unit": "m" },
                { "letter": "t", "index": "", "value": "5", "unit": "min" },
            ],
            "equations": [
                "W = F⋅s",
                "ω = ∆φ/∆t",
                "φ = s/r",
            ],
            "solution": {
                "letter": "W",
                "index": "",
                "value": "60",
                "unit": "kJ",
                "unit_long": "Kilojoule",
                "equation": "W = F⋅ω⋅Δt⋅r",
            },
            "alternative_solution_equations": [
                "W = F⋅ω⋅Δt⋅r²",
                "W = F⋅ω⋅Δt/r",
                "W = F/ω⋅Δt⋅r",
                "W = F⋅ω⋅t²⋅r",
            ],
            "units": {
                "correct": "N⋅1/s⋅s⋅m",
                "wrong": [
                    "N⋅s/m",
                    "N/1/s⋅m"
                ]
            },

            "correct_solution_phrase": "Die Arbeit, die jedes der Kinder in 5 min in das Karussell steckt, beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Energie, die das Karussell von den Kindern erhält, beträgt {{solution.value}} {{solution.unit}}.",
                "Die Kinder bringen insgesamt {{solution.value}} {{solution.unit}} an Leistung auf.",
                "Die Arbeit, die die Kinder in das Karusell stecken, beträgt {{solution.value}} {{solution.unit}}.",
                "{{solution.value}} {{solution.unit}} wird vom Karussell in 5 min erzeugt." 
            ]
        }
    ]
};