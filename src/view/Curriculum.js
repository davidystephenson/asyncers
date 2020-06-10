import React, { useContext } from 'react'

import Table from './Table'

import curriculum from '../lib/curriculum'

export default function Curriculum () {
  const { sections } = useContext(curriculum)

  return <>
    <h1>Curriculum</h1>

    <Table data={sections} keyName='name' />
  </>
}
