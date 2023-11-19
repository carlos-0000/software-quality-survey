'use client';

import ParametrizationTable from '@/components/parametrization-table/parametrization-table';
import { AnswersComponent } from '@/components';
import { NextPage } from 'next';
// @ts-ignore
import {
  Button,
  ListItem,
  Stack,
  Tile,
  UnorderedList,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { ChevronDown } from '@carbon/icons-react';
import { useSoftware } from '@/contexts';
const Page: NextPage = () => {
  const { sliderValue, updateSliderValue } = useSoftware();

  const getCellStyle = (valor: number, categoria: string) => {
    console.log('valor', valor);
    console.log('cellValue', categoria);
    return {
      color:
        valor <= 30
          ? 'var(--cds-support-error)'
          : valor <= 50
          ? 'var(--cds-support-caution-major)'
          : valor <= 89
          ? 'var(--cds-support-caution-minor)'
          : 'var(--cds-support-success)',
      fontSize: '1.1em', // Ajusta el tamaño de la fuente según tus necesidades
    };
  };

  const rows = [
    {
      id: '1',
      nivelCumplimiento: 'Cumple totalmente (>89%)',
      categoria: '3',
    },
    {
      id: '2',
      nivelCumplimiento: 'Cumple (>50% y <90%)',
      categoria: '2',
    },
    {
      id: '3',
      nivelCumplimiento: 'Cumple parcialmente (>30% y <51%)',
      categoria: '1',
    },
    {
      id: '4',
      nivelCumplimiento: 'No cumple (<30%)',
      categoria: '0',
    },
  ];

  const headers = [
    { key: 'nivelCumplimiento', header: 'Nivel de cumplimiento' },
    { key: 'categoria', header: 'Categoría' },

    // ...otros encabezados...
  ];
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
          <TableContainer title="Niveles de cumplimiento">
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
                          <TableCell
                            key={cell.id}
                            style={getCellStyle(parseInt(cell.value), cell)}
                          >
                            {cell.value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DataTable>
          </TableContainer>
        </Stack>
      </Tile>
      <AnswersComponent />
    </div>
  );
};

export default Page;
