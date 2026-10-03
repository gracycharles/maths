import { VideoLesson } from './types';
import { fractionsMasterclassLesson } from './fractionsLessonData';
import { multiplicationFactorsLesson } from './multiplicationFactorsLessonData';
import {
  placeValueLesson,
  decimalsPercentagesLesson,
  ratioLesson,
  bidmasLesson,
} from './allTopicsLessonsData';
import {
  algebraLesson,
  measurementUnitsLesson,
  perimeterAreaVolumeLesson,
  geometryAnglesLesson,
  wordProblemsLesson,
} from './allTopicsLessonsPart2';
import {
  coordinatesLesson,
  romanNumeralsLesson,
  averagesLesson,
} from './allTopicsLessonsPart3';

export * from './types';
export { fractionsMasterclassLesson } from './fractionsLessonData';
export { multiplicationFactorsLesson } from './multiplicationFactorsLessonData';
export {
  placeValueLesson,
  decimalsPercentagesLesson,
  ratioLesson,
  bidmasLesson,
} from './allTopicsLessonsData';
export {
  algebraLesson,
  measurementUnitsLesson,
  perimeterAreaVolumeLesson,
  geometryAnglesLesson,
  wordProblemsLesson,
} from './allTopicsLessonsPart2';
export {
  coordinatesLesson,
  romanNumeralsLesson,
  averagesLesson,
} from './allTopicsLessonsPart3';

export const allVideoLessonsMap: Record<string, VideoLesson> = {
  'fractions-mastery': fractionsMasterclassLesson,
  'multiplication-division-factors': multiplicationFactorsLesson,
  'place-value-and-rounding': placeValueLesson,
  'decimals-and-percentages': decimalsPercentagesLesson,
  'ratio-and-proportion': ratioLesson,
  'bidmas-order-of-operations': bidmasLesson,
  'introduction-to-algebra': algebraLesson,
  'units-of-measurement': measurementUnitsLesson,
  'perimeter-area-and-volume': perimeterAreaVolumeLesson,
  'geometry-angles-and-shapes': geometryAnglesLesson,
  'coordinates-and-reflection': coordinatesLesson,
  'roman-numerals-and-time': romanNumeralsLesson,
  'averages-and-data-handling': averagesLesson,
  'multi-step-word-problems': wordProblemsLesson,
};

export function getVideoLessonForTopic(topicId: string): VideoLesson {
  if (allVideoLessonsMap[topicId]) {
    return allVideoLessonsMap[topicId];
  }
  // Fallback to fractions or multiplication lesson if unknown
  return multiplicationFactorsLesson;
}

export function hasVideoLesson(topicId: string): boolean {
  return Boolean(allVideoLessonsMap[topicId]);
}
