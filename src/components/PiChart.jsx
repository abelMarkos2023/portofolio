import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {projectsStore} from '../Store/ProjectsStore'

export default function BasicPie() {

    const {projects} = projectsStore()

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: projects.filter(p => p.type == 'full-stack').length, label: 'Full Stack' },
            { id: 1, value: projects.filter(p => p.type == 'front-end').length, label: 'Front End'},
            { id: 2,value: projects.filter(p => p.type == 'back-end').length, label: 'BackEnd' },
          ],
        },
      ]}
      width={300}
      height={100}
    />
  );
}
