export interface VideoCaption {
  id: string;
  time: number; // in seconds from video start
  endTime: number; // in seconds from video start
  text: string;
  spokenText: string;
}

export type WhiteboardType =
  | 'pizza_slices'
  | 'lcm_ladder'
  | 'step_by_step_addition'
  | 'butterfly_method'
  | 'multiplication_grid'
  | 'kfc_division'
  | 'interactive_quiz'
  | 'golden_rules'
  // Expanded Masterclass visual boards for all Primary 5 topics:
  | 'prime_tile_test'
  | 'square_number_grid'
  | 'cube_3d_blocks'
  | 'factor_rainbow_board'
  | 'place_value_houses'
  | 'place_value_shift'
  | 'negative_thermometer'
  | 'rounding_mountain'
  | 'fdp_grid_board'
  | 'fdp_benchmark_highway'
  | 'fdp_lego_blocks'
  | 'fdp_reverse_trick'
  | 'ratio_squash_drink'
  | 'ratio_bar_board'
  | 'ratio_recipe_scaling'
  | 'ratio_difference_board'
  | 'bidmas_priority_board'
  | 'bidmas_brackets_board'
  | 'bidmas_indices_board'
  | 'bidmas_left_to_right'
  | 'algebra_balance_board'
  | 'metric_staircase_board'
  | 'perimeter_area_volume_board'
  | 'angles_clock_board'
  | 'coordinates_grid_board'
  | 'roman_numerals_board'
  | 'averages_rhyme_board'
  | 'word_problems_bar_board';

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
  whiteboardType: WhiteboardType;
  mathFormulas: string[];
  takeawayNote: string;
}

export interface VideoLesson {
  id: string;
  topicId: string;
  title: string;
  subtitle?: string;
  description?: string;
  teacherName: string;
  teacherRole: string;
  subject: string;
  gradeLevel: string;
  totalDuration: number; // in seconds
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
