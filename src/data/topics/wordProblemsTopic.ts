import { MathTopic } from '../../types/math';

export const wordProblemsTopic: MathTopic = {
  id: 'multi-step-word-problems',
  title: 'Multi-Step Word Problems & SATs Reasoning',
  category: 'calculations',
  yearLevel: 'Primary 6 / Year 6 (Age 10-11)',
  difficulty: 'Mastery',
  summary: 'Master SATs multi-step word problems using the Singapore Bar Model, unitary method, interpreting remainders in context, and strategic working backwards.',
  iconName: 'HelpCircle',
  color: 'purple',
  readTimeMinutes: 7,
  keyFormulas: [
    {
      id: 'wp-unitary',
      name: 'The Unitary Method',
      formula: '\\text{Cost of 1 Unit} = \\frac{\\text{Total Cost}}{\\text{Number of Units}} \\implies \\text{Cost of } k = k \\times (\\text{Cost of 1 Unit})',
      description: 'Whenever given the cost or weight of a group of items, always reduce to 1 single unit first, then multiply up to the new desired quantity.',
      keyNote: 'Find 1 first! It unlocks any calculation.',
    },
    {
      id: 'wp-remainder',
      name: 'Contextual Remainder Decision Rule',
      formula: '\\text{People/Cargo Allocation} \\implies \\lceil \\text{Round UP} \\rceil, \\quad \\text{Purchasing/Units Made} \\implies \\lfloor \\text{Round DOWN} \\rfloor',
      description: 'If 150 children travel in 48-seat coaches: 150 ÷ 48 = 3 r 6. You MUST round UP to 4 coaches so nobody is left behind! If you have £20 and books cost £6: 20 ÷ 6 = 3 r 2. You can only buy 3 books (round DOWN).',
    },
    {
      id: 'wp-change',
      name: 'Shopping & Change Formula',
      formula: '\\text{Change} = \\text{Amount Tendered} - \\sum (\\text{Quantity} \\times \\text{Unit Price})',
      description: 'Calculate the total bill first by summing all purchased items. Convert pounds and pence uniformly, then subtract from the tendered note.',
    },
  ],
  sections: [
    {
      id: 'wp-sec-barmodel',
      title: '1. The Singapore Bar Model: Part-Whole & Comparison',
      readTimeMinutes: 2,
      visualMetaphor: 'The Visual Lego Blueprint: Word problems are tricky because the numbers are hidden in paragraphs of text. Drawing horizontal rectangular bars translates words into visual blocks! A Part-Whole bar divides a long rectangle into known and unknown parts. A Comparison model stacks two parallel bars to reveal the difference between them.',
      content: 'In SATs Paper 2 and Paper 3 reasoning exams, word problems often describe relationships between two people or quantities (e.g. "Liam has £12 more than Maya; together they have £48"). A comparison bar model immediately clarifies the calculation: draw Liam with Maya’s bar plus an extra £12 block. Subtract the extra £12 from the £48 total to leave two equal bars (£36), meaning each bar is worth £18!',
      prerequisites: [
        {
          term: 'Bar Modeling',
          quickDefinition: 'Visual rectangles used to represent numbers and relationships.',
        },
      ],
      mathExpressions: [
        '\\text{Total} = £48, \\quad \\text{Extra} = £12 \\implies \\text{Two equal units} = 48 - 12 = 36',
        '\\text{One unit (Maya)} = 36 \\div 2 = £18',
        '\\text{Liam} = 18 + 12 = £30',
        '\\text{Check: } £18 + £30 = £48',
      ],
      keyTakeaways: [
        'Draw horizontal rectangles for each person or quantity.',
        'Part-Whole model: All parts sum to the bracketed total.',
        'Comparison model: Equalize the bars by subtracting the difference first.',
        'Always check that the values satisfy all statements in the question.',
      ],
      workedExamples: [
        {
          id: 'we-wp-1',
          title: 'Comparison Bar Model (SATs 2-Mark Question)',
          level: 'Level 2: Medium',
          problem: 'Amir and Chen collect football stickers. Together they have 146 stickers. Amir has 28 more stickers than Chen. How many stickers does Chen have?',
          steps: [
            {
              stepNumber: 1,
              title: 'Subtract the extra difference from the grand total',
              explanation: 'Amir has Chen’s amount plus 28 stickers. If we remove Amir’s 28 extra stickers, the remaining stickers are shared equally between two identical bars.',
              math: '146 - 28 = 118',
            },
            {
              stepNumber: 2,
              title: 'Divide the remainder by 2 equal units',
              explanation: '118 ÷ 2 = 59 stickers for Chen.',
              math: '118 \\div 2 = 59\\text{ stickers (Chen)}',
            },
            {
              stepNumber: 3,
              title: 'Calculate Amir’s stickers and verify total',
              explanation: 'Amir has 59 + 28 = 87 stickers. Check: 59 + 87 = 146. Exactly matches!',
              math: '59 + 87 = 146',
            },
          ],
          finalAnswer: 'Chen has 59 stickers (Amir has 87).',
          proTip: 'Whenever you see "X has N more than Y and their total is T", the smaller share is always (T - N) ÷ 2!',
        },
      ],
    },
    {
      id: 'wp-sec-unitary',
      title: '2. The Unitary Method & Multi-Step Rates',
      readTimeMinutes: 2,
      visualMetaphor: 'The Price Tag per Apple: If a shopkeeper charges £1.80 for a bag of 6 apples, you cannot immediately guess the price of 14 apples. But finding the price of ONE apple is easy: £1.80 ÷ 6 = 30p! Once you know 1 apple costs 30p, any quantity is just a quick multiplication: 14 × 30p = £4.20.',
      content: 'The unitary method is one of the most powerful tools in mathematics. Whenever a problem gives information about a group of items, calculate the value of 1 item first (divide), then calculate the target number (multiply).',
      prerequisites: [
        {
          term: 'Short Bus Stop Division',
          quickDefinition: 'Used to find the unit value.',
          targetTopicId: 'multiplication-division-factors',
          targetTopicTitle: 'Multiplication, Division, Factors & Primes',
        },
      ],
      mathExpressions: [
        '5\\text{ pens} = £3.75 \\implies 1\\text{ pen} = £3.75 \\div 5 = £0.75',
        '8\\text{ pens} = 8 \\times £0.75 = £6.00',
      ],
      keyTakeaways: [
        'Find the unit value first by dividing total cost by quantity.',
        'Multiply the unit value by the new target quantity.',
        'Keep currency decimal places consistent (£3.75, £0.75).',
      ],
      workedExamples: [
        {
          id: 'we-wp-2',
          title: 'Comparing Better Value Packs (Unit Price)',
          level: 'Level 2: Medium',
          problem: 'Brand A sells 4 cartons of juice for £2.80. Brand B sells 6 cartons of the same juice for £3.90. Which brand offers better value per carton?',
          steps: [
            {
              stepNumber: 1,
              title: 'Calculate cost per carton for Brand A',
              explanation: '£2.80 ÷ 4 = 70p per carton.',
              math: '£2.80 \\div 4 = £0.70\\text{ (70p)}',
            },
            {
              stepNumber: 2,
              title: 'Calculate cost per carton for Brand B',
              explanation: '£3.90 ÷ 6 = 65p per carton.',
              math: '£3.90 \\div 6 = £0.65\\text{ (65p)}',
            },
            {
              stepNumber: 3,
              title: 'Compare unit prices',
              explanation: '65p is cheaper than 70p, so Brand B is better value.',
              math: '65\\text{p} < 70\\text{p}',
            },
          ],
          finalAnswer: 'Brand B is better value (65p vs 70p per carton).',
          proTip: 'Always state both unit costs clearly in your working to earn the method mark!',
        },
      ],
    },
    {
      id: 'wp-sec-remainders',
      title: '3. Interpreting Remainders in Real-World Contexts',
      readTimeMinutes: 3,
      visualMetaphor: 'The School Trip Bus Dilemma: When you divide 100 children by 30-seat mini-buses, the math says 3.333 buses (3 buses with 10 children left over). You cannot book 0.33 of a bus, and you cannot leave 10 children on the school pavement! You must round UP to 4 whole buses. But if you have £10 and cinema tickets cost £4, you can only buy 2 tickets; you round DOWN.',
      content: 'In standard arithmetic, 25 ÷ 4 = 6 r 1. But in SATs Reasoning word problems, the correct answer depends entirely on the real-world story: (1) Round UP when packing people, vehicles, boxes, or shelves where everything must fit; (2) Round DOWN when calculating how many items can be bought with a fixed budget or how many whole cakes can be baked; (3) Express as a fraction or decimal when measuring food, liquids, or money.',
      prerequisites: [
        {
          term: 'Division with Remainders',
          quickDefinition: 'Finding the quotient and leftover amount.',
          targetTopicId: 'multiplication-division-factors',
          targetTopicTitle: 'Multiplication, Division, Factors & Primes',
        },
      ],
      mathExpressions: [
        '150 \\div 48 = 3\\text{ r } 6 \\implies 4\\text{ coaches needed}',
        '£25 \\div £4 = 6\\text{ r } £1 \\implies 6\\text{ books can be bought}',
      ],
      keyTakeaways: [
        'Think about the physical reality: Can people be left behind? (No -> round UP).',
        'Can a shopkeeper sell part of an item or let you buy without enough money? (No -> round DOWN).',
        'State whole numbers when the question asks for "coaches", "taxis", or "full boxes".',
      ],
      workedExamples: [
        {
          id: 'we-wp-3',
          title: 'Working Backwards from a Final Number',
          level: 'Level 3: Multi-Step',
          problem: 'I think of a secret number. I multiply it by 4, subtract 9, and then divide by 3. My final result is 11. What was my starting secret number?',
          steps: [
            {
              stepNumber: 1,
              title: 'Work backwards reversing the last operation',
              explanation: 'The last step was "divide by 3" yielding 11. The opposite is multiplying by 3: 11 × 3 = 33.',
              math: '11 \\times 3 = 33',
            },
            {
              stepNumber: 2,
              title: 'Reverse the middle operation',
              explanation: 'The previous step was "subtract 9". The opposite is adding 9: 33 + 9 = 42.',
              math: '33 + 9 = 42',
            },
            {
              stepNumber: 3,
              title: 'Reverse the first operation',
              explanation: 'The initial step was "multiply by 4". Wait: 42 is not divisible by 4. Let us re-read carefully: if final result is 11: 11 × 3 = 33; 33 + 9 = 42.',
              math: '42 \\div 4 = 10.5',
            },
          ],
          finalAnswer: '10.5 (Check: 10.5 × 4 = 42; 42 - 9 = 33; 33 ÷ 3 = 11).',
          proTip: 'Always reverse operations in the reverse chronological order: + reverses -, × reverses ÷!',
        },
      ],
    },
  ],
  tipsAndTricks: [
    {
      id: 'tip-wp-underline',
      title: 'Underline Key Numbers & Operation Words',
      type: 'hack',
      badge: 'Exam Habit',
      content: 'Underline the question command: "How much CHANGE...", "How many FULL boxes...", "What is the TOTAL spent...". This prevents answering the wrong sub-step.',
    },
    {
      id: 'tip-wp-estimation',
      title: 'Rough Estimate First',
      type: 'hack',
      badge: 'Sanity Check',
      content: 'Liam buys 3 items around £2 each with a £10 note. Estimate: 3 × £2 = £6, so change should be roughly £4. If your answer is £14.95 or 95p, you know you made an error!',
    },
  ],
  importantInfo: [
    {
      id: 'imp-wp-units',
      title: 'Watch Out for Mixed £ and p',
      priority: 'HIGH',
      content: 'Never add £2.50 + 65p as 2.50 + 65 = 67.50! Always write 65p as £0.65 first: £2.50 + £0.65 = £3.15.',
    },
  ],
  practiceQuestions: [
    {
      id: 'pq-wp-1',
      question: 'Sophie buys 4 coffees at £2.35 each. How much change does she receive from a £20 note?',
      options: ['£10.60', '£9.40', '£11.40', '£8.60'],
      correctIndex: 0,
      hint: 'Find cost of coffees first: 4 × £2.35 = £9.40. Then subtract from £20: £20.00 - £9.40.',
      explanation: '4 × £2.35 = £9.40. Change = £20.00 - £9.40 = £10.60.',
      difficulty: 'Foundation',
    },
    {
      id: 'pq-wp-2',
      question: 'A minibus seats 14 passengers. How many minibuses are needed to take 60 students and 5 teachers to a competition?',
      options: ['5', '4', '6', '4.6'],
      correctIndex: 0,
      hint: 'Total passengers = 60 + 5 = 65. 65 ÷ 14 = 4 remainder 9. Can 9 people be left behind? Round up!',
      explanation: '65 people ÷ 14 = 4 r 9. 4 minibuses only hold 56 people. 5 minibuses are needed.',
      difficulty: 'Core',
    },
    {
      id: 'pq-wp-3',
      question: 'A factory packs 450 pencils into boxes of 12. How many full boxes can be made, and how many pencils are left over?',
      options: ['37 full boxes, 6 pencils left', '38 full boxes, 0 pencils left', '36 full boxes, 18 pencils left', '37 full boxes, 4 pencils left'],
      correctIndex: 0,
      hint: 'Divide 450 by 12: 12 × 30 = 360, 450 - 360 = 90. 12 × 7 = 84. 90 - 84 = 6.',
      explanation: '450 ÷ 12 = 37 remainder 6. 37 full boxes can be packed, with 6 pencils left over.',
      difficulty: 'Challenge',
    },
  ],
};
