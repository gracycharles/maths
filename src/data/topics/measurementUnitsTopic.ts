import { MathTopic } from '../../types/math';

export const measurementUnitsTopic: MathTopic = {
  id: 'units-of-measurement',
  title: 'Units of Measurement & Conversions',
  category: 'measurement',
  yearLevel: 'Primary 5 / Year 5 (Age 9-10)',
  difficulty: 'Core',
  summary: 'Master metric conversions (length, mass, capacity), imperial approximations (miles to km, pints, inches), and multi-step real-world measurement problems.',
  iconName: 'Maximize2',
  color: 'emerald',
  readTimeMinutes: 5,
  keyFormulas: [
    {
      id: 'meas-length',
      name: 'Metric Length Conversions',
      formula: '1\\text{ km} = 1,000\\text{ m}, \\quad 1\\text{ m} = 100\\text{ cm}, \\quad 1\\text{ cm} = 10\\text{ mm}',
      description: 'Larger unit to smaller unit: MULTIPLY (km → m: ×1000; m → cm: ×100; cm → mm: ×10). Smaller to larger: DIVIDE (mm → cm: ÷10; cm → m: ÷100; m → km: ÷1000).',
      keyNote: '1 metre = 1,000 millimetres (100 × 10).',
    },
    {
      id: 'meas-mass-cap',
      name: 'Metric Mass & Capacity',
      formula: '1\\text{ kg} = 1,000\\text{ g}, \\quad 1\\text{ L} = 1,000\\text{ ml}',
      description: 'The prefix "kilo" means 1,000. The prefix "milli" means 1/1,000th. 1 tonne = 1,000 kg.',
      keyNote: 'Half a kilogram = 500g. Quarter of a litre = 250ml.',
    },
    {
      id: 'meas-imperial',
      name: 'Key Imperial Approximations (SATs)',
      formula: '5\\text{ miles} \\approx 8\\text{ km}, \\quad 1\\text{ inch} \\approx 2.5\\text{ cm}, \\quad 1\\text{ pint} \\approx 568\\text{ ml}, \\quad 1\\text{ kg} \\approx 2.2\\text{ lbs}',
      description: 'To convert miles to km: multiply by 8, then divide by 5 (or multiply by 1.6). To convert km to miles: multiply by 5, then divide by 8.',
      keyNote: '5 miles is roughly 8 kilometres! Remember the 5-to-8 ratio.',
    },
  ],
  sections: [
    {
      id: 'meas-sec-metric',
      title: '1. The Metric System: Length, Mass & Capacity',
      readTimeMinutes: 2,
      visualMetaphor: 'The Zoom Lens Ladder: Imagine stepping down a staircase from gigantic to tiny units. Each step down to a smaller unit zooms in, giving you MORE units (so you MULTIPLY by 10, 100, or 1000). Stepping up to a bigger unit zooms out, packaging tiny pieces into fewer big containers (so you DIVIDE).',
      content: 'The metric system is decimal-based (powers of 10). The key prefixes are: Kilo- (1,000 times larger, e.g. kilometer, kilogram); Centi- (100 times smaller, 1/100, e.g. centimeter); Milli- (1,000 times smaller, 1/1,000, e.g. milligram, milliliter). When converting from a large unit to a small unit (e.g. m to cm), multiply. From small to large (e.g. g to kg), divide.',
      prerequisites: [
        {
          term: 'Multiplying & Dividing by 10, 100, 1,000',
          quickDefinition: 'Shift digits left when multiplying, shift digits right when dividing. Refer to Place Value & Rounding.',
          targetTopicId: 'place-value-and-rounding',
          targetTopicTitle: 'Place Value, Decimals & Rounding',
          targetSectionId: 'pv-sec-columns',
          targetSectionTitle: 'Place Value Columns & Powers of 10',
        },
      ],
      mathExpressions: [
        '3.5\\text{ m} = 3.5 \\times 100 = 350\\text{ cm}',
        '450\\text{ g} = 450 \\div 1000 = 0.45\\text{ kg}',
        '2.75\\text{ L} = 2.75 \\times 1000 = 2,750\\text{ ml}',
      ],
      keyTakeaways: [
        'Larger unit to smaller unit = MULTIPLY (m → cm: × 100).',
        'Smaller unit to larger unit = DIVIDE (g → kg: ÷ 1000).',
        'Kilo = 1,000; Centi = 1/100; Milli = 1/1,000.',
        'Never add or subtract measurements until their units match!',
      ],
      workedExamples: [
        {
          id: 'we-meas-1',
          title: 'Converting Mixed Metric Lengths to Solve a Problem',
          level: 'Level 1: Easy',
          problem: 'A roll of ribbon is 2.4 metres long. Sarah cuts three 35cm pieces from it. How many centimetres of ribbon are left?',
          mathProblem: '2.4\\text{ m} - (3 \\times 35\\text{ cm})',
          steps: [
            {
              stepNumber: 1,
              title: 'Convert the roll length into centimetres',
              explanation: '1 metre = 100 cm. 2.4 m × 100 = 240 cm.',
              math: '2.4 \\times 100 = 240\\text{ cm}',
            },
            {
              stepNumber: 2,
              title: 'Calculate the total length of ribbon cut',
              explanation: '3 pieces × 35 cm = 105 cm cut.',
              math: '3 \\times 35 = 105\\text{ cm}',
            },
            {
              stepNumber: 3,
              title: 'Subtract from total roll length',
              explanation: '240 cm - 105 cm = 135 cm remaining.',
              math: '240 - 105 = 135\\text{ cm}',
            },
          ],
          finalAnswer: '135 cm (or 1.35 m)',
          proTip: 'Always convert to the smaller unit first to keep calculations in whole numbers without messy decimals!',
        },
      ],
    },
    {
      id: 'meas-sec-imperial',
      title: '2. Imperial Units & Common National Curriculum Approximations',
      readTimeMinutes: 2,
      visualMetaphor: 'The Road Sign Bridge: In the UK, motorway distances are shown in miles, but science and European road maps use kilometres! To bridge the gap, remember that 5 miles is approximately equal to 8 kilometres. A 5-mile run is the same as an 8-kilometre run.',
      content: 'While metric is used for most science, everyday UK life still uses imperial units: miles for road distance, feet and inches for human height, pints for milk and beer, and pounds (lbs) / ounces for baking and human weight. In KS2 SATs, you are expected to know the standard approximations: 5 miles ≈ 8 km, 1 inch ≈ 2.5 cm, 1 pint ≈ 568 ml (approx. 0.57 L), and 1 kg ≈ 2.2 lbs.',
      prerequisites: [
        {
          term: 'Fractions & Proportions',
          quickDefinition: 'Used for scaling miles to kilometres (5 to 8 ratio).',
        },
      ],
      mathExpressions: [
        '5\\text{ miles} \\approx 8\\text{ km} \\implies 1\\text{ mile} \\approx 1.6\\text{ km}',
        '25\\text{ miles} \\approx (25 \\div 5) \\times 8 = 5 \\times 8 = 40\\text{ km}',
        '40\\text{ km} \\approx (40 \\div 8) \\times 5 = 5 \\times 5 = 25\\text{ miles}',
        '1\\text{ foot} = 12\\text{ inches} \\approx 12 \\times 2.5\\text{ cm} = 30\\text{ cm}',
      ],
      keyTakeaways: [
        '5 miles ≈ 8 km. 1 mile ≈ 1.6 km.',
        '1 inch ≈ 2.5 cm (10 inches ≈ 25 cm).',
        '1 pint ≈ 568 ml (slightly more than half a litre).',
        '1 gallon = 8 pints ≈ 4.5 litres.',
        '1 kg ≈ 2.2 pounds (lbs).',
      ],
      workedExamples: [
        {
          id: 'we-meas-2',
          title: 'Converting Road Travel from Miles to Kilometres',
          level: 'Level 2: Medium',
          problem: 'A road sign says "Birmingham 35 miles". Using the approximation 5 miles ≈ 8 km, how many kilometres away is Birmingham?',
          mathProblem: '35\\text{ miles} \\xrightarrow{5\\text{ miles} \\approx 8\\text{ km}} ?\\text{ km}',
          steps: [
            {
              stepNumber: 1,
              title: 'Find how many 5-mile blocks make up 35 miles',
              explanation: 'Divide 35 by 5: 35 ÷ 5 = 7 blocks.',
              math: '35 \\div 5 = 7',
            },
            {
              stepNumber: 2,
              title: 'Multiply by 8 km for each block',
              explanation: 'Each 5-mile block equals 8 km. 7 × 8 km = 56 km.',
              math: '7 \\times 8 = 56\\text{ km}',
            },
          ],
          finalAnswer: '56 km',
          proTip: 'Quick sense-check: Kilometres are shorter than miles, so the number of km must ALWAYS be larger than the number of miles (56 > 35)!',
        },
      ],
    },
    {
      id: 'meas-sec-multistep',
      title: '3. Multi-Step Measurement Calculations & Elapsed Time',
      readTimeMinutes: 2,
      visualMetaphor: 'The Builder’s Blueprint: A builder never pours concrete or cuts timber until all measurements on the blueprint share the exact same unit. If a room has width 3m and length 450cm, calculate area only after converting 450cm to 4.5m!',
      content: 'In SATs Reasoning, questions frequently mix units on purpose. A perimeter problem might list some sides in metres and others in centimetres; a capacity problem might list container volume in litres and glasses in millilitres. Always convert to a uniform unit before adding, multiplying, or dividing.',
      prerequisites: [
        {
          term: 'Area & Perimeter Formulas',
          quickDefinition: 'Perimeter = sum of sides; Area of rectangle = length × width.',
          targetTopicId: 'perimeter-area-and-volume',
          targetTopicTitle: 'Perimeter, Area & Volume',
        },
      ],
      mathExpressions: [
        '\\text{Jug: } 2\\text{ L} = 2,000\\text{ ml}',
        '\\text{Glasses filled: } 2,000 \\div 150 = 13\\text{ glasses remainder } 50\\text{ ml}',
      ],
      keyTakeaways: [
        'Always check units in every word problem before calculating.',
        'Convert to matching units first (usually the smaller unit).',
        'State the units in your final answer.',
      ],
      workedExamples: [
        {
          id: 'we-meas-3',
          title: 'Capacity & Remainder Context',
          level: 'Level 3: Multi-Step',
          problem: 'A teapot holds 1.8 litres of tea. Each teacup holds 220 ml. How many FULL cups of tea can be poured from the teapot?',
          steps: [
            {
              stepNumber: 1,
              title: 'Convert litres to millilitres',
              explanation: '1.8 L × 1,000 = 1,800 ml.',
              math: '1.8 \\times 1000 = 1,800\\text{ ml}',
            },
            {
              stepNumber: 2,
              title: 'Divide by cup capacity',
              explanation: '1,800 ÷ 220 = 8 with a remainder of 40 ml (8 × 220 = 1,760 ml).',
              math: '1,800 \\div 220 = 8\\text{ r } 40\\text{ ml}',
            },
          ],
          finalAnswer: '8 full cups (with 40 ml left in the teapot)',
          proTip: 'Read carefully: the question asks for FULL cups, so discard the remaining 40 ml (round DOWN to 8).',
        },
      ],
    },
  ],
  tipsAndTricks: [
    {
      id: 'tip-meas-sense',
      title: 'The km > miles Magnitude Rule',
      type: 'hack',
      badge: 'Speed Check',
      content: 'Because 1 mile is 1.6 km, distances in km are ALWAYS numerically larger than in miles. If you convert 10 miles and get 6.25 km, you divided instead of multiplied!',
    },
    {
      id: 'tip-meas-milli',
      title: 'Milli vs Centi',
      type: 'pitfall',
      badge: 'Exam Warning',
      content: 'Remember: 1 metre has 100 centimetres, but 1,000 millimetres. Don’t mix up ÷100 with ÷1,000!',
    },
  ],
  importantInfo: [
    {
      id: 'imp-meas-convert',
      title: 'Never Calculate with Mismatched Units',
      priority: 'HIGH',
      content: 'If side A is 2m and side B is 80cm, the area is NOT 2 × 80 = 160! Convert 2m to 200cm (area = 16,000 cm²) or 80cm to 0.8m (area = 1.6 m²).',
    },
  ],
  practiceQuestions: [
    {
      id: 'pq-meas-1',
      question: 'How many millilitres are in 3.4 litres?',
      options: ['3,400 ml', '340 ml', '34,000 ml', '34 ml'],
      correctIndex: 0,
      hint: '1 litre = 1,000 ml. Multiply 3.4 by 1,000.',
      explanation: '3.4 × 1,000 = 3,400 ml.',
      difficulty: 'Foundation',
    },
    {
      id: 'pq-meas-2',
      question: 'Using the approximation 5 miles ≈ 8 km, how many kilometres is 20 miles?',
      options: ['32 km', '25 km', '40 km', '16 km'],
      correctIndex: 0,
      hint: '20 miles is 4 lots of 5 miles (20 ÷ 5 = 4). Multiply 4 by 8 km.',
      explanation: '(20 ÷ 5) × 8 = 4 × 8 = 32 km.',
      difficulty: 'Core',
    },
    {
      id: 'pq-meas-3',
      question: 'A plank of wood is 3 metres long. A carpenter cuts 6 identical pieces of 42 cm from it. What length of wood is left over?',
      options: ['48 cm', '52 cm', '38 cm', '252 cm'],
      correctIndex: 0,
      hint: '3 m = 300 cm. 6 pieces of 42 cm = 6 × 42 = 252 cm. Subtract: 300 - 252.',
      explanation: '300 cm - (6 × 42 cm) = 300 - 252 = 48 cm.',
      difficulty: 'Challenge',
    },
  ],
};
