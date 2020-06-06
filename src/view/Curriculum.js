import React from 'react'

import Table from './Table'

import useCurriculum from '../use/curriculum'

export default function Curriculum () {
  const { sections } = useCurriculum()

  return <Table data={sections} keyName='name' />
}
