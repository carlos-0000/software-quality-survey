'use client';

import ParametrizationTable from '@/components/parametrization-table/parametrization-table';
import { AnswersComponent } from '@/components';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <ParametrizationTable />
      <AnswersComponent />
    </>
  );
};

export default Page;
