import useCurriculum from '../use/curriculum'
import useReports from '../use/reports'
import useStudents from '../use/students'

import construct from './construct'

export const {
  reportsContext, ReportsProvider
} = construct(useReports, 'Reports')

export const {
  curriculumContext, CurriculumProvider
} = construct(useCurriculum, 'Curriculum')

export const {
  tableContext, TableProvider
} = construct(null, 'Table')

export const {
  studentsContext, StudentsProvider
} = construct(useStudents, 'Students')
