'use client';

import ParametrizationTable from '@/components/parametrization-table/parametrization-table';
import { AccordionTile, AnswersComponent } from '@/components';
import { NextPage } from 'next';
import {
  Column,
  DataTable,
  Grid,
  // @ts-ignore
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import { useSoftware } from '@/contexts';
import { useEffect } from 'react';

const Page: NextPage = () => {
  const { surveyFinished } = useSoftware();

  useEffect(() => {
    console.log('surveyFinished22', surveyFinished);
  }, [surveyFinished]);
  const rows = [
    {
      id: '1',
      nivelCumplimiento: 'Cumple totalmente',
      min: '90%',
      max: '100%',
      categoria: '3',
    },
    {
      id: '2',
      nivelCumplimiento: 'Cumple',
      min: '51%',
      max: '89%',
      categoria: '2',
    },
    {
      id: '3',
      nivelCumplimiento: 'Cumple parcialmente',
      min: '31%',
      max: '50%',
      categoria: '1',
    },
    {
      id: '4',
      nivelCumplimiento: 'No cumple',
      min: '0%',
      max: '30%',
      categoria: '0',
    },
  ];

  const headers = [
    { key: 'nivelCumplimiento', header: 'Nivel de cumplimiento' },
    { key: 'min', header: 'Mínimo' },
    { key: 'max', header: 'Máximo' },
    { key: 'categoria', header: 'Categoría' },
  ];

  return (
    <Grid condensed>
      <Column span={12} lg={{ offset: 2 }}>
        <Stack gap={7}>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'auto min-content 1fr',
              height: '100%',
              gap: '1rem',
            }}
          >
            <ParametrizationTable />

            <AccordionTile title={'¿Cómo evaluar?'} isOpenProp={surveyFinished}>
              <p style={{ display: 'block', paddingBlockStart: '1rem' }}>
                Por favor lee atentamente cada uno de los criterios de valor de
                evaluación y desliza el control deslizante hasta el valor que
                consideres más adecuado. Si tienes alguna observación, por favor
                escríbela en el recuadro de texto que se encuentra debajo del
                control deslizante.
              </p>
              <TableContainer>
                <DataTable
                  rows={rows}
                  headers={headers}
                  isSortable={false}
                  size={'sm'}
                >
                  {({
                    rows,
                    headers,
                    getHeaderProps,
                    getRowProps,
                    getTableProps,
                  }) => (
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header, index) => (
                            // @ts-ignore Carbon xd
                            <TableHeader
                              {...getHeaderProps({ header })}
                              key={index}
                            >
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, key) => (
                          <TableRow {...getRowProps({ row })} key={key}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </DataTable>
              </TableContainer>
            </AccordionTile>
            <AnswersComponent />
          </div>
        </Stack>
      </Column>
    </Grid>
  );
};

export default Page;
