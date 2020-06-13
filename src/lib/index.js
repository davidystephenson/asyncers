import useCurriculum from '../use/curriculum'
import useReports from '../use/reports'

import construct from './construct'

export const {
  reportsContext, ReportsProvider
} = construct(useReports, 'Reports')

export const {
  curriculumContext, CurriculumProvider
} = construct(useCurriculum, 'Curriculum')
