import { MathTopic } from '../../types/math';

export const algebraTopic: MathTopic = {
  id: 'introduction-to-algebra',
  title: 'Introduction to Algebra: Expressions & Equations',
  category: 'calculations',
  yearLevel: 'Primary 6 / Year 6 (Age 10-11)',
  difficulty: 'Core',
  summary: 'Master algebraic notation, substituting values into formulas, solving one-step and two-step balance scale equations, and finding pairs of unknowns.',
  iconName: 'Calculator',
  color: 'indigo',
  readTimeMinutes: 6,
  keyFormulas: [
    {
      id: 'alg-eval',
      name: 'Substitution Rule',
      formula: '3a + 2 \\quad \\text{when } a = 5 \\implies (3 \\times 5) + 2 = 15 + 2 = 17',
      description: 'When a number sits directly next to a letter (like 3a), it means MULTIPLY (3 × a). Replace the letter with its given value and follow BIDMAS.',
      keyNote: 'Never concatenate digits: 3a when a = 5 is 15, NOT 35!',
    },
    {
      id: 'alg-solve-1',
      name: 'Balance Scale Inverse Rule (One-Step)',
      formula: 'x + b = c \\implies x = c - b, \\quad ax = c \\implies x = \\frac{c}{a}',
      description: 'An equation is like a balanced seesaw. Whatever operation you do to one side, you must do the EXACT same operation to the other side using inverse operations (+ reverses -, × reverses ÷).',
    },
    {
      id: 'alg-solve-2',
      name: 'Two-Step Equation Solving',
      formula: 'ax + b = c \\implies ax = c - b \\implies x = \\frac{c - b}{a}',
      description: 'Step 1: Undo addition or subtraction first. Step 2: Undo multiplication or division second to isolate the single letter x.',
    },
    {
      id: 'alg-nth',
      name: 'Linear Sequence Rule (nth Term)',
      formula: '\\text{Term } n = dn + (\\text{Zero Term})',
      description: 'Find the constant difference d between consecutive terms. Multiply d by n, then add or subtract whatever is needed to match the first term.',
      keyNote: 'For 3, 7, 11, 15: difference is +4, so 4n. Term 1: 4(1) - 1 = 3. Rule is 4n - 1.',
    },
  ],
  sections: [
    {
      id: 'alg-sec-expressions',
      title: '1. Algebraic Notation, Vocabulary & Substitution',
      readTimeMinutes: 2,
      visualMetaphor: 'The Mysterious Gift Box: In algebra, a letter like x or a is simply a label for a mystery gift box holding an unknown number of counters. If one box holds a counters, then 3 boxes hold 3a (3 × a) counters. If you open the box and find 4 counters inside, 3a + 2 becomes (3 × 4) + 2 = 14 counters!',
      content: 'Algebra uses letters (called variables) to represent unknown or changing numbers. In standard algebraic notation: 4x means 4 × x; x/3 means x ÷ 3; xy means x × y. An expression has no equals sign (e.g. 2x + 7); an equation has an equals sign balancing two sides (e.g. 2x + 7 = 19); a formula expresses a general mathematical rule (e.g. Area = l × w).',
      prerequisites: [
        {
          term: 'BIDMAS Order of Operations',
          quickDefinition: 'When substituting values, always calculate multiplications before additions.',
          targetTopicId: 'bidmas-order-of-operations',
          targetTopicTitle: 'BIDMAS / Order of Operations',
          targetSectionId: 'bidmas-sec-order',
          targetSectionTitle: '1. The Hierarchy: Brackets, Indices, Division & Multiplication, Addition & Subtraction',
        },
      ],
      mathExpressions: [
        '\\text{If } x = 6, \\quad 5x - 8 = (5 \\times 6) - 8 = 30 - 8 = 22',
        '\\text{If } p = 4 \\text{ and } q = 7, \\quad 3p + 2q = (3 \\times 4) + (2 \\times 7) = 12 + 14 = 26',
        '\\text{Fraction form: } \\frac{x}{2} + 5 \\quad (x = 10) \\implies \\frac{10}{2} + 5 = 5 + 5 = 10',
      ],
      keyTakeaways: [
        'A number next to a letter means multiplication (4y = 4 × y).',
        'Fraction bar means division (y / 4 = y ÷ 4).',
        'Expression = no equals sign (3x + 1). Equation = has equals sign (3x + 1 = 16).',
        'Always use brackets when substituting: 2(a + 3) with a = 4 is 2 × (4 + 3) = 14.',
      ],
      workedExamples: [
        {
          id: 'we-alg-1',
          title: 'Substituting Two Variables into an Exam Formula',
          level: 'Level 1: Easy',
          problem: 'The cost C of hiring a bouncy castle is given by the formula C = 15h + 20, where h is the number of hire hours. Calculate the cost for 4 hours of hire.',
          mathProblem: 'C = 15h + 20 \\quad (h = 4)',
          steps: [
            {
              stepNumber: 1,
              title: 'Substitute the given value for the variable',
              explanation: 'Replace h with 4. 15h means 15 multiplied by 4.',
              math: 'C = (15 \\times 4) + 20',
            },
            {
              stepNumber: 2,
              title: 'Multiply before adding (BIDMAS)',
              explanation: '15 × 4 = 60. Then add the £20 booking fee: 60 + 20 = 80.',
              math: 'C = 60 + 20 = 80',
            },
          ],
          finalAnswer: '£80',
          proTip: 'Always check units: the question asks for cost in pounds, so answer £80.',
        },
      ],
    },
    {
      id: 'alg-sec-equations',
      title: '2. Solving Linear Equations (The Balance Scale Method)',
      readTimeMinutes: 3,
      visualMetaphor: 'The Perfect Balance Scale: Imagine a set of weighing scales that is perfectly level. On the left pan sits a mystery sack (weight x) plus two 1kg weights. On the right pan sits nine 1kg weights: x + 2 = 9. To discover the sack weight, remove two 1kg weights from BOTH pans! The scale stays perfectly level, leaving x = 7kg on the left.',
      content: 'To solve an equation means to find the secret value of the letter that makes the statement true. Use inverse operations to peel away the surrounding numbers: the inverse of + is -; the inverse of - is +; the inverse of × is ÷; the inverse of ÷ is ×. For two-step equations (like 3x + 5 = 26), undo the addition/subtraction first, then undo the multiplication/division.',
      prerequisites: [
        {
          term: 'Inverse Operations',
          quickDefinition: 'The mathematical opposite operation that undoes a calculation (+ reverses -, × reverses ÷).',
          targetTopicId: 'multiplication-division-factors',
          targetTopicTitle: 'Multiplication, Division, Factors & Primes',
        },
      ],
      mathExpressions: [
        'x + 9 = 22 \\implies x = 22 - 9 = 13',
        '4y = 36 \\implies y = 36 \\div 4 = 9',
        '3x + 7 = 28 \\implies 3x = 28 - 7 = 21 \\implies x = 21 \\div 3 = 7',
        '\\frac{m}{5} - 2 = 6 \\implies \\frac{m}{5} = 6 + 2 = 8 \\implies m = 8 \\times 5 = 40',
      ],
      keyTakeaways: [
        'Whatever you do to the left side of = you MUST do to the right side.',
        'Undo additions or subtractions first in two-step equations.',
        'Undo multiplications or divisions second.',
        'Always check your answer by plugging it back into the original equation!',
      ],
      workedExamples: [
        {
          id: 'we-alg-2',
          title: 'Solving a Two-Step Linear Equation',
          level: 'Level 2: Medium',
          problem: 'Solve the equation: 5y - 7 = 33',
          mathProblem: '5y - 7 = 33',
          steps: [
            {
              stepNumber: 1,
              title: 'Undo the subtraction by adding 7 to both sides',
              explanation: 'The inverse of -7 is +7. Add 7 to both sides of the equation.',
              math: '5y - 7 + 7 = 33 + 7 \\implies 5y = 40',
            },
            {
              stepNumber: 2,
              title: 'Undo the multiplication by dividing both sides by 5',
              explanation: '5y means 5 × y. The inverse is dividing by 5: 40 ÷ 5 = 8.',
              math: 'y = \\frac{40}{5} = 8',
            },
          ],
          finalAnswer: 'y = 8',
          proTip: 'Instant Check: Plug 8 back into 5y - 7: (5 × 8) - 7 = 40 - 7 = 33. It works perfectly!',
        },
      ],
    },
    {
      id: 'alg-sec-pairs',
      title: '3. Pairs of Unknowns & Sequences (nth Term)',
      readTimeMinutes: 2,
      visualMetaphor: 'The Detective’s Clue Matrix: When an equation contains TWO unknowns, such as a + b = 10 or 2x + y = 14, there isn’t just one single answer — there are pairs of compatible numbers! Systematically test integer possibilities starting from 1 to discover all matching combinations.',
      content: 'In Year 6 SATs, students are asked to enumerate pairs of numbers satisfying an equation with two variables where both variables are whole numbers (integers). For linear sequences, find the common difference between consecutive terms (the step), multiply by n, and adjust with the zero term.',
      prerequisites: [
        {
          term: 'Times Tables & Multiples',
          quickDefinition: 'Linear sequences grow by a constant step, which forms the multiplier of n.',
        },
      ],
      mathExpressions: [
        '2a + b = 11 \\quad (a, b \\text{ positive integers}) \\implies \\text{if } a=1, b=9; \\; a=2, b=7; \\; a=3, b=5; \\; a=4, b=3; \\; a=5, b=1',
        '\\text{Sequence: } 5, 8, 11, 14, 17 \\dots \\implies \\text{Diff} = +3 \\implies \\text{Rule} = 3n + 2',
      ],
      keyTakeaways: [
        'To find pairs of unknowns, be systematic: start with a = 1, 2, 3... and calculate b.',
        'Watch for constraints like "positive integers" (whole numbers greater than 0).',
        'Linear sequence formula: Step × n + (Term 1 - Step).',
      ],
      workedExamples: [
        {
          id: 'we-alg-3',
          title: 'Finding Pairs of Unknowns (SATs Question)',
          level: 'Level 3: Multi-Step',
          problem: 'a and b are positive whole numbers. 2a + b = 12. If a = 4, what is the value of b? How many total pairs of positive whole numbers satisfy this equation?',
          steps: [
            {
              stepNumber: 1,
              title: 'Substitute a = 4 to find b',
              explanation: '2a = 2 × 4 = 8. So 8 + b = 12. b = 12 - 8 = 4.',
              math: '2(4) + b = 12 \\implies 8 + b = 12 \\implies b = 4',
            },
            {
              stepNumber: 2,
              title: 'Systematically test all positive whole numbers for a',
              explanation: 'If a=1: 2(1) + b = 12 -> b=10. If a=2: 4 + b = 12 -> b=8. If a=3: 6 + b = 12 -> b=6. If a=4: 8 + b = 12 -> b=4. If a=5: 10 + b = 12 -> b=2. If a=6: 12 + b = 12 -> b=0 (not positive!).',
              math: '(1, 10), (2, 8), (3, 6), (4, 4), (5, 2) \\implies 5\\text{ pairs}',
            },
          ],
          finalAnswer: 'When a = 4, b = 4. There are exactly 5 pairs of positive whole numbers.',
          proTip: 'Remember that 0 is NOT a positive integer! Positive whole numbers start from 1.',
        },
      ],
    },
  ],
  tipsAndTricks: [
    {
      id: 'tip-alg-sub',
      title: 'The Invisible Multiplication Sign',
      type: 'hack',
      badge: 'Algebra Rule #1',
      content: 'In algebra, multiplication signs are hidden to avoid confusing "×" with the letter "x". 7p means 7 × p. ab means a × b. Always insert the × before calculating!',
    },
    {
      id: 'tip-alg-check',
      title: 'The Golden Check: Substitute Back',
      type: 'hack',
      badge: '100% Accuracy',
      content: 'Never submit an algebra answer without plugging it back in! If you solve 4x - 3 = 25 and find x = 7, check: 4(7) - 3 = 28 - 3 = 25. If it balances, you are guaranteed full marks.',
    },
  ],
  importantInfo: [
    {
      id: 'imp-alg-balance',
      title: 'Keep Both Sides Equal',
      priority: 'HIGH',
      content: 'Whatever mathematical operation you do to the left of the = sign (+, -, ×, ÷), you MUST do the exact same thing to the right side to keep the equation true.',
    },
  ],
  practiceQuestions: [
    {
      id: 'pq-alg-1',
      question: 'Solve for x: 3x + 4 = 19',
      options: ['5', '6', '7', '4'],
      correctIndex: 0,
      hint: 'Subtract 4 from both sides: 3x = 15. Then divide by 3: 15 ÷ 3.',
      explanation: '3x = 19 - 4 = 15. x = 15 ÷ 3 = 5.',
      difficulty: 'Foundation',
    },
    {
      id: 'pq-alg-2',
      question: 'If m = 4 and n = 3, what is the value of 5m - 2n?',
      options: ['14', '20', '18', '26'],
      correctIndex: 0,
      hint: '5m = 5 × 4 = 20. 2n = 2 × 3 = 6. Calculate 20 - 6.',
      explanation: '5(4) - 2(3) = 20 - 6 = 14.',
      difficulty: 'Core',
    },
    {
      id: 'pq-alg-3',
      question: 'What is the 10th term in the sequence defined by the rule 3n + 5?',
      options: ['35', '30', '40', '38'],
      correctIndex: 0,
      hint: 'Substitute n = 10 into the formula: (3 × 10) + 5.',
      explanation: 'For n = 10: 3(10) + 5 = 30 + 5 = 35.',
      difficulty: 'Challenge',
    },
  ],
};
