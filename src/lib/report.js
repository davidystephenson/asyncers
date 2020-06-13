import useReports from '../use/reports'

import construct from './construct'

export const {
  context: report,
  Provider: ReportProvider
} = construct(useReports)

export default report
