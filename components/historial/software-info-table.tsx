// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  Button,
  Grid,
  Row,
  Column,
  Stack,
  Tag,
} from '@carbon/react';
import { TableBuilt } from '@carbon/icons-react';
import { AccordionTile, AsyncButton } from '@/components';
const SoftwareInfoTable = () => {
  const [softwareInfoData, setSoftwareInfoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-softwares-info');
        if (!response.ok) {
          console.log('Error:', response);
          throw new Error('Error al obtener los datos');
        }
        const rows = await response.json();
        console.log('rows', rows);
        setSoftwareInfoData(rows);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadReport = async (softwareInfoId: number) => {
    try {
      const response = await fetch(`/api/generate-report?id=${softwareInfoId}`);
      if (!response.ok) {
        throw new Error('Error al descargar el reporte');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Reporte-${softwareInfoId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
    }
  };

  const getBackgroundColor = (percentage) => {
    if (percentage <= 30) return 'var(--cds-support-error)';
    else if (percentage <= 50) return 'var(--cds-support-caution-major)';
    else if (percentage <= 70) return 'var(--cds-support-caution-minor)';
    else if (percentage <= 89) return 'darkgreen';
    else return 'var(--cds-support-success)';
  };
  const getTagType = (percentage) => {
    if (percentage <= 30) return 'red';
    else if (percentage <= 50) return 'yellow';
    else if (percentage <= 70) return 'blue';
    else if (percentage <= 89) return 'teal';
    else return 'green';
  };
  const getTagClassName = (percentage) => {
    if (percentage <= 30) return 'tag-error';
    else if (percentage <= 50) return 'tag-caution-major';
    else if (percentage <= 70) return 'tag-caution-minor';
    else if (percentage <= 89) return 'tag-dark-green';
    else return 'tag-success';
  };

  const headers = [
    { key: 'id', header: 'ID' },
    { key: 'city', header: 'Ciudad' },
    { key: 'company', header: 'Empresa' },
    { key: 'phone', header: 'Teléfono' },
    { key: 'software_name', header: 'Nombre del Software' },
    { key: 'date', header: 'Fecha' },
    { key: 'total_percent_global', header: 'Total (%) Global' },
    // Agrega más encabezados si es necesario
    { key: 'actions', header: 'Acciones' },
  ];

  const rows = softwareInfoData.map(
    (info: { [key: string]: number | string }) => ({
      ...info,
      actions: (
        <AsyncButton
          action={() => handleDownloadReport(info.id as number)}
          renderIcon={TableBuilt}
          style={{ margin: '0.3rem 0 0 0' }}
        >
          Descargar Reporte
        </AsyncButton>
      ),
    }),
  );
  return (
    <Grid condensed>
      <Column span={12} lg={{ offset: 2 }}>
        <Stack gap={7}>
          <header>
            <Stack gap={5}>
              <h1>Historial de Evaluaciones de Software</h1>

              <div className="header-content">
                <img
                  src="/img/men.png"
                  alt="Imagen representativa del proyecto generada con inteligencia artificial para el proyecto USCO"
                  className="header-image-historial"
                />
                <p className="header-text">
                  En esta sección encontrarás un registro completo y actualizado
                  de todos los softwares evaluados. Para tu conveniencia,
                  ofrecemos la opción de descargar esta información en formato
                  Excel, facilitando el análisis y la comparación. Haz clic en
                  el botón de descarga situado junto a la tabla para obtener el
                  historial detallado
                </p>
              </div>
            </Stack>
          </header>
          <div style={{ marginBottom: '2rem' }}>
            <AccordionTile
              title={'Historial de Evaluaciones'}
              isOpenProp={true}
            >
              <DataTable rows={rows} headers={headers} isSortable>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getRowProps,
                  getTableProps,
                }) => (
                  <TableContainer>
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
                          // @ts-ignore Carbon xd
                          <TableRow {...getRowProps({ row })} key={key}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>
                                {cell.info.header === 'total_percent_global' ? (
                                  <Tag
                                    className={getTagClassName(
                                      Number(cell.value),
                                    )}
                                    style={{
                                      flexShrink: 0,
                                      width: '4.6rem',
                                    }}
                                  >
                                    {`${cell.value}%`}
                                  </Tag>
                                ) : (
                                  cell.value
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </AccordionTile>
          </div>
        </Stack>
      </Column>
    </Grid>
  );
};

export default SoftwareInfoTable;
