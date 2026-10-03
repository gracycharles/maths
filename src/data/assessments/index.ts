import { TopicAssessment } from '../../types/assessment';
import { placeValueAssessment } from './placeValueAssessment';
import { multiplicationAssessment } from './multiplicationAssessment';
import { fractionsAssessment } from './fractionsAssessment';
import { decimalsPercentagesAssessment } from './decimalsPercentagesAssessment';
import { bidmasAssessment } from './bidmasAssessment';
import { ratioProportionAssessment } from './ratioProportionAssessment';
import { algebraAssessment } from './algebraAssessment';
import { geometryAssessment } from './geometryAssessment';
import { areaPerimeterAssessment } from './areaPerimeterAssessment';
import { romanNumeralsAssessment } from './romanNumeralsAssessment';
import { statisticsAssessment } from './statisticsAssessment';
import { measurementUnitsAssessment } from './measurementUnitsAssessment';
import { coordinatesAssessment } from './coordinatesAssessment';
import { wordProblemsAssessment } from './wordProblemsAssessment';

export {
  placeValueAssessment,
  multiplicationAssessment,
  fractionsAssessment,
  decimalsPercentagesAssessment,
  bidmasAssessment,
  ratioProportionAssessment,
  algebraAssessment,
  geometryAssessment,
  areaPerimeterAssessment,
  romanNumeralsAssessment,
  statisticsAssessment,
  measurementUnitsAssessment,
  coordinatesAssessment,
  wordProblemsAssessment,
};

export const allAssessments: TopicAssessment[] = [
  placeValueAssessment,
  multiplicationAssessment,
  fractionsAssessment,
  decimalsPercentagesAssessment,
  bidmasAssessment,
  geometryAssessment,
  areaPerimeterAssessment,
  romanNumeralsAssessment,
  statisticsAssessment,
  coordinatesAssessment,
  ratioProportionAssessment,
  algebraAssessment,
  measurementUnitsAssessment,
  wordProblemsAssessment,
];

// Map by primary topic ID plus any historical/alias IDs
export const assessmentMap: Record<string, TopicAssessment> = {
  // Primary core topic IDs matching mathTopics.ts
  'place-value-and-rounding': placeValueAssessment,
  'multiplication-division-factors': multiplicationAssessment,
  'fractions-mastery': fractionsAssessment,
  'decimals-and-percentages': decimalsPercentagesAssessment,
  'bidmas-order-of-operations': bidmasAssessment,
  'geometry-angles-and-shapes': geometryAssessment,
  'perimeter-area-and-volume': areaPerimeterAssessment,
  'roman-numerals-and-time': romanNumeralsAssessment,
  'averages-and-data-handling': statisticsAssessment,
  'coordinates-and-reflection': coordinatesAssessment,

  // Extension topics
  'ratio-and-proportion': ratioProportionAssessment,
  'introduction-to-algebra': algebraAssessment,
  'units-of-measurement': measurementUnitsAssessment,
  'multi-step-word-problems': wordProblemsAssessment,

  // Aliases for robustness
  'area-perimeter-volume': areaPerimeterAssessment,
  'roman-numerals-and-history': romanNumeralsAssessment,
  'statistics-and-data': statisticsAssessment,
  'coordinates-and-geometry': coordinatesAssessment,
};

export function getAssessmentForTopic(topicId: string): TopicAssessment | undefined {
  return assessmentMap[topicId];
}

export function getTotalAssessmentQuestionsCount(): number {
  return allAssessments.reduce((sum, assessment) => sum + assessment.questions.length, 0);
}
