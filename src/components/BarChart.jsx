import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {projectsStore} from '../Store/ProjectsStore'


export default function BasicBars() {
    const {projects} = projectsStore()
    const proData = [];
    const proTitles = []
    projects.forEach(pro => {
    proData.push({data:pro.tech})
    proTitles.push(pro.title)
})
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: proTitles }]}
      series={proData}
      width={400}
      height={200}
    />
  );
}