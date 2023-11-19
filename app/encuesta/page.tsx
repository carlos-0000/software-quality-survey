'use client';

import ParametrizationTable from '@/components/parametrization-table/parametrization-table';
import { AnswersComponent } from '@/components';
import { NextPage } from 'next';
// @ts-ignore
import { Button, ListItem, Stack, Tile, UnorderedList } from '@carbon/react';
import { ChevronDown } from '@carbon/icons-react';

const Page: NextPage = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto min-content 1fr',
        height: '100%',
        gap: '1rem',
      }}
    >
      <ParametrizationTable />
      <Tile>
        <Stack gap={5}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h4>¿Cómo evaluar?</h4>
            <Button kind={'ghost'} size={'sm'} renderIcon={ChevronDown}>
              Esconder
            </Button>
          </div>
          <p>
            Por favor lee atentamente cada uno de los criterios de valor de
            evaluación y desliza el control deslizante hasta el valor que
            consideres más adecuado. Si tienes alguna observación, por favor
            escríbela en el recuadro de texto que se encuentra debajo del
            control deslizante.
          </p>
          <h5>Niveles de cumplimiento</h5>
          <UnorderedList>
            <ListItem>0% - 30%: No cumple</ListItem>
            <ListItem>31% - 50%: Cumple parcialmente</ListItem>
            <ListItem>51% - 89%: Cumple</ListItem>
            <ListItem>90% - 100%: Cumple totalmente</ListItem>
          </UnorderedList>
        </Stack>
      </Tile>
      <AnswersComponent />
    </div>
  );
};

export default Page;
