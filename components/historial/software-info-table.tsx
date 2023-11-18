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
} from '@carbon/react';
import { TableBuilt } from '@carbon/icons-react';
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
        const { rows } = await response.json();

        setSoftwareInfoData(rows);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadReport = async (softwareInfoId) => {
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

  const rows = softwareInfoData.map((info) => ({
    ...info,
    actions: (
      <Button
        kind="secondary"
        onClick={() => handleDownloadReport(info.id)}
        renderIcon={TableBuilt}
      >
        Descargar Reporte
      </Button>
    ),
  }));
  return (
    // <Grid>
    //   <Row>
    //     <Column>
    <DataTable rows={rows} headers={headers} isSortable>
      {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
        <TableContainer title="Información del Software">
          <TableToolbar>
            {/* Agrega contenido adicional al toolbar si es necesario */}
            <TableToolbarContent>
              {/* Puedes agregar botones u otros elementos aquí */}
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
    //     </Column>
    //   </Row>
    // </Grid>
  );
};

export default SoftwareInfoTable;
