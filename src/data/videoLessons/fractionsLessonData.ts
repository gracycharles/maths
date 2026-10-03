export interface VideoCaption {
  id: string;
  time: number; // in seconds from video start
  endTime: number; // in seconds from video start
  text: string;
  spokenText: string;
}

export interface VideoChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  teacherMood: 'warm' | 'intense' | 'excited' | 'celebrating' | 'questioning';
  teacherPose: 'welcome' | 'pointer' | 'warning' | 'thinking' | 'writing' | 'cheering';
  teacherSpokenScript: string;
  captions: VideoCaption[];
  whiteboardType:
    | 'pizza_slices'
    | 'lcm_ladder'
    | 'step_by_step_addition'
    | 'butterfly_method'
    | 'multiplication_grid'
    | 'kfc_division'
    | 'interactive_quiz'
    | 'golden_rules';
  mathFormulas: string[];
  takeawayNote: string;
}

export interface VideoLesson {
  id: string;
  topicId: string;
  title: string;
  teacherName: string;
  teacherRole: string;
  subject: string;
  gradeLevel: string;
  totalDuration: number; // e.g. 420 seconds (7 minutes)
  chapters: VideoChapter[];
  checkpointQuestion: {
    question: string;
    mathQuestion: string;
    options: {
      id: string;
      label: string;
      math: string;
      isCorrect: boolean;
      feedback: string;
      teacherSpokenFeedback: string;
    }[];
  };
  revisionNotes: {
    ruleTitle: string;
    ruleFormula: string;
    explanation: string;
  }[];
}

export const fractionsMasterclassLesson: VideoLesson = {
  id: 'video-fractions-masterclass',
  topicId: 'fractions-mastery',
  title: 'Fractions Mastery: The Complete Visual Tutoring Masterclass',
  teacherName: 'Mrs. Sarah Davies',
  teacherRole: 'Lead Primary Mathematics Specialist & UK Key Stage 2 Mentor',
  subject: 'Fractions: Operations, Visual Models & Exam Speed-Hacks',
  gradeLevel: 'Primary 5 & Primary 6 / Year 5 & Year 6 (Ages 9-11)',
  totalDuration: 450, // 7.5 mins full experience
  chapters: [
    {
      id: 'chap-1',
      chapterNumber: 1,
      title: 'The Pizza Paradox: Why Denominators Must Match',
      subtitle: 'The #1 error in primary maths: Why 1/2 + 1/3 is NOT 2/5!',
      startTime: 0,
      duration: 55,
      teacherMood: 'intense',
      teacherPose: 'warning',
      teacherSpokenScript:
        "Welcome to our classroom, mathematicians! Open your notebooks and grab your thinking caps. Today we are tackling the single most famous mistake in Year 5 and Year 6 maths. Look at this equation: one half plus one third. Every year, millions of students mistakenly write two fifths, adding the tops and adding the bottoms! But think about a pizza. If you eat half a large pizza, and your friend eats a third of a pizza, how on earth could you have eaten two fifths together? Two fifths is less than half! You can never add slices of different sizes. To combine fractions, their bottom numbers must speak the exact same language!",
      captions: [
        {
          id: 'c1-1',
          time: 0,
          endTime: 6,
          text: 'Welcome to our classroom, mathematicians! Grab your notebooks.',
          spokenText: 'Welcome to our classroom, mathematicians! Open your notebooks and grab your thinking caps.',
        },
        {
          id: 'c1-2',
          time: 6,
          endTime: 13,
          text: 'Today we tackle the single most famous mistake in Year 5 and 6 maths.',
          spokenText: 'Today we are tackling the single most famous mistake in Year 5 and Year 6 maths.',
        },
        {
          id: 'c1-3',
          time: 13,
          endTime: 23,
          text: 'Look at 1/2 + 1/3. Many students write 2/5, adding tops and bottoms!',
          spokenText: 'Look at this equation: one half plus one third. Every year, millions of students mistakenly write two fifths, adding the tops and adding the bottoms!',
        },
        {
          id: 'c1-4',
          time: 23,
          endTime: 33,
          text: 'Think about a pizza: half a pizza plus a third cannot be two-fifths!',
          spokenText: 'But think about a pizza. If you eat half a large pizza, and your friend eats a third of a pizza, how on earth could you have eaten two fifths together?',
        },
        {
          id: 'c1-5',
          time: 33,
          endTime: 41,
          text: 'Two-fifths is less than a half — pizza would have magically vanished!',
          spokenText: 'Two fifths is less than half! That would mean pizza magically vanished into thin air!',
        },
        {
          id: 'c1-6',
          time: 41,
          endTime: 47,
          text: 'You can never add slices of different sizes.',
          spokenText: 'You can never add slices of different sizes.',
        },
        {
          id: 'c1-7',
          time: 47,
          endTime: 55,
          text: 'To combine fractions, denominators must speak the exact same language!',
          spokenText: 'To combine fractions, their bottom numbers must speak the exact same language!',
        },
      ],
      whiteboardType: 'pizza_slices',
      mathFormulas: [
        '\\frac{1}{2} + \\frac{1}{3} \\neq \\frac{1+1}{2+3} = \\frac{2}{5} \\quad \\text{(A HUGE TRAP!)}',
        '\\frac{1}{2} = \\frac{3}{6}, \\quad \\frac{1}{3} = \\frac{2}{6} \\implies \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}',
      ],
      takeawayNote: 'Never add denominators together! Denominators describe slice size, not slice count.',
    },
    {
      id: 'chap-2',
      chapterNumber: 2,
      title: 'The Common Denominator (LCM Ladder)',
      subtitle: 'How to make fractions speak the same mathematical language',
      startTime: 55,
      duration: 55,
      teacherMood: 'warm',
      teacherPose: 'pointer',
      teacherSpokenScript:
        "So how do we make two different fractions speak the same language? We find their Lowest Common Multiple, or LCM! Imagine two skip-counting runners. The multiples of two are two, four, six, eight. The multiples of three are three, six, nine. They both crash into six! Six is our common denominator. And remember our golden unbreakable rule: whatever you multiply the bottom by, you MUST multiply the top by to keep the fraction perfectly balanced!",
      captions: [
        {
          id: 'c2-1',
          time: 55,
          endTime: 62,
          text: 'How do we make different fractions speak the same language?',
          spokenText: 'So how do we make two different fractions speak the same language?',
        },
        {
          id: 'c2-2',
          time: 62,
          endTime: 70,
          text: 'We find their Lowest Common Multiple, or LCM!',
          spokenText: 'We find their Lowest Common Multiple, or L C M!',
        },
        {
          id: 'c2-3',
          time: 70,
          endTime: 80,
          text: 'Multiples of 2: 2, 4, 6, 8. Multiples of 3: 3, 6, 9.',
          spokenText: 'Imagine two skip counting runners. The multiples of two are two, four, six, eight. The multiples of three are three, six, nine.',
        },
        {
          id: 'c2-4',
          time: 80,
          endTime: 90,
          text: 'They both meet at 6! That is our common denominator.',
          spokenText: 'They both crash into six! Six is our common denominator.',
        },
        {
          id: 'c2-5',
          time: 90,
          endTime: 100,
          text: 'Remember the Golden Rule: Whatever you do to the bottom...',
          spokenText: 'And remember our golden unbreakable rule: whatever you multiply the bottom by...',
        },
        {
          id: 'c2-6',
          time: 100,
          endTime: 110,
          text: '...you MUST do to the top to keep the balance!',
          spokenText: '...you must multiply the top by to keep the fraction perfectly balanced!',
        },
      ],
      whiteboardType: 'lcm_ladder',
      mathFormulas: [
        '\\text{Multiples of 2: } 2, 4, \\mathbf{6}, 8, 10...',
        '\\text{Multiples of 3: } 3, \\mathbf{6}, 9, 12...',
        '\\text{LCM}(2, 3) = 6',
        '\\frac{1 \\times 3}{2 \\times 3} = \\frac{3}{6}, \\quad \\frac{1 \\times 2}{3 \\times 2} = \\frac{2}{6}',
      ],
      takeawayNote: 'The denominator names the part size. Scale both numerator and denominator by the exact same multiplier.',
    },
    {
      id: 'chap-3',
      chapterNumber: 3,
      title: 'Full Whiteboard Walkthrough: 3/4 + 2/5',
      subtitle: 'From separate fractions to an improper result and mixed number',
      startTime: 110,
      duration: 65,
      teacherMood: 'excited',
      teacherPose: 'writing',
      teacherSpokenScript:
        "Let's write out a full exam problem on my board: three quarters plus two fifths. Watch every stroke of my pen. Step one: Find the common denominator for four and five. Four times five is twenty! Step two: Convert three quarters into twentieths. Four times five is twenty, so three times five is fifteen. Three quarters becomes fifteen twentieths. Step three: Convert two fifths. Five times four is twenty, so two times four is eight. Two fifths becomes eight twentieths. Step four: Add the tops: fifteen plus eight is twenty-three! Twenty-three over twenty. And converted to a mixed number, that's one whole and three twentieths! Brilliant work!",
      captions: [
        {
          id: 'c3-1',
          time: 110,
          endTime: 118,
          text: 'Watch every stroke of my pen on the board: 3/4 + 2/5.',
          spokenText: "Let's write out a full exam problem on my board: three quarters plus two fifths. Watch every stroke of my pen.",
        },
        {
          id: 'c3-2',
          time: 118,
          endTime: 128,
          text: 'Step 1: Common denominator of 4 and 5 is 20.',
          spokenText: 'Step one: Find the common denominator for four and five. Four times five is twenty!',
        },
        {
          id: 'c3-3',
          time: 128,
          endTime: 140,
          text: 'Step 2: 3/4 times 5/5 = 15/20.',
          spokenText: 'Step two: Convert three quarters into twentieths. Four times five is twenty, so three times five is fifteen. Three quarters becomes fifteen twentieths.',
        },
        {
          id: 'c3-4',
          time: 140,
          endTime: 152,
          text: 'Step 3: 2/5 times 4/4 = 8/20.',
          spokenText: 'Step three: Convert two fifths. Five times four is twenty, so two times four is eight. Two fifths becomes eight twentieths.',
        },
        {
          id: 'c3-5',
          time: 152,
          endTime: 164,
          text: 'Step 4: Keep the 20, add tops: 15 + 8 = 23/20.',
          spokenText: 'Step four: Add the tops: fifteen plus eight is twenty-three! Twenty-three over twenty.',
        },
        {
          id: 'c3-6',
          time: 164,
          endTime: 175,
          text: 'Converted to a mixed number: 1 whole and 3/20!',
          spokenText: 'And converted to a mixed number, that is one whole and three twentieths! Brilliant work!',
        },
      ],
      whiteboardType: 'step_by_step_addition',
      mathFormulas: [
        '\\text{Problem: } \\frac{3}{4} + \\frac{2}{5}',
        '\\text{Step 1: } \\text{LCM}(4, 5) = 20',
        '\\text{Step 2: } \\frac{3 \\times 5}{4 \\times 5} = \\frac{15}{20}, \\quad \\frac{2 \\times 4}{5 \\times 4} = \\frac{8}{20}',
        '\\text{Step 3: } \\frac{15}{20} + \\frac{8}{20} = \\frac{15+8}{20} = \\frac{23}{20}',
        '\\text{Step 4: } \\frac{23}{20} = 1\\frac{3}{20}',
      ],
      takeawayNote: 'Add numerators ONLY once denominators match. Never add the bottom numbers!',
    },
    {
      id: 'chap-4',
      chapterNumber: 4,
      title: 'The Butterfly Method: 10-Sec Speed Hack for Addition (+)',
      subtitle: 'Cross-multiplication shortcut for adding & subtracting fractions with different denominators',
      startTime: 175,
      duration: 55,
      teacherMood: 'excited',
      teacherPose: 'cheering',
      teacherSpokenScript:
        "Now I want to share a secret weapon for adding and subtracting fractions: The Butterfly Method! When you are in a timed test and need to add three quarters plus two fifths in ten seconds, draw butterfly wings over your fractions. Wing one: cross-multiply three times five to get fifteen in the left antenna. Wing two: cross-multiply two times four to get eight in the right antenna. Now add the antennae: fifteen plus eight is twenty-three! And for the butterfly's body at the bottom, multiply four times five to get twenty. Look at that: twenty-three over twenty in a flash!",
      captions: [
        {
          id: 'c4-1',
          time: 175,
          endTime: 183,
          text: 'Secret weapon for ADDING & SUBTRACTING: The Butterfly Method!',
          spokenText: 'Now I want to share a secret weapon for adding fractions: The Butterfly Method!',
        },
        {
          id: 'c4-2',
          time: 183,
          endTime: 191,
          text: 'Cross-multiply wings to find common slice sizes in seconds.',
          spokenText: 'When you are in a timed test and need to add three quarters plus two fifths, draw butterfly wings.',
        },
        {
          id: 'c4-3',
          time: 191,
          endTime: 200,
          text: 'Left Wing: 3 × 5 = 15 in the left antenna.',
          spokenText: 'Wing one: cross-multiply three times five to get fifteen in the left antenna.',
        },
        {
          id: 'c4-4',
          time: 200,
          endTime: 209,
          text: 'Right Wing: 2 × 4 = 8 in the right antenna.',
          spokenText: 'Wing two: cross-multiply two times four to get eight in the right antenna.',
        },
        {
          id: 'c4-5',
          time: 209,
          endTime: 218,
          text: 'Add antennae: 15 + 8 = 23 on top.',
          spokenText: 'Now add the antennae: fifteen plus eight is twenty-three!',
        },
        {
          id: 'c4-6',
          time: 218,
          endTime: 230,
          text: 'Multiply bottoms for the body: 4 × 5 = 20. Instant 23/20 = 1 3/20!',
          spokenText: "And for the butterfly's body at the bottom, multiply four times five to get twenty. Look at that: twenty-three over twenty in a flash!",
        },
      ],
      whiteboardType: 'butterfly_method',
      mathFormulas: [
        '\\text{Left Wing Antenna: } 3 \\times 5 = 15',
        '\\text{Right Wing Antenna: } 2 \\times 4 = 8',
        '\\text{Top Sum: } 15 + 8 = 23',
        '\\text{Bottom Body: } 4 \\times 5 = 20',
        '\\implies \\frac{3}{4} + \\frac{2}{5} = \\frac{23}{20} = 1\\frac{3}{20}',
      ],
      takeawayNote: 'Butterfly Method is ONLY for Addition (+) and Subtraction (-) to cross-multiply unequal denominators into common sizes.',
    },
    {
      id: 'chap-5',
      chapterNumber: 5,
      title: 'Multiplying Fractions: Straight Across the Highway (×)',
      subtitle: 'Why multiplication (×) drives straight across, while addition (+) needed butterfly wings',
      startTime: 230,
      duration: 55,
      teacherMood: 'warm',
      teacherPose: 'pointer',
      teacherSpokenScript:
        "Here is wonderful news: multiplying fractions is different from adding them! You do NOT need butterfly wings or common denominators. Think of a two-lane highway driving straight forward. Top times top, bottom times bottom! If we multiply two thirds times four fifths, we drive straight across: two times four gives eight on top, and three times five gives fifteen on the bottom. Eight fifteenths! Why does this work? Because 'times' means 'of'. Two thirds OF four fifths cuts the grid directly into eight overlapping squares out of fifteen!",
      captions: [
        {
          id: 'c5-1',
          time: 230,
          endTime: 238,
          text: 'Multiplying (×) is DIFFERENT from Adding (+): No wings needed!',
          spokenText: 'Here is wonderful news: multiplying fractions is different from adding them!',
        },
        {
          id: 'c5-2',
          time: 238,
          endTime: 246,
          text: 'No common denominators needed: Drive straight forward on the highway.',
          spokenText: 'You do not need any common denominators. Think of a two-lane highway driving straight forward.',
        },
        {
          id: 'c5-3',
          time: 246,
          endTime: 256,
          text: 'Highway Rule: Top × Top, Bottom × Bottom!',
          spokenText: 'Top times top, bottom times bottom! If we have two thirds times four fifths, we multiply two times four to get eight, and three times five to get fifteen.',
        },
        {
          id: 'c5-4',
          time: 256,
          endTime: 266,
          text: '2/3 × 4/5: (2 × 4) / (3 × 5) = 8/15.',
          spokenText: "Eight fifteenths! Why does this work? Because 'times' means 'of'.",
        },
        {
          id: 'c5-5',
          time: 266,
          endTime: 275,
          text: 'Two-thirds OF four-fifths means taking a fraction of a fraction.',
          spokenText: 'Two thirds of four fifths is cutting a four-fifths rectangle into three slices and keeping two.',
        },
        {
          id: 'c5-6',
          time: 275,
          endTime: 285,
          text: 'In our 3×5 grid, shaded overlap is 8 boxes out of 15 total.',
          spokenText: 'In our visual area grid, that is exactly eight squares out of fifteen!',
        },
      ],
      whiteboardType: 'multiplication_grid',
      mathFormulas: [
        '\\text{Highway Rule: } \\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}',
        '\\frac{2}{3} \\times \\frac{4}{5} = \\frac{2 \\times 4}{3 \\times 5} = \\frac{8}{15}',
        '\\text{Multiplication drives straight across — NO cross-multiplication wings!}',
      ],
      takeawayNote: 'For Multiplication (×): Multiply straight across (Top × Top, Bottom × Bottom). No common denominator needed!',
    },
    {
      id: 'chap-6',
      chapterNumber: 6,
      title: 'Dividing Fractions: The "K.F.C." Secret',
      subtitle: 'Keep, Flip, Change! Turning division into multiplication',
      startTime: 285,
      duration: 55,
      teacherMood: 'excited',
      teacherPose: 'cheering',
      teacherSpokenScript:
        "Now, what about division? When you see three quarters divided by two fifths, don't panic! Just think of crispy fried chicken: K. F. C.! K stands for KEEP the first fraction exactly as it is: three quarters. F stands for FLIP the second fraction upside down: two fifths flips to become five halves, which mathematicians call the reciprocal. And C stands for CHANGE the division sign into a multiplication sign! Now use our highway rule: three times five is fifteen, and four times two is eight. Fifteen eighths, which simplifies to one whole and seven eighths!",
      captions: [
        {
          id: 'c6-1',
          time: 285,
          endTime: 293,
          text: 'Dividing fractions? Remember crispy fried chicken: K.F.C.!',
          spokenText: 'Now, what about division? When you see three quarters divided by two fifths, do not panic! Just think of crispy fried chicken: K, F, C!',
        },
        {
          id: 'c6-2',
          time: 293,
          endTime: 302,
          text: 'K = KEEP the first fraction: 3/4 stays 3/4.',
          spokenText: 'K stands for KEEP the first fraction exactly as it is: three quarters.',
        },
        {
          id: 'c6-3',
          time: 302,
          endTime: 312,
          text: 'F = FLIP the second fraction upside down: 2/5 flips to 5/2.',
          spokenText: 'F stands for FLIP the second fraction upside down: two fifths flips to become five halves, which mathematicians call the reciprocal.',
        },
        {
          id: 'c6-4',
          time: 312,
          endTime: 321,
          text: 'C = CHANGE division (÷) into multiplication (×)!',
          spokenText: 'And C stands for CHANGE the division sign into a multiplication sign!',
        },
        {
          id: 'c6-5',
          time: 321,
          endTime: 331,
          text: 'Now drive straight across: 3 × 5 = 15, and 4 × 2 = 8.',
          spokenText: 'Now use our highway rule: three times five is fifteen, and four times two is eight. Fifteen eighths!',
        },
        {
          id: 'c6-6',
          time: 331,
          endTime: 340,
          text: '15/8 simplifies to 1 whole and 7/8! How neat is that?',
          spokenText: 'Which simplifies to one whole and seven eighths! How neat is that?',
        },
      ],
      whiteboardType: 'kfc_division',
      mathFormulas: [
        '\\mathbf{K} - \\text{Keep } \\frac{3}{4}',
        '\\mathbf{F} - \\text{Flip } \\frac{2}{5} \\to \\frac{5}{2} \\text{ (Reciprocal)}',
        '\\mathbf{C} - \\text{Change } \\div \\to \\times',
        '\\frac{3}{4} \\div \\frac{2}{5} = \\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8} = 1\\frac{7}{8}',
      ],
      takeawayNote: 'Dividing by a fraction is identical to multiplying by its reciprocal (flipped upside down).',
    },
    {
      id: 'chap-7',
      chapterNumber: 7,
      title: 'Classroom Checkpoint: Pencils Ready!',
      subtitle: 'Pause & solve live on the whiteboard before the teacher reveals all',
      startTime: 340,
      duration: 60,
      teacherMood: 'questioning',
      teacherPose: 'thinking',
      teacherSpokenScript:
        "Now it is your turn to shine! I want you to look at the board: one quarter plus two thirds. Tap your answer on the screen. Did you fall for the denominator trap, or did you find the common denominator of twelve? Try it now!",
      captions: [
        {
          id: 'c7-1',
          time: 340,
          endTime: 348,
          text: 'Now it is your turn to shine! Grab your pencil.',
          spokenText: 'Now it is your turn to shine! Grab your pencil and look at the smartboard.',
        },
        {
          id: 'c7-2',
          time: 348,
          endTime: 358,
          text: 'Look at the board: 1/4 + 2/3. Tap your answer.',
          spokenText: 'One quarter plus two thirds. Tap your answer on the screen.',
        },
        {
          id: 'c7-3',
          time: 358,
          endTime: 370,
          text: 'Did you avoid the denominator trap?',
          spokenText: 'Did you fall for the denominator trap of adding four and three, or did you find the common denominator of twelve?',
        },
        {
          id: 'c7-4',
          time: 370,
          endTime: 385,
          text: 'Convert 1/4 into 3/12, and 2/3 into 8/12.',
          spokenText: 'One quarter scales to three twelfths, and two thirds scales to eight twelfths.',
        },
        {
          id: 'c7-5',
          time: 385,
          endTime: 400,
          text: '3/12 + 8/12 = 11/12! Excellent job!',
          spokenText: 'Three twelfths plus eight twelfths gives eleven twelfths! Brilliant thinking!',
        },
      ],
      whiteboardType: 'interactive_quiz',
      mathFormulas: [
        '\\text{Challenge: } \\frac{1}{4} + \\frac{2}{3} = \\; ?',
        '\\text{Hint: Find LCM of 4 and 3, then convert both fractions.}',
      ],
      takeawayNote: 'Convert 1/4 to 3/12 and 2/3 to 8/12. Combine tops: 3 + 8 = 11/12!',
    },
    {
      id: 'chap-8',
      chapterNumber: 8,
      title: "Teacher's Golden Rulebook & Exam Summary",
      subtitle: 'Key takeaways to copy into your revision notebook',
      startTime: 400,
      duration: 50,
      teacherMood: 'celebrating',
      teacherPose: 'welcome',
      teacherSpokenScript:
        "Outstanding effort today, class! Before you pack your bags, here are your three golden fraction rules: Rule one: When adding or subtracting, find common denominators first. Rule two: When multiplying, drive straight across the highway. Rule three: When dividing, Keep, Flip, and Change! Keep practicing, believe in yourself, and you will ace every fraction test that comes your way. See you in our next masterclass!",
      captions: [
        {
          id: 'c8-1',
          time: 400,
          endTime: 408,
          text: 'Outstanding effort today, mathematicians!',
          spokenText: 'Outstanding effort today, class! Before you pack your bags, here are your three golden fraction rules.',
        },
        {
          id: 'c8-2',
          time: 408,
          endTime: 418,
          text: 'Rule 1: For adding/subtracting, match denominators first (LCM).',
          spokenText: 'Rule one: When adding or subtracting, find common denominators first using the L C M.',
        },
        {
          id: 'c8-3',
          time: 418,
          endTime: 428,
          text: 'Rule 2: For multiplying, drive straight across the highway.',
          spokenText: 'Rule two: When multiplying, drive straight across the highway: top times top, bottom times bottom.',
        },
        {
          id: 'c8-4',
          time: 428,
          endTime: 438,
          text: 'Rule 3: For dividing, remember K.F.C. (Keep, Flip, Change).',
          spokenText: 'Rule three: When dividing, Keep, Flip, and Change!',
        },
        {
          id: 'c8-5',
          time: 438,
          endTime: 450,
          text: 'Keep practicing, and ace every test that comes your way!',
          spokenText: 'Keep practicing, believe in yourself, and you will ace every fraction test that comes your way. See you in our next masterclass!',
        },
      ],
      whiteboardType: 'golden_rules',
      mathFormulas: [
        '\\text{Addition/Subtraction: } \\text{LCM Common Denominators Required}',
        '\\text{Multiplication: } \\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}',
        '\\text{Division: } \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} \\text{ (KFC)}',
      ],
      takeawayNote: 'Copy these three golden rules into your revision journal for permanent exam confidence!',
    },
  ],
  checkpointQuestion: {
    question: 'Calculate the following addition of fractions:',
    mathQuestion: '\\frac{1}{4} + \\frac{2}{3} = \\; ?',
    options: [
      {
        id: 'opt-a',
        label: 'A',
        math: '\\frac{3}{7}',
        isCorrect: false,
        feedback: 'Ah! You fell into the famous Denominator Trap of adding 1+2 on top and 4+3 on the bottom!',
        teacherSpokenFeedback:
          "Oh, watch out! You fell into the classic pizza trap! You cannot add the denominators four and three together. Denominators tell us slice size, not slice quantity. Find the common denominator twelve first!",
      },
      {
        id: 'opt-b',
        label: 'B',
        math: '\\frac{11}{12}',
        isCorrect: true,
        feedback: 'Spot on! LCM(4, 3) = 12. 1/4 becomes 3/12, and 2/3 becomes 8/12. 3/12 + 8/12 = 11/12!',
        teacherSpokenFeedback:
          "Superb! Spot on, mathematician! The common denominator for four and three is twelve. One quarter becomes three twelfths, and two thirds becomes eight twelfths. Three plus eight is eleven twelfths! Brilliant work!",
      },
      {
        id: 'opt-c',
        label: 'C',
        math: '\\frac{3}{12}',
        isCorrect: false,
        feedback: 'Close! 1/4 scales to 3/12, but you forgot to scale the second fraction (2/3 should be 8/12)!',
        teacherSpokenFeedback:
          "Very close! You correctly converted one quarter into three twelfths, but remember you must also convert two thirds into eight twelfths before adding!",
      },
      {
        id: 'opt-d',
        label: 'D',
        math: '\\frac{2}{12}',
        isCorrect: false,
        feedback: 'Not quite. Check your common denominator scaling: 1/4 = 3/12 and 2/3 = 8/12.',
        teacherSpokenFeedback:
          "Not quite! Check the golden rule: multiply top and bottom by three for the first fraction to get three twelfths, and by four for the second fraction to get eight twelfths.",
      },
    ],
  },
  revisionNotes: [
    {
      ruleTitle: '1. The Golden Rule of Denominators',
      ruleFormula: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}',
      explanation:
        'Denominators represent slice size. You can never add numerators until the fractions share the exact same denominator (Lowest Common Multiple).',
    },
    {
      ruleTitle: '2. The Highway Rule for Multiplication',
      ruleFormula: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}',
      explanation:
        'No common denominators needed! Multiply the numerators straight across, and multiply denominators straight across.',
    },
    {
      ruleTitle: '3. KFC Rule for Fraction Division',
      ruleFormula: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
      explanation:
        'Keep the first fraction, Flip the second fraction upside down (the reciprocal), and Change the division sign to multiplication.',
    },
  ],
};
