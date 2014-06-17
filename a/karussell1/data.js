var d = {
    "block": "Das Karussell I",
    "blocktext": "In Ghana testet die Organisation Empower Playgrounds Inc. nun ob ein Karussell zur Strom Erzeugung genutzt werden kann. Für die Berechnungen geht man von folgender Situation aus: 4 Kinder schieben ein Karussell mit dem Radius 2m, mit jeweils 40 N und der Winkelgeschwindigkeit 0.3 Hz an. Aufgrund von Reibung und der Gewinnung von elektrischer Energie aus der Drehung wird das Karussell nicht schneller oder langsamer. Um eine Entscheidung zu treffen muss zunächste die Energie berechnet werden, die die Kinder in das Karussell einspeisen.",
    "subtasks": [
        {
            "type": "tpla",
            "title": "a",
            "problem": " Wie groß ist die Zentrifugalkraft für ein Kind, dass das Karussell anschiebt wenn es 30 kg wiegt?",
            "image": false,
            "given": [
                { "letter": "r", "index": "Karussell", "value": "2", "unit": "m" },
                { "letter": "ω", "index": "Karussell", "value": "0,3", "unit": "1/s" },
                { "letter": "m", "index": "Kind", "value": "30", "unit": "kg" }

            ],
            "equations": [
                "F_Z = m⋅r⋅ω²"
            ],
            "solution": {
                "letter": "F",
                "index": "Zentrifugal",
                "value": "18",
                "unit": "N",
                "unit_long": "Newton",
                "equation": "F_Z = m⋅r⋅ω²"
            },
            "alternative_solution_equations": [
                "F_Z = m⋅r²⋅ω²",
                "F_Z = m⋅r²"
            ],
            "units": {
                "correct": "kg*m*1/s",
                "wrong": [
                    "kg*m*s",
                    "kg*m²*1/s"
                ]
            },
            "correct_solution_phrase": "Die Zentrifugalkraft beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Zentripetalkraft beträgt {{solution.value}} {{solution.unit}}.",
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
                { "letter": "ω", "index": "Karussell", "value": "0,3", "unit": "1/s" },
                { "letter": "r", "index": "Karussell", "value": "2", "unit": "m" }

            ],
            "equations": [
                "P = F*v",
                "v = w*r"
            ],
            "solution": {
                "letter": "P",
                "index": "Karussell",
                "value": "96",
                "unit": "W",
                "unit_long": "Watt",
                "equation": "P = F*ω*r",
            },
            "alternative_solution_equations": [
                "P = F*ω*r*t",
                "P = F*ω*r*t²",
                "P = F*s*t",
                "P = F*ω*r²"
            ],
            "units": {
                "correct": "N*1/s*m",
                "wrong": [
                   "N*s*m",
                   "N*1/s",
                ]
            },

            "correct_solution_phrase": "Die Leistung beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Enrgie beträgt {{solution.value}} {{solution.unit}}.",
                "Die Energie die das zurückgelegt beträgt {{solution.value}} {{solution.unit}}.",
                "Die Leistung des Karussells beträgt {{solution.value}} {{solution.unit}}.",
                "Die gespeicherte leistung beträgt {{solution.value}} {{solution.unit}}."
            ]
        },
        {
            "type": "tpla",
            "title": "c",
            "problem": "Welche Energie, in kJ, müssen die Kinder aufwenden, wenn sie 5 min lang das Karussell anschieben?",
            "image": false,
            "given": [
                { "letter": "F", "index": "Kind", "value": "40", "unit": "N" },
                { "letter": "ω", "index": "Karussell", "value": "0,3", "unit": "1/s" },
                { "letter": "r", "index": "Karussell", "value": "2", "unit": "m" },
                { "letter": "t", "index": "", "value": "5", "unit": "min" },
            ],
            "equations": [
                "W = F*s",
                "ω = ∆φ/∆t",
                "φ = s/r",
            ],
            "solution": {
                "letter": "W",
                "index": "",
                "value": "29",
                "unit": "kJ",
                "unit_long": "Kilojoule",
                "equation": "W = F*ω*t*r",
            },
            "alternative_solution_equations": [
                "W = F*ω*t*r²",
                "W = F*ω*t/r",
                "W = F/ω*t*r",
                "W = F*ω*t²*r",
            ],
            "units": {
                "correct": "N*1/s*s*m",
                "wrong": [
                    "N*s/m",
                    "N/1/s*m"
                ]
            },

            "correct_solution_phrase": "Die Leistung die die Kinder in das Karussell stecken beträgt {{solution.value}} {{solution.unit}}.",
            "alternative_solution_phrases": [
                "Die Leistung die ein Kind in das Karussell steckt beträgt {{solution.value}} {{solution.unit}}.",
                "Die Leistung die die Kinder in 58 kJ an Leistung.",
                "Die Leistung die die Kinder in das Karusell stecken beträgt 58 kJ.",
                "{{solution.value}} {{solution.unit}} wird vom Karussell in 5 min erzeugt."
            ]
        }
    ]
};