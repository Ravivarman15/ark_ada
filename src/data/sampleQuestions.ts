import type { Question, Grade, Subject } from "@/types/assessment";

/**
 * ARK ADVANCED DIAGNOSTIC TEST SERIES
 * Grades 3-10 (Transition Tests)
 * 25 Questions per Grade: 8 Math (Sec A), 8 Science (Sec B), 5 English (Sec C), 4 Mental Ability (Sec D)
 * Common for all school boards, English medium only
 */

// ─── GRADE 3→4 ──────────────────────────────────────────────────────────────
const grade3Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g3-m-01", text: "What is 47 + 36?", type: "mcq", options: ["73", "83", "93", "63"], correctAnswer: "83", grade: 3, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g3-m-02", text: "What is 85 − 29?", type: "mcq", options: ["56", "66", "46", "76"], correctAnswer: "56", grade: 3, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g3-m-03", text: "Which number comes next: 5, 10, 15, 20, ___?", type: "mcq", options: ["22", "25", "30", "35"], correctAnswer: "25", grade: 3, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g3-m-04", text: "What is 6 × 7?", type: "mcq", options: ["36", "42", "48", "54"], correctAnswer: "42", grade: 3, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g3-m-05", text: "How many sides does a rectangle have?", type: "mcq", options: ["3", "4", "5", "6"], correctAnswer: "4", grade: 3, subject: "mathematics", skillCode: "M1", difficultyBand: "below", expectedTime: 30, section: "A" },
  { id: "g3-m-06", text: "What is half of 64?", type: "mcq", options: ["28", "32", "36", "42"], correctAnswer: "32", grade: 3, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g3-m-07", text: "Which fraction is the largest?", type: "mcq", options: ["1/2", "1/4", "1/3", "1/8"], correctAnswer: "1/2", grade: 3, subject: "mathematics", skillCode: "M1", difficultyBand: "above", expectedTime: 75, section: "A" },
  { id: "g3-m-08", text: "If there are 3 bags with 8 apples each, how many apples in total?", type: "mcq", options: ["11", "24", "18", "27"], correctAnswer: "24", grade: 3, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g3-s-09", text: "Which of the following is a living thing?", type: "mcq", options: ["Rock", "Water", "Plant", "Sand"], correctAnswer: "Plant", grade: 3, subject: "science", skillCode: "S1", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g3-s-10", text: "What do plants need to make their own food?", type: "mcq", options: ["Moonlight", "Sunlight", "Wind", "Soil only"], correctAnswer: "Sunlight", grade: 3, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g3-s-11", text: "Which organ pumps blood through the body?", type: "mcq", options: ["Lungs", "Brain", "Heart", "Stomach"], correctAnswer: "Heart", grade: 3, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g3-s-12", text: "What state of matter is ice?", type: "mcq", options: ["Gas", "Liquid", "Solid", "Plasma"], correctAnswer: "Solid", grade: 3, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g3-s-13", text: "Which animal lays eggs?", type: "mcq", options: ["Dog", "Cat", "Hen", "Cow"], correctAnswer: "Hen", grade: 3, subject: "science", skillCode: "S1", difficultyBand: "below", expectedTime: 30, section: "B" },
  { id: "g3-s-14", text: "What do we breathe in to stay alive?", type: "mcq", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correctAnswer: "Oxygen", grade: 3, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g3-s-15", text: "Which season comes after winter?", type: "mcq", options: ["Autumn", "Summer", "Spring", "Monsoon"], correctAnswer: "Spring", grade: 3, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g3-s-16", text: "What do roots of a plant mainly absorb?", type: "mcq", options: ["Sunlight", "Carbon dioxide", "Water and minerals", "Oxygen"], correctAnswer: "Water and minerals", grade: 3, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },

  // Section C: English (5 Questions)
  { id: "g3-e-17", text: "Which word is a noun?", type: "mcq", options: ["Run", "Happy", "School", "Quickly"], correctAnswer: "School", grade: 3, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g3-e-18", text: "Choose the correct sentence:", type: "mcq", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She gone to school every day."], correctAnswer: "She goes to school every day.", grade: 3, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g3-e-19", text: "What is the plural of 'child'?", type: "mcq", options: ["Childs", "Childes", "Children", "Childrens"], correctAnswer: "Children", grade: 3, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g3-e-20", text: "Antonym of 'hot' is:", type: "mcq", options: ["Warm", "Cool", "Cold", "Chilly"], correctAnswer: "Cold", grade: 3, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g3-e-21", text: "Choose the correct word: 'The dog ___ loudly.'", type: "mcq", options: ["barks", "bark", "barking", "barked"], correctAnswer: "barks", grade: 3, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g3-ma-22", text: "What comes next: Circle, Square, Triangle, Circle, Square, ___?", type: "mcq", options: ["Circle", "Square", "Triangle", "Rectangle"], correctAnswer: "Triangle", grade: 3, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
  { id: "g3-ma-23", text: "If Monday is the 1st day, what is the 5th day?", type: "mcq", options: ["Thursday", "Friday", "Wednesday", "Saturday"], correctAnswer: "Friday", grade: 3, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
  { id: "g3-ma-24", text: "Which number does not belong: 2, 4, 6, 9, 10?", type: "mcq", options: ["4", "6", "9", "10"], correctAnswer: "9", grade: 3, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
  { id: "g3-ma-25", text: "A pencil costs Rs 5. How many pencils can you buy with Rs 35?", type: "mcq", options: ["5", "6", "7", "8"], correctAnswer: "7", grade: 3, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "D" },
];

// ─── GRADE 4→5 ──────────────────────────────────────────────────────────────
const grade4Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  // FIX: original docx had duplicate option "623" — corrected to ["613", "623", "633", "643"]
  { id: "g4-m-01", text: "What is 348 + 275?", type: "mcq", options: ["613", "623", "633", "643"], correctAnswer: "623", grade: 4, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  // FIX: original docx had duplicate option "57" — corrected to ["57", "62", "72", "87"]
  { id: "g4-m-02", text: "Find the value: 9 × 8 − 15", type: "mcq", options: ["57", "62", "72", "87"], correctAnswer: "57", grade: 4, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g4-m-03", text: "Which is equivalent to 3/4?", type: "mcq", options: ["6/9", "9/12", "4/6", "2/3"], correctAnswer: "9/12", grade: 4, subject: "mathematics", skillCode: "M1", difficultyBand: "above", expectedTime: 75, section: "A" },
  { id: "g4-m-04", text: "What is the perimeter of a square with side 7 cm?", type: "mcq", options: ["14 cm", "21 cm", "28 cm", "49 cm"], correctAnswer: "28 cm", grade: 4, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g4-m-05", text: "Convert 250 cm into metres:", type: "mcq", options: ["2.5 m", "25 m", "0.25 m", "2500 m"], correctAnswer: "2.5 m", grade: 4, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g4-m-06", text: "Round 4,763 to the nearest hundred:", type: "mcq", options: ["4,700", "4,800", "4,760", "5,000"], correctAnswer: "4,800", grade: 4, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g4-m-07", text: "What is 504 ÷ 6?", type: "mcq", options: ["81", "84", "86", "88"], correctAnswer: "84", grade: 4, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g4-m-08", text: "What is the area of a rectangle 8 cm long and 5 cm wide?", type: "mcq", options: ["26 cm²", "40 cm²", "13 cm²", "45 cm²"], correctAnswer: "40 cm²", grade: 4, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g4-s-09", text: "Which planet is closest to the Sun?", type: "mcq", options: ["Venus", "Earth", "Mercury", "Mars"], correctAnswer: "Mercury", grade: 4, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g4-s-10", text: "What type of change is melting of ice?", type: "mcq", options: ["Chemical change", "Irreversible change", "Physical change", "Biological change"], correctAnswer: "Physical change", grade: 4, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g4-s-11", text: "The process by which plants make food using sunlight is called:", type: "mcq", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], correctAnswer: "Photosynthesis", grade: 4, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g4-s-12", text: "Which part of the plant makes seeds?", type: "mcq", options: ["Leaf", "Stem", "Root", "Flower"], correctAnswer: "Flower", grade: 4, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g4-s-13", text: "Sound travels fastest in:", type: "mcq", options: ["Air", "Vacuum", "Water", "Solid"], correctAnswer: "Solid", grade: 4, subject: "science", skillCode: "S3", difficultyBand: "above", expectedTime: 60, section: "B" },
  { id: "g4-s-14", text: "What is the full form of DNA?", type: "mcq", options: ["Deoxyribose Nucleic Acid", "Di-Nitrogen Acid", "Double Nucleic Agent", "None of these"], correctAnswer: "Deoxyribose Nucleic Acid", grade: 4, subject: "science", skillCode: "S5", difficultyBand: "above", expectedTime: 45, section: "B" },
  { id: "g4-s-15", text: "Which force keeps us on the ground?", type: "mcq", options: ["Friction", "Gravity", "Magnetism", "Tension"], correctAnswer: "Gravity", grade: 4, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g4-s-16", text: "Which gas do plants release during photosynthesis?", type: "mcq", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correctAnswer: "Oxygen", grade: 4, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 45, section: "B" },

  // Section C: English (5 Questions)
  { id: "g4-e-17", text: "Identify the verb in: 'The birds sing sweetly.'", type: "mcq", options: ["birds", "sing", "sweetly", "The"], correctAnswer: "sing", grade: 4, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g4-e-18", text: "Which sentence is in simple past tense?", type: "mcq", options: ["She plays cricket.", "She will play cricket.", "She played cricket.", "She is playing cricket."], correctAnswer: "She played cricket.", grade: 4, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g4-e-19", text: "Synonym of 'happy':", type: "mcq", options: ["Sad", "Angry", "Joyful", "Bored"], correctAnswer: "Joyful", grade: 4, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g4-e-20", text: "Choose the correct sentence:", type: "mcq", options: ["He don't like mangoes.", "He doesn't likes mangoes.", "He doesn't like mangoes.", "He not likes mangoes."], correctAnswer: "He doesn't like mangoes.", grade: 4, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g4-e-21", text: "What punctuation ends a question?", type: "mcq", options: [".", "!", "?", ","], correctAnswer: "?", grade: 4, subject: "english", skillCode: "E3", difficultyBand: "below", expectedTime: 30, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g4-ma-22", text: "Find the odd one out: Apple, Mango, Carrot, Banana", type: "mcq", options: ["Apple", "Mango", "Carrot", "Banana"], correctAnswer: "Carrot", grade: 4, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 45, section: "D" },
  { id: "g4-ma-23", text: "If 5 pens cost Rs 25, how much do 8 pens cost?", type: "mcq", options: ["Rs 35", "Rs 40", "Rs 45", "Rs 50"], correctAnswer: "Rs 40", grade: 4, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g4-ma-24", text: "Next number: 2, 5, 10, 17, 26, ___", type: "mcq", options: ["35", "37", "38", "40"], correctAnswer: "37", grade: 4, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g4-ma-25", text: "A clock shows 3:00. What angle do the hands make?", type: "mcq", options: ["180°", "90°", "45°", "120°"], correctAnswer: "90°", grade: 4, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 75, section: "D" },
];

// ─── GRADE 5→6 ──────────────────────────────────────────────────────────────
const grade5Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g5-m-01", text: "Find LCM of 8 and 12:", type: "mcq", options: ["24", "48", "12", "96"], correctAnswer: "24", grade: 5, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g5-m-02", text: "What is 15% of 200?", type: "mcq", options: ["25", "30", "35", "45"], correctAnswer: "30", grade: 5, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g5-m-03", text: "Simplify: 3/4 + 1/2", type: "mcq", options: ["4/6", "5/4", "1", "7/4"], correctAnswer: "5/4", grade: 5, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g5-m-04", text: "What is the value of 2³?", type: "mcq", options: ["6", "8", "9", "12"], correctAnswer: "8", grade: 5, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g5-m-05", text: "If a = 5, find 3a − 4:", type: "mcq", options: ["9", "11", "13", "15"], correctAnswer: "11", grade: 5, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 60, section: "A" },
  { id: "g5-m-06", text: "What is the HCF of 18 and 24?", type: "mcq", options: ["4", "6", "8", "12"], correctAnswer: "6", grade: 5, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g5-m-07", text: "A ratio of 2:3 means for every 2 parts there are ___ parts.", type: "mcq", options: ["2", "3", "5", "6"], correctAnswer: "3", grade: 5, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g5-m-08", text: "The average of 10, 20, 30 is:", type: "mcq", options: ["10", "20", "30", "60"], correctAnswer: "20", grade: 5, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g5-s-09", text: "Which is NOT a renewable energy source?", type: "mcq", options: ["Solar", "Wind", "Coal", "Hydro"], correctAnswer: "Coal", grade: 5, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g5-s-10", text: "The boiling point of water is:", type: "mcq", options: ["0°C", "50°C", "100°C", "212°F only"], correctAnswer: "100°C", grade: 5, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g5-s-11", text: "Rusting is an example of:", type: "mcq", options: ["Physical change", "Chemical change", "Reversible change", "No change"], correctAnswer: "Chemical change", grade: 5, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g5-s-12", text: "Which is the largest organ in the human body?", type: "mcq", options: ["Liver", "Brain", "Skin", "Lungs"], correctAnswer: "Skin", grade: 5, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g5-s-13", text: "The basic unit of life is:", type: "mcq", options: ["Tissue", "Organ", "Cell", "Molecule"], correctAnswer: "Cell", grade: 5, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g5-s-14", text: "Light travels at approximately:", type: "mcq", options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correctAnswer: "3 × 10⁸ m/s", grade: 5, subject: "science", skillCode: "S5", difficultyBand: "above", expectedTime: 45, section: "B" },
  { id: "g5-s-15", text: "Which planet has rings around it?", type: "mcq", options: ["Mars", "Jupiter", "Saturn", "Uranus only"], correctAnswer: "Saturn", grade: 5, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g5-s-16", text: "What is the chemical formula of water?", type: "mcq", options: ["H₂O₂", "HO", "H₂O", "H₃O"], correctAnswer: "H₂O", grade: 5, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },

  // Section C: English (5 Questions)
  { id: "g5-e-17", text: "Identify the adverb in: 'She runs quickly.'", type: "mcq", options: ["She", "runs", "quickly", "None"], correctAnswer: "quickly", grade: 5, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g5-e-18", text: "Which is the correct spelling?", type: "mcq", options: ["Recieve", "Receive", "Recive", "Receeve"], correctAnswer: "Receive", grade: 5, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g5-e-19", text: "Passive voice of: 'Tom wrote the letter.'", type: "mcq", options: ["The letter was written by Tom.", "The letter is written by Tom.", "The letter wrote Tom.", "Tom is written by the letter."], correctAnswer: "The letter was written by Tom.", grade: 5, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 60, section: "C" },
  { id: "g5-e-20", text: "Choose the correct article: '___ apple a day keeps the doctor away.'", type: "mcq", options: ["A", "An", "The", "No article"], correctAnswer: "An", grade: 5, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g5-e-21", text: "Synonym of 'enormous':", type: "mcq", options: ["Tiny", "Huge", "Medium", "Light"], correctAnswer: "Huge", grade: 5, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },

  // Section D: Mental Ability (4 Questions)
  // NOTE: APPLE = A(1)+P(16)+P(16)+L(12)+E(5) = 50. Options corrected from docx (which omitted "48").
  { id: "g5-ma-22", text: "If MANGO = 13+1+14+7+15 = 50, what does APPLE equal? (A=1, P=16, L=12, E=5)", type: "mcq", options: ["48", "50", "51", "57"], correctAnswer: "50", grade: 5, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g5-ma-23", text: "A shopkeeper bought 50 pens at Rs 4 each and sold at Rs 6 each. Profit = ?", type: "mcq", options: ["Rs 50", "Rs 100", "Rs 150", "Rs 200"], correctAnswer: "Rs 100", grade: 5, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g5-ma-24", text: "Complete: 1, 4, 9, 16, 25, ___", type: "mcq", options: ["36", "30", "49", "64"], correctAnswer: "36", grade: 5, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
  { id: "g5-ma-25", text: "If TODAY = SUNDAY, what is 3 days later?", type: "mcq", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correctAnswer: "Wednesday", grade: 5, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 45, section: "D" },
];

// ─── GRADE 6→7 ──────────────────────────────────────────────────────────────
const grade6Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g6-m-01", text: "Solve: 3x + 7 = 22", type: "mcq", options: ["3", "5", "7", "9"], correctAnswer: "5", grade: 6, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g6-m-02", text: "What is (−3) × (−4)?", type: "mcq", options: ["−12", "12", "−7", "7"], correctAnswer: "12", grade: 6, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g6-m-03", text: "Find the perimeter of an equilateral triangle with side 9 cm:", type: "mcq", options: ["18 cm", "27 cm", "36 cm", "81 cm"], correctAnswer: "27 cm", grade: 6, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g6-m-04", text: "Express as percentage: 3/5 = ?", type: "mcq", options: ["35%", "50%", "60%", "75%"], correctAnswer: "60%", grade: 6, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g6-m-05", text: "What is the square root of 169?", type: "mcq", options: ["11", "12", "13", "14"], correctAnswer: "13", grade: 6, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g6-m-06", text: "Find simple interest: P = Rs 1000, R = 5%, T = 2 years", type: "mcq", options: ["Rs 50", "Rs 100", "Rs 150", "Rs 200"], correctAnswer: "Rs 100", grade: 6, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 90, section: "A" },
  { id: "g6-m-07", text: "Angle sum of a triangle is:", type: "mcq", options: ["90°", "180°", "270°", "360°"], correctAnswer: "180°", grade: 6, subject: "mathematics", skillCode: "M1", difficultyBand: "below", expectedTime: 30, section: "A" },
  { id: "g6-m-08", text: "What is 0.75 as a fraction?", type: "mcq", options: ["1/4", "3/5", "3/4", "5/8"], correctAnswer: "3/4", grade: 6, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g6-s-09", text: "Which type of reproduction involves only one parent?", type: "mcq", options: ["Sexual", "Asexual", "Both", "None"], correctAnswer: "Asexual", grade: 6, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g6-s-10", text: "The process by which water vapor turns to liquid is:", type: "mcq", options: ["Evaporation", "Condensation", "Sublimation", "Precipitation"], correctAnswer: "Condensation", grade: 6, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g6-s-11", text: "Newton's 1st law is also called:", type: "mcq", options: ["Law of Acceleration", "Law of Inertia", "Law of Action-Reaction", "Law of Gravity"], correctAnswer: "Law of Inertia", grade: 6, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g6-s-12", text: "Which metal is liquid at room temperature?", type: "mcq", options: ["Iron", "Gold", "Mercury", "Copper"], correctAnswer: "Mercury", grade: 6, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g6-s-13", text: "What type of lens is used in magnifying glass?", type: "mcq", options: ["Concave", "Flat", "Convex", "Prism"], correctAnswer: "Convex", grade: 6, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g6-s-14", text: "The SI unit of force is:", type: "mcq", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: "Newton", grade: 6, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g6-s-15", text: "Which gas is used in fire extinguishers?", type: "mcq", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], correctAnswer: "Carbon dioxide", grade: 6, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g6-s-16", text: "Photosynthesis occurs in which part of the cell?", type: "mcq", options: ["Mitochondria", "Chloroplast", "Ribosome", "Nucleus"], correctAnswer: "Chloroplast", grade: 6, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },

  // Section C: English (5 Questions)
  { id: "g6-e-17", text: "Identify the type: 'Although it was raining, we played outside.'", type: "mcq", options: ["Simple sentence", "Compound sentence", "Complex sentence", "Exclamatory sentence"], correctAnswer: "Complex sentence", grade: 6, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g6-e-18", text: "Which word is a conjunction?", type: "mcq", options: ["Quickly", "Beautiful", "Although", "Run"], correctAnswer: "Although", grade: 6, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g6-e-19", text: "Antonym of 'ancient':", type: "mcq", options: ["Old", "Modern", "Classic", "Antique"], correctAnswer: "Modern", grade: 6, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g6-e-20", text: "Direct speech: She said, 'I am tired.' Indirect speech:", type: "mcq", options: ["She said that she is tired.", "She said that she was tired.", "She says she was tired.", "She told she is tired."], correctAnswer: "She said that she was tired.", grade: 6, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 60, section: "C" },
  { id: "g6-e-21", text: "Choose correct: 'Neither Ram nor Shyam ___ present.'", type: "mcq", options: ["are", "were", "was", "is"], correctAnswer: "was", grade: 6, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 60, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g6-ma-22", text: "Series: 2, 3, 5, 8, 13, 21, ___", type: "mcq", options: ["29", "32", "34", "36"], correctAnswer: "34", grade: 6, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g6-ma-23", text: "If in a code language PEN = 123, then MAP = ?", type: "mcq", options: ["456", "789", "138", "Cannot determine"], correctAnswer: "Cannot determine", grade: 6, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g6-ma-24", text: "A car travels 60 km in 1 hour. How long to cover 210 km at same speed?", type: "mcq", options: ["3 hrs", "3.5 hrs", "4 hrs", "4.5 hrs"], correctAnswer: "3.5 hrs", grade: 6, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g6-ma-25", text: "Pointing to a photo, Ram says, 'She is my mother's only son's wife.' Who is in the photo?", type: "mcq", options: ["Ram's sister", "Ram's wife", "Ram's aunt", "Ram's mother"], correctAnswer: "Ram's wife", grade: 6, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
];

// ─── GRADE 7→8 ──────────────────────────────────────────────────────────────
const grade7Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g7-m-01", text: "Factorize: x² − 9", type: "mcq", options: ["(x+3)(x−3)", "(x+9)(x−1)", "(x−3)²", "(x+3)²"], correctAnswer: "(x+3)(x−3)", grade: 7, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g7-m-02", text: "Solve: 2x/3 = 8", type: "mcq", options: ["6", "10", "12", "16"], correctAnswer: "12", grade: 7, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g7-m-03", text: "What is the volume of a cube with side 5 cm?", type: "mcq", options: ["25 cm³", "75 cm³", "100 cm³", "125 cm³"], correctAnswer: "125 cm³", grade: 7, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g7-m-04", text: "If the ratio of boys to girls is 3:4 and total students = 35, how many boys?", type: "mcq", options: ["12", "15", "20", "21"], correctAnswer: "15", grade: 7, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g7-m-05", text: "Find the mean: 4, 8, 6, 10, 12", type: "mcq", options: ["7", "8", "9", "10"], correctAnswer: "8", grade: 7, subject: "mathematics", skillCode: "M5", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g7-m-06", text: "What is the sum of angles in a quadrilateral?", type: "mcq", options: ["180°", "270°", "360°", "540°"], correctAnswer: "360°", grade: 7, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 30, section: "A" },
  { id: "g7-m-07", text: "Expand: (a + b)²", type: "mcq", options: ["a² + b²", "a² + ab + b²", "a² + 2ab + b²", "2a² + 2b²"], correctAnswer: "a² + 2ab + b²", grade: 7, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g7-m-08", text: "What is 12.5% expressed as a decimal?", type: "mcq", options: ["0.0125", "0.125", "1.25", "12.5"], correctAnswer: "0.125", grade: 7, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g7-s-09", text: "Which type of mirror is used in vehicle rear-view mirrors?", type: "mcq", options: ["Concave", "Plane", "Convex", "Parabolic"], correctAnswer: "Convex", grade: 7, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g7-s-10", text: "What is the formula for speed?", type: "mcq", options: ["Speed = Force / Time", "Speed = Distance / Time", "Speed = Mass × Velocity", "Speed = Work / Distance"], correctAnswer: "Speed = Distance / Time", grade: 7, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g7-s-11", text: "Which part of the eye controls the amount of light entering?", type: "mcq", options: ["Cornea", "Retina", "Iris", "Lens"], correctAnswer: "Iris", grade: 7, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g7-s-12", text: "Sound cannot travel through:", type: "mcq", options: ["Air", "Water", "Vacuum", "Solids"], correctAnswer: "Vacuum", grade: 7, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g7-s-13", text: "Which acid is found in a car battery?", type: "mcq", options: ["Nitric acid", "Hydrochloric acid", "Sulphuric acid", "Acetic acid"], correctAnswer: "Sulphuric acid", grade: 7, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g7-s-14", text: "The number of chromosomes in a human cell is:", type: "mcq", options: ["23", "44", "46", "48"], correctAnswer: "46", grade: 7, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g7-s-15", text: "Electric resistance is measured in:", type: "mcq", options: ["Volt", "Ampere", "Watt", "Ohm"], correctAnswer: "Ohm", grade: 7, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g7-s-16", text: "Which vitamin is produced by skin in sunlight?", type: "mcq", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correctAnswer: "Vitamin D", grade: 7, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },

  // Section C: English (5 Questions)
  { id: "g7-e-17", text: "Identify the figure of speech: 'The wind whispered through the trees.'", type: "mcq", options: ["Simile", "Metaphor", "Personification", "Alliteration"], correctAnswer: "Personification", grade: 7, subject: "english", skillCode: "E4", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g7-e-18", text: "Which is the correct form? 'I wish I ___ a bird.'", type: "mcq", options: ["am", "was", "were", "will be"], correctAnswer: "were", grade: 7, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 60, section: "C" },
  { id: "g7-e-19", text: "Choose the correct sentence:", type: "mcq", options: ["Each of the boys have done his work.", "Each of the boys has done his work.", "Each of the boys have done their work.", "Each of the boys done their work."], correctAnswer: "Each of the boys has done his work.", grade: 7, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g7-e-20", text: "What is the meaning of the idiom 'hit the nail on the head'?", type: "mcq", options: ["To hammer something", "To be exactly right", "To miss the point", "To injure oneself"], correctAnswer: "To be exactly right", grade: 7, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g7-e-21", text: "The word 'beautiful' is a/an:", type: "mcq", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: "Adjective", grade: 7, subject: "english", skillCode: "E3", difficultyBand: "below", expectedTime: 30, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g7-ma-22", text: "Find the missing number: 8 : 64 :: 5 : ___", type: "mcq", options: ["15", "25", "35", "45"], correctAnswer: "25", grade: 7, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
  { id: "g7-ma-23", text: "If all PENS are BOOKS and all BOOKS are BAGS, then all PENS are:", type: "mcq", options: ["Not bags", "Bags", "Only books", "Cannot determine"], correctAnswer: "Bags", grade: 7, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g7-ma-24", text: "A trader marks goods at 20% above cost. If sold at 10% discount, profit% is:", type: "mcq", options: ["8%", "10%", "12%", "5%"], correctAnswer: "8%", grade: 7, subject: "mathematics", skillCode: "M3", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g7-ma-25", text: "If CLOCK is coded as KCOLC, how is STONE coded?", type: "mcq", options: ["ENOTS", "SNOTE", "NOTES", "ETNOS"], correctAnswer: "ENOTS", grade: 7, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
];

// ─── GRADE 8→9 ──────────────────────────────────────────────────────────────
const grade8Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g8-m-01", text: "Solve: x² − 5x + 6 = 0", type: "mcq", options: ["x = 1, 6", "x = 2, 3", "x = −2, −3", "x = 3, 4"], correctAnswer: "x = 2, 3", grade: 8, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 90, section: "A" },
  { id: "g8-m-02", text: "Find the slope of line passing through (2,3) and (4,7):", type: "mcq", options: ["1", "2", "3", "4"], correctAnswer: "2", grade: 8, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g8-m-03", text: "What is the probability of drawing an ace from a standard deck of 52 cards?", type: "mcq", options: ["1/13", "1/26", "4/52", "Both A and C"], correctAnswer: "Both A and C", grade: 8, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g8-m-04", text: "Simplify: (a²b³) × (a³b²)", type: "mcq", options: ["a⁵b⁵", "a⁶b⁶", "a⁵b⁶", "a⁶b⁵"], correctAnswer: "a⁵b⁵", grade: 8, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g8-m-05", text: "The surface area of a sphere of radius 7 cm (π = 22/7):", type: "mcq", options: ["616 cm²", "154 cm²", "308 cm²", "462 cm²"], correctAnswer: "616 cm²", grade: 8, subject: "mathematics", skillCode: "M3", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g8-m-06", text: "Which of these is an irrational number?", type: "mcq", options: ["√9", "√16", "√2", "4/5"], correctAnswer: "√2", grade: 8, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g8-m-07", text: "In a right triangle, if one angle is 30°, the other acute angle is:", type: "mcq", options: ["30°", "45°", "60°", "90°"], correctAnswer: "60°", grade: 8, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g8-m-08", text: "If 2^x = 16, then x = ?", type: "mcq", options: ["2", "4", "6", "8"], correctAnswer: "4", grade: 8, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 45, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g8-s-09", text: "Ohm's law states: V = ?", type: "mcq", options: ["V = I / R", "V = I × R", "V = R / I", "V = P × I"], correctAnswer: "V = I × R", grade: 8, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g8-s-10", text: "Which of the following is NOT a fossil fuel?", type: "mcq", options: ["Coal", "Natural gas", "Petroleum", "Wood"], correctAnswer: "Wood", grade: 8, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g8-s-11", text: "What is the angle of incidence equal to in the law of reflection?", type: "mcq", options: ["Angle of refraction", "Angle of reflection", "Angle of deviation", "Critical angle"], correctAnswer: "Angle of reflection", grade: 8, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g8-s-12", text: "The symbol for sodium in the periodic table is:", type: "mcq", options: ["So", "Sd", "Na", "Sm"], correctAnswer: "Na", grade: 8, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g8-s-13", text: "Which part of the brain controls balance?", type: "mcq", options: ["Cerebrum", "Medulla oblongata", "Cerebellum", "Hypothalamus"], correctAnswer: "Cerebellum", grade: 8, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g8-s-14", text: "What is Newton's 3rd law?", type: "mcq", options: ["F = ma", "Every action has an equal and opposite reaction", "An object at rest stays at rest", "Force equals mass times velocity"], correctAnswer: "Every action has an equal and opposite reaction", grade: 8, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g8-s-15", text: "Which element has the highest electronegativity?", type: "mcq", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], correctAnswer: "Fluorine", grade: 8, subject: "science", skillCode: "S5", difficultyBand: "above", expectedTime: 45, section: "B" },
  { id: "g8-s-16", text: "The pH value of blood is approximately:", type: "mcq", options: ["5.5", "6.5", "7.4", "8.5"], correctAnswer: "7.4", grade: 8, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },

  // Section C: English (5 Questions)
  { id: "g8-e-17", text: "Identify the type of clause: 'When the rain stopped, we went outside.'", type: "mcq", options: ["Noun clause", "Adjectival clause", "Adverbial clause", "Independent clause only"], correctAnswer: "Adverbial clause", grade: 8, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g8-e-18", text: "Which word correctly completes: 'The team ___ decided to continue.'", type: "mcq", options: ["have", "were", "has", "are"], correctAnswer: "has", grade: 8, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g8-e-19", text: "'A blessing in disguise' means:", type: "mcq", options: ["A hidden curse", "Something good that seemed bad at first", "A disguised person", "A religious event"], correctAnswer: "Something good that seemed bad at first", grade: 8, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g8-e-20", text: "Choose the sentence with correct subject-verb agreement:", type: "mcq", options: ["The news are shocking.", "The news is shocking.", "The news were shocking.", "The news be shocking."], correctAnswer: "The news is shocking.", grade: 8, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g8-e-21", text: "Identify the tense: 'By next year, she will have graduated.'", type: "mcq", options: ["Future simple", "Future perfect", "Future continuous", "Present perfect"], correctAnswer: "Future perfect", grade: 8, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 60, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g8-ma-22", text: "A is B's brother. B is C's sister. C is D's father. How is A related to D?", type: "mcq", options: ["Uncle", "Father", "Brother", "Grandfather"], correctAnswer: "Uncle", grade: 8, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g8-ma-23", text: "Water flows into a tank in 6 hrs, out in 12 hrs. Time to fill if both open:", type: "mcq", options: ["6 hrs", "10 hrs", "12 hrs", "18 hrs"], correctAnswer: "12 hrs", grade: 8, subject: "mathematics", skillCode: "M3", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g8-ma-24", text: "Find the missing: 100, 95, 85, 70, 50, ___", type: "mcq", options: ["25", "30", "20", "35"], correctAnswer: "25", grade: 8, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g8-ma-25", text: "If 4 workers build a wall in 10 days, how many days for 5 workers?", type: "mcq", options: ["6", "8", "10", "12"], correctAnswer: "8", grade: 8, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "D" },
];

// ─── GRADE 9→10 ──────────────────────────────────────────────────────────────
const grade9Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g9-m-01", text: "Solve for x: 3x − 5 = 2x + 1", type: "mcq", options: ["4", "5", "6", "7"], correctAnswer: "6", grade: 9, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g9-m-02", text: "If f(x) = 2x + 3, find f(4)", type: "mcq", options: ["5", "7", "9", "11"], correctAnswer: "11", grade: 9, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g9-m-03", text: "If roots of equation x² − 7x + k = 0 are equal, find k.", type: "mcq", options: ["10", "12.25", "14", "49"], correctAnswer: "12.25", grade: 9, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g9-m-04", text: "Find the area of a triangle with base 12 cm and height 9 cm.", type: "mcq", options: ["54 cm²", "108 cm²", "48 cm²", "72 cm²"], correctAnswer: "54 cm²", grade: 9, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g9-m-05", text: "Rationalise denominator: 1/(√3 − 1)", type: "mcq", options: ["(√3 + 1)/2", "(√3 − 1)/2", "(√3)/2", "(1 − √3)/4"], correctAnswer: "(√3 + 1)/2", grade: 9, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g9-m-06", text: "If sin θ = 3/5, find cos θ (acute angle).", type: "mcq", options: ["4/5", "3/4", "5/4", "2/5"], correctAnswer: "4/5", grade: 9, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g9-m-07", text: "Probability of getting at least one head when tossing a fair coin twice:", type: "mcq", options: ["1/4", "1/2", "3/4", "1"], correctAnswer: "3/4", grade: 9, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g9-m-08", text: "Sum of first 20 natural numbers:", type: "mcq", options: ["190", "200", "210", "220"], correctAnswer: "210", grade: 9, subject: "mathematics", skillCode: "M5", difficultyBand: "at", expectedTime: 60, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g9-s-09", text: "Acceleration is defined as:", type: "mcq", options: ["Rate of change of velocity", "Rate of change of distance", "Force per unit area", "Work done per unit time"], correctAnswer: "Rate of change of velocity", grade: 9, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g9-s-10", text: "Which cell organelle is called powerhouse of the cell?", type: "mcq", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], correctAnswer: "Mitochondria", grade: 9, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g9-s-11", text: "When magnesium burns in oxygen, it forms:", type: "mcq", options: ["MgO", "MgCO₃", "MgSO₄", "MgCl₂"], correctAnswer: "MgO", grade: 9, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g9-s-12", text: "Unit of electric current:", type: "mcq", options: ["Volt", "Ampere", "Ohm", "Watt"], correctAnswer: "Ampere", grade: 9, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g9-s-13", text: "The pH of acidic solution is:", type: "mcq", options: ["7", "More than 7", "Less than 7", "Exactly 14"], correctAnswer: "Less than 7", grade: 9, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g9-s-14", text: "Velocity-time graph slope gives:", type: "mcq", options: ["Distance", "Acceleration", "Speed", "Force"], correctAnswer: "Acceleration", grade: 9, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g9-s-15", text: "Genetic material in human cells:", type: "mcq", options: ["RNA only", "DNA only", "Protein", "Lipid"], correctAnswer: "DNA only", grade: 9, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g9-s-16", text: "Ozone layer protects from:", type: "mcq", options: ["Infrared rays", "UV rays", "X-rays", "Gamma rays"], correctAnswer: "UV rays", grade: 9, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 30, section: "B" },

  // Section C: English (5 Questions)
  { id: "g9-e-17", text: "Identify tense: 'She has been working since morning.'", type: "mcq", options: ["Present perfect", "Present perfect continuous", "Past continuous", "Future perfect"], correctAnswer: "Present perfect continuous", grade: 9, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g9-e-18", text: "Antonym of 'Scarce':", type: "mcq", options: ["Rare", "Plenty", "Limited", "Small"], correctAnswer: "Plenty", grade: 9, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g9-e-19", text: "Passive voice of: 'They are building a bridge.'", type: "mcq", options: ["A bridge is built.", "A bridge is being built.", "A bridge was built.", "A bridge has built."], correctAnswer: "A bridge is being built.", grade: 9, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g9-e-20", text: "Identify the adjective: 'She wore a beautiful dress.'", type: "mcq", options: ["She", "Wore", "Beautiful", "Dress"], correctAnswer: "Beautiful", grade: 9, subject: "english", skillCode: "E3", difficultyBand: "below", expectedTime: 30, section: "C" },
  { id: "g9-e-21", text: "Choose correct preposition: 'He is good ___ mathematics.'", type: "mcq", options: ["In", "At", "On", "Over"], correctAnswer: "At", grade: 9, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 30, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g9-ma-22", text: "Next term: 3, 9, 27, 81, ___", type: "mcq", options: ["162", "243", "324", "729"], correctAnswer: "243", grade: 9, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 45, section: "D" },
  { id: "g9-ma-23", text: "If CAT = 24, DOG = 26, then BAT = ?", type: "mcq", options: ["21", "23", "25", "27"], correctAnswer: "23", grade: 9, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g9-ma-24", text: "A train 120 m long passes a pole in 6 sec. Speed = ?", type: "mcq", options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"], correctAnswer: "20 m/s", grade: 9, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "D" },
  { id: "g9-ma-25", text: "If SOUTH = HTUOS, then NORTH = ?", type: "mcq", options: ["HTRON", "HTRNO", "HTORN", "HTONR"], correctAnswer: "HTRON", grade: 9, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "D" },
];

// ─── GRADE 10 (Standalone — not in source docx, extended series) ─────────────
const grade10Questions: Question[] = [
  // Section A: Mathematics (8 Questions)
  { id: "g10-m-01", text: "If α and β are roots of 2x² − 5x + 3 = 0, find α + β:", type: "mcq", options: ["3/2", "5/2", "5", "3"], correctAnswer: "5/2", grade: 10, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 90, section: "A" },
  { id: "g10-m-02", text: "The distance between points (−3, 4) and (3, −4) is:", type: "mcq", options: ["8", "10", "12", "14"], correctAnswer: "10", grade: 10, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g10-m-03", text: "If tan θ = 1, find θ (acute angle):", type: "mcq", options: ["30°", "45°", "60°", "90°"], correctAnswer: "45°", grade: 10, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 45, section: "A" },
  { id: "g10-m-04", text: "Volume of a cylinder with radius 7 cm and height 10 cm (π = 22/7):", type: "mcq", options: ["1540 cm³", "440 cm³", "770 cm³", "2200 cm³"], correctAnswer: "1540 cm³", grade: 10, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 90, section: "A" },
  { id: "g10-m-05", text: "Arithmetic progression: 3, 7, 11, … Find the 15th term:", type: "mcq", options: ["55", "59", "63", "67"], correctAnswer: "59", grade: 10, subject: "mathematics", skillCode: "M5", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g10-m-06", text: "The median of: 3, 7, 2, 9, 5, 11, 4 (sorted) is:", type: "mcq", options: ["5", "6", "7", "9"], correctAnswer: "5", grade: 10, subject: "mathematics", skillCode: "M5", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g10-m-07", text: "Simplify: (sin²θ + cos²θ) × sec²θ", type: "mcq", options: ["1", "sec²θ", "tan²θ", "cosec²θ"], correctAnswer: "sec²θ", grade: 10, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g10-m-08", text: "A bag has 5 red and 3 blue balls. Probability of picking a red ball:", type: "mcq", options: ["3/8", "5/3", "5/8", "3/5"], correctAnswer: "5/8", grade: 10, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "A" },

  // Section B: Science (8 Questions)
  { id: "g10-s-09", text: "Which type of bond involves sharing of electron pairs?", type: "mcq", options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], correctAnswer: "Covalent bond", grade: 10, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g10-s-10", text: "The unit of power is:", type: "mcq", options: ["Joule", "Newton", "Watt", "Pascal"], correctAnswer: "Watt", grade: 10, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g10-s-11", text: "Which law states that the pressure of a gas is inversely proportional to its volume at constant temperature?", type: "mcq", options: ["Charles' law", "Avogadro's law", "Boyle's law", "Dalton's law"], correctAnswer: "Boyle's law", grade: 10, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g10-s-12", text: "Which organelle is responsible for protein synthesis?", type: "mcq", options: ["Mitochondria", "Chloroplast", "Ribosome", "Vacuole"], correctAnswer: "Ribosome", grade: 10, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g10-s-13", text: "The atomic number of Carbon is:", type: "mcq", options: ["4", "6", "8", "12"], correctAnswer: "6", grade: 10, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g10-s-14", text: "Refraction of light occurs because light changes its:", type: "mcq", options: ["Frequency", "Amplitude", "Speed", "Wavelength only"], correctAnswer: "Speed", grade: 10, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g10-s-15", text: "Which of the following is responsible for carrying oxygen in blood?", type: "mcq", options: ["WBC", "Plasma", "Platelets", "RBC"], correctAnswer: "RBC", grade: 10, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },
  { id: "g10-s-16", text: "Electric power is given by:", type: "mcq", options: ["P = V / I", "P = V × I", "P = I / R", "P = V × R"], correctAnswer: "P = V × I", grade: 10, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 30, section: "B" },

  // Section C: English (5 Questions)
  { id: "g10-e-17", text: "Identify the rhetorical device: 'Can we really afford to ignore climate change?'", type: "mcq", options: ["Hyperbole", "Rhetorical question", "Alliteration", "Oxymoron"], correctAnswer: "Rhetorical question", grade: 10, subject: "english", skillCode: "E4", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g10-e-18", text: "Choose the grammatically correct sentence:", type: "mcq", options: ["Scarcely had he left when it began to rain.", "Scarcely he had left when it began to rain.", "Scarcely had he left than it began to rain.", "Scarcely he had left that it began to rain."], correctAnswer: "Scarcely had he left when it began to rain.", grade: 10, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 75, section: "C" },
  { id: "g10-e-19", text: "The word 'melancholy' means:", type: "mcq", options: ["Joyful", "Angry", "Deep sadness", "Confused"], correctAnswer: "Deep sadness", grade: 10, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
  { id: "g10-e-20", text: "Reported speech of: 'He said, \"I will come tomorrow.\"'", type: "mcq", options: ["He said he will come tomorrow.", "He said he would come the next day.", "He said he would come tomorrow.", "He told he would come the next day."], correctAnswer: "He said he would come the next day.", grade: 10, subject: "english", skillCode: "E3", difficultyBand: "above", expectedTime: 75, section: "C" },
  { id: "g10-e-21", text: "Identify the figure of speech: 'Life is a journey.'", type: "mcq", options: ["Simile", "Metaphor", "Personification", "Hyperbole"], correctAnswer: "Metaphor", grade: 10, subject: "english", skillCode: "E4", difficultyBand: "at", expectedTime: 45, section: "C" },

  // Section D: Mental Ability (4 Questions)
  { id: "g10-ma-22", text: "In a class of 40, 25 play cricket, 20 play football, 10 play both. How many play neither?", type: "mcq", options: ["3", "5", "7", "10"], correctAnswer: "5", grade: 10, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "D" },
  { id: "g10-ma-23", text: "If 6 men can do a job in 8 days, how many days will 4 men take?", type: "mcq", options: ["10", "12", "14", "16"], correctAnswer: "12", grade: 10, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 75, section: "D" },
  { id: "g10-ma-24", text: "Series: 1, 2, 6, 24, 120, ___", type: "mcq", options: ["240", "360", "600", "720"], correctAnswer: "720", grade: 10, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 75, section: "D" },
  { id: "g10-ma-25", text: "A man walks 3 km North, turns East and walks 4 km. Distance from start:", type: "mcq", options: ["3 km", "4 km", "5 km", "7 km"], correctAnswer: "5 km", grade: 10, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 75, section: "D" },
];

// ─── GRADE 11 ──────────────────────────────────────────────────────────────
const grade11Questions: Question[] = [
  { id: "g11-m-01", text: "If A = {1, 2, 3, 4}, the number of subsets of A is:", type: "mcq", options: ["8", "12", "16", "32"], correctAnswer: "16", grade: 11, subject: "mathematics", skillCode: "M1", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g11-m-02", text: "The value of sin 75° is:", type: "mcq", options: ["(√6 − √2)/4", "(√6 + √2)/4", "(√3 + 1)/2", "(√3 − 1)/2"], correctAnswer: "(√6 + √2)/4", grade: 11, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g11-m-03", text: "The number of ways to arrange the letters of the word MISSISSIPPI is:", type: "mcq", options: ["34650", "11!", "69300", "7920"], correctAnswer: "34650", grade: 11, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g11-m-04", text: "The middle term in the expansion of (x + 1/x)^8 is:", type: "mcq", options: ["28", "56", "70", "84"], correctAnswer: "70", grade: 11, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g11-m-05", text: "Sum of the infinite GP: 1 + 1/3 + 1/9 + ... is:", type: "mcq", options: ["2/3", "3/2", "4/3", "1"], correctAnswer: "3/2", grade: 11, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g11-m-06", text: "The slope of the line joining (3, -2) and (-1, 4) is:", type: "mcq", options: ["3/2", "-3/2", "2/3", "-2/3"], correctAnswer: "-3/2", grade: 11, subject: "mathematics", skillCode: "M3", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g11-m-07", text: "lim(x->2) (x^2 - 4)/(x - 2) equals:", type: "mcq", options: ["0", "2", "4", "undefined"], correctAnswer: "4", grade: 11, subject: "mathematics", skillCode: "M4", difficultyBand: "above", expectedTime: 75, section: "A" },
  { id: "g11-s-08", text: "A body travels 20 m in the 3rd second and 24 m in the 5th second. Its initial velocity is:", type: "mcq", options: ["4 m/s", "10 m/s", "15 m/s", "20 m/s"], correctAnswer: "15 m/s", grade: 11, subject: "science", skillCode: "S4", difficultyBand: "above", expectedTime: 90, section: "B" },
  { id: "g11-s-09", text: "A projectile is launched at 30° with speed 20 m/s. Its horizontal range is (g = 10 m/s^2):", type: "mcq", options: ["20√3 m", "40 m", "20 m", "10√3 m"], correctAnswer: "20√3 m", grade: 11, subject: "science", skillCode: "S4", difficultyBand: "above", expectedTime: 90, section: "B" },
  { id: "g11-s-10", text: "A 5 kg block is pulled along a frictionless surface by a 20 N force. Its acceleration is:", type: "mcq", options: ["2 m/s^2", "4 m/s^2", "5 m/s^2", "10 m/s^2"], correctAnswer: "4 m/s^2", grade: 11, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 60, section: "B" },
  { id: "g11-s-11", text: "A spring of spring constant k = 200 N/m is compressed by 0.1 m. Potential energy stored is:", type: "mcq", options: ["0.5 J", "1 J", "2 J", "4 J"], correctAnswer: "1 J", grade: 11, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 75, section: "B" },
  { id: "g11-s-12", text: "The escape velocity from Earth's surface is approximately:", type: "mcq", options: ["8 km/s", "11.2 km/s", "16 km/s", "3.2 km/s"], correctAnswer: "11.2 km/s", grade: 11, subject: "science", skillCode: "S2", difficultyBand: "above", expectedTime: 75, section: "B" },
  { id: "g11-s-13", text: "For a simple pendulum, the time period depends on:", type: "mcq", options: ["Mass of bob", "Amplitude", "Length of string", "Both A and B"], correctAnswer: "Length of string", grade: 11, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 60, section: "B" },
  { id: "g11-s-14", text: "The number of electrons in the outermost shell of a noble gas (except He) is:", type: "mcq", options: ["2", "6", "7", "8"], correctAnswer: "8", grade: 11, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g11-s-15", text: "The quantum number that determines the shape of an orbital is:", type: "mcq", options: ["Principal (n)", "Azimuthal (l)", "Magnetic (ml)", "Spin (ms)"], correctAnswer: "Azimuthal (l)", grade: 11, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 60, section: "B" },
  { id: "g11-s-16", text: "Which of the following has the highest electronegativity?", type: "mcq", options: ["O", "N", "F", "Cl"], correctAnswer: "F", grade: 11, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g11-s-17", text: "For the reaction N2 + 3H2 = 2NH3, if Kp is very small, the reaction is:", type: "mcq", options: ["Product-favoured", "Reactant-favoured", "At equilibrium", "Cannot be determined"], correctAnswer: "Reactant-favoured", grade: 11, subject: "science", skillCode: "S3", difficultyBand: "above", expectedTime: 75, section: "B" },
  { id: "g11-s-18", text: "Enthalpy change of a reaction is negative. The reaction is:", type: "mcq", options: ["Endothermic", "Exothermic", "Isothermal", "Spontaneous always"], correctAnswer: "Exothermic", grade: 11, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g11-s-19", text: "Which is the correct IUPAC name of CH3-CH=CH2?", type: "mcq", options: ["Propene", "Propyne", "Propane", "Propylidene"], correctAnswer: "Propene", grade: 11, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g11-e-20", text: "'Life is a journey.' — This is an example of:", type: "mcq", options: ["Simile", "Metaphor", "Oxymoron", "Alliteration"], correctAnswer: "Metaphor", grade: 11, subject: "english", skillCode: "E4", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g11-e-21", text: "Choose the correct indirect speech: She said, 'I am tired.'", type: "mcq", options: ["She said she was tired.", "She said she is tired.", "She said she had been tired.", "She said I was tired."], correctAnswer: "She said she was tired.", grade: 11, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g11-e-22", text: "Find the odd one out — words meaning 'sad':", type: "mcq", options: ["Melancholy", "Elated", "Despondent", "Mournful"], correctAnswer: "Elated", grade: 11, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g11-e-23", text: "'He is as brave as a lion.' — Identify the figure of speech:", type: "mcq", options: ["Metaphor", "Personification", "Simile", "Hyperbole"], correctAnswer: "Simile", grade: 11, subject: "english", skillCode: "E4", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g11-e-24", text: "Which sentence uses the passive voice correctly?", type: "mcq", options: ["The dog bites the man.", "The man was bitten by the dog.", "The man has bitten the dog.", "The man bites the dog."], correctAnswer: "The man was bitten by the dog.", grade: 11, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g11-e-25", text: "The word 'benevolent' means:", type: "mcq", options: ["Hostile", "Well-meaning and kind", "Deceitful", "Indifferent"], correctAnswer: "Well-meaning and kind", grade: 11, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 45, section: "C" },
];

// ─── GRADE 12 ──────────────────────────────────────────────────────────────
const grade12Questions: Question[] = [
  { id: "g12-m-01", text: "If f: R -> R is defined by f(x) = 3x + 5, then f^-1(x) is:", type: "mcq", options: ["(x - 5)/3", "(x + 5)/3", "3x - 5", "x/3 + 5"], correctAnswer: "(x - 5)/3", grade: 12, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g12-m-02", text: "Principal value of sin^-1(-1/2) is:", type: "mcq", options: ["pi/6", "-pi/6", "5pi/6", "-5pi/6"], correctAnswer: "-pi/6", grade: 12, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 75, section: "A" },
  { id: "g12-m-03", text: "If A is a square matrix and A^2 = A, then A is called:", type: "mcq", options: ["Symmetric", "Skew-symmetric", "Idempotent", "Nilpotent"], correctAnswer: "Idempotent", grade: 12, subject: "mathematics", skillCode: "M1", difficultyBand: "above", expectedTime: 60, section: "A" },
  { id: "g12-m-04", text: "If y = sin(x^2), then dy/dx is:", type: "mcq", options: ["cos(x^2)", "2x cos(x^2)", "-2x cos(x^2)", "x cos(x^2)"], correctAnswer: "2x cos(x^2)", grade: 12, subject: "mathematics", skillCode: "M2", difficultyBand: "at", expectedTime: 75, section: "A" },
  { id: "g12-m-05", text: "Integral of e^x(sin x + cos x) dx equals:", type: "mcq", options: ["e^x sin x + C", "e^x cos x + C", "e^x(sin x - cos x) + C", "e^x tan x + C"], correctAnswer: "e^x sin x + C", grade: 12, subject: "mathematics", skillCode: "M2", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g12-m-06", text: "If vectors a = 2i + 3j and b = i - 2j, then a.b is:", type: "mcq", options: ["4", "-4", "0", "8"], correctAnswer: "-4", grade: 12, subject: "mathematics", skillCode: "M4", difficultyBand: "at", expectedTime: 60, section: "A" },
  { id: "g12-m-07", text: "Probability that A speaks truth is 4/5 and B speaks truth is 3/4. Probability they contradict each other is:", type: "mcq", options: ["7/20", "12/20", "1/5", "3/20"], correctAnswer: "7/20", grade: 12, subject: "mathematics", skillCode: "M3", difficultyBand: "above", expectedTime: 90, section: "A" },
  { id: "g12-s-08", text: "Two charges of +2 uC and -2 uC placed 0.1 m apart. The electric field at midpoint is:", type: "mcq", options: ["Zero", "Directed from +ve to -ve", "Directed from -ve to +ve", "Perpendicular to the line"], correctAnswer: "Directed from +ve to -ve", grade: 12, subject: "science", skillCode: "S3", difficultyBand: "above", expectedTime: 90, section: "B" },
  { id: "g12-s-09", text: "Resistance of a wire is R. If length is doubled and area halved, new resistance is:", type: "mcq", options: ["R", "2R", "4R", "R/4"], correctAnswer: "4R", grade: 12, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 75, section: "B" },
  { id: "g12-s-10", text: "A proton enters magnetic field B perpendicularly with velocity v. Radius of circular path is:", type: "mcq", options: ["mv/q", "mv/qB", "qvB/m", "m/qvB"], correctAnswer: "mv/qB", grade: 12, subject: "science", skillCode: "S4", difficultyBand: "above", expectedTime: 90, section: "B" },
  { id: "g12-s-11", text: "In a transformer, primary voltage is 220 V and turns ratio (Np:Ns) is 10:1. Secondary voltage is:", type: "mcq", options: ["2200 V", "22 V", "110 V", "44 V"], correctAnswer: "22 V", grade: 12, subject: "science", skillCode: "S4", difficultyBand: "at", expectedTime: 60, section: "B" },
  { id: "g12-s-12", text: "The de Broglie wavelength of a particle of mass m and kinetic energy KE is:", type: "mcq", options: ["h/sqrt(2mKE)", "h*sqrt(2mKE)", "sqrt(2mKE)/h", "h/(2mKE)"], correctAnswer: "h/sqrt(2mKE)", grade: 12, subject: "science", skillCode: "S2", difficultyBand: "above", expectedTime: 75, section: "B" },
  { id: "g12-s-13", text: "In a p-n junction diode, the depletion layer is formed due to:", type: "mcq", options: ["Flow of majority carriers", "Recombination of electrons and holes", "External voltage", "Heating of the junction"], correctAnswer: "Recombination of electrons and holes", grade: 12, subject: "science", skillCode: "S3", difficultyBand: "at", expectedTime: 60, section: "B" },
  { id: "g12-s-14", text: "The rate law is: rate = k[A]^2[B]. If [A] is doubled and [B] halved, the rate:", type: "mcq", options: ["Doubles", "Halves", "Remains same", "Quadruples"], correctAnswer: "Doubles", grade: 12, subject: "science", skillCode: "S4", difficultyBand: "above", expectedTime: 75, section: "B" },
  { id: "g12-s-15", text: "The van't Hoff factor (i) for K2SO4 (fully dissociated) is:", type: "mcq", options: ["1", "2", "3", "4"], correctAnswer: "3", grade: 12, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 60, section: "B" },
  { id: "g12-s-16", text: "Which of the following is a d-block element?", type: "mcq", options: ["Lanthanum (La)", "Iron (Fe)", "Radium (Ra)", "Barium (Ba)"], correctAnswer: "Iron (Fe)", grade: 12, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g12-s-17", text: "In nucleophilic substitution, the species that attacks is:", type: "mcq", options: ["Electrophile", "Free radical", "Nucleophile", "Lewis acid"], correctAnswer: "Nucleophile", grade: 12, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g12-s-18", text: "Which of the following is NOT a greenhouse gas?", type: "mcq", options: ["CO2", "CH4", "N2", "N2O"], correctAnswer: "N2", grade: 12, subject: "science", skillCode: "S2", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g12-s-19", text: "The IUPAC name of CH3COCH3 is:", type: "mcq", options: ["Propanone", "Propanal", "Propanol", "Methyl ethanoate"], correctAnswer: "Propanone", grade: 12, subject: "science", skillCode: "S5", difficultyBand: "at", expectedTime: 45, section: "B" },
  { id: "g12-e-20", text: "Identify the rhetorical device: 'To err is human, to forgive divine.'", type: "mcq", options: ["Antithesis", "Simile", "Anaphora", "Euphemism"], correctAnswer: "Antithesis", grade: 12, subject: "english", skillCode: "E4", difficultyBand: "above", expectedTime: 60, section: "C" },
  { id: "g12-e-21", text: "Choose the correctly punctuated sentence:", type: "mcq", options: ["Its a good day, isn't it.", "It's a good day, isn't it?", "Its a good day isn't it?", "It's a good day isn't it."], correctAnswer: "It's a good day, isn't it?", grade: 12, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g12-e-22", text: "The word 'ubiquitous' means:", type: "mcq", options: ["Unique", "Present everywhere", "Extremely rare", "Invisible"], correctAnswer: "Present everywhere", grade: 12, subject: "english", skillCode: "E2", difficultyBand: "above", expectedTime: 45, section: "C" },
  { id: "g12-e-23", text: "'The soldiers fought tooth and nail.' — The phrase is a/an:", type: "mcq", options: ["Simile", "Metaphor", "Idiom", "Oxymoron"], correctAnswer: "Idiom", grade: 12, subject: "english", skillCode: "E4", difficultyBand: "at", expectedTime: 45, section: "C" },
  { id: "g12-e-24", text: "Which sentence is in the future perfect tense?", type: "mcq", options: ["She will go to college.", "She will be going to college.", "She will have finished her work by 6 PM.", "She is going to college."], correctAnswer: "She will have finished her work by 6 PM.", grade: 12, subject: "english", skillCode: "E3", difficultyBand: "at", expectedTime: 60, section: "C" },
  { id: "g12-e-25", text: "'A person who cannot read or write' — One word substitute:", type: "mcq", options: ["Illiterate", "Introvert", "Insolvent", "Obsolete"], correctAnswer: "Illiterate", grade: 12, subject: "english", skillCode: "E2", difficultyBand: "at", expectedTime: 30, section: "C" },
];

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const allQuestions: Question[] = [
  ...grade3Questions,
  ...grade4Questions,
  ...grade5Questions,
  ...grade6Questions,
  ...grade7Questions,
  ...grade8Questions,
  ...grade9Questions,
  ...grade10Questions,
  ...grade11Questions,
  ...grade12Questions,
];

/** Legacy export */
export const sampleQuestions = allQuestions;

/** Get questions filtered by grade */
export const getQuestionsForGrade = (grade: Grade): Question[] =>
  allQuestions.filter((q) => q.grade === grade);

/** Get questions filtered by subject within a grade */
export const getQuestionsBySubject = (
  questions: Question[],
  subject: Subject
): Question[] => questions.filter((q) => q.subject === subject);

/** Get diagnostic test composition — includes all four sections */
export const getDiagnosticTestStructure = (grade: Grade) => {
  const questions = getQuestionsForGrade(grade);
  return {
    totalQuestions: questions.length,
    sectionA: questions.filter((q) => q.section === "A").length,
    sectionB: questions.filter((q) => q.section === "B").length,
    sectionC: questions.filter((q) => q.section === "C").length,
    sectionD: questions.filter((q) => q.section === "D").length,
    bySubject: {
      english: questions.filter((q) => q.subject === "english").length,
      mathematics: questions.filter((q) => q.subject === "mathematics").length,
      science: questions.filter((q) => q.subject === "science").length,
    },
    byDifficulty: {
      below: questions.filter((q) => q.difficultyBand === "below").length,
      at: questions.filter((q) => q.difficultyBand === "at").length,
      above: questions.filter((q) => q.difficultyBand === "above").length,
    },
    estimatedTime: questions.reduce((sum, q) => sum + q.expectedTime, 0),
  };
};