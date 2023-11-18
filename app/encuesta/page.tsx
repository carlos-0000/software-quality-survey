'use client';

import ParametrizationTable from '@/components/parametrization-table/parametrization-table';
import { AnswersComponent } from '@/components';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div
      style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%' }}
    >
      <ParametrizationTable />
      <AnswersComponent />
    </div>
  );
};

export default Page;
