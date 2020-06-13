import useCurriculum from '../use/curriculum'

import construct from './construct'

export const {
  context: curriculum,
  Provider: CurriculumProvider
} = construct(useCurriculum)

export default curriculum
