// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';

import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Checkbox,
  Button,
} from '@carbon/react';
import { useSoftware } from '@/contexts';
import { TableBuilt } from '@carbon/icons-react';

const ResultTable = () => {
  const { parametrization, answers, softwareInfo, participants } =
    useSoftware();
  const [isChecked, setIsChecked] = useState(false);
  // Calcula los resultados y devuelve un objeto con los mismos para renderizar la tabla
  const resultData = useMemo(() => {
    return parametrization.map((param, index) => {
      const section = answers.sections[index];
      const VALUE = section.items.reduce((acc, item) => acc + item.value, 0);
      const MAXIMUM = section.items.length * 3;
      const PERCENT_RESULT = (VALUE * 100) / MAXIMUM;
      const PERCENT_MAXIMUM = param.totalPercentage;
      const PERCENT_GLOBAL = (PERCENT_RESULT * PERCENT_MAXIMUM) / 100;

      return {
        ...param,
        VALUE,
        MAXIMUM,
        PERCENT_RESULT: PERCENT_RESULT.toFixed(2) + '%',
        PERCENT_MAXIMUM: PERCENT_MAXIMUM.toFixed(2) + '%',
        PERCENT_GLOBAL: PERCENT_GLOBAL.toFixed(2) + '%',
      };
    });
  }, [parametrization, answers]);

  const totalPercentageGlobal = resultData.reduce((acc, row) => {
    const value = parseFloat(row.PERCENT_GLOBAL);
    return isNaN(value) ? acc : acc + value;
  }, 0);

  const handleSubmit = async () => {
    const payload = {
      softwareInfo,
      participants,
      parametrization,
      answers,
      resultData: resultData.map((data) => ({
        ...data,
        PERCENT_RESULT: parseFloat(data.PERCENT_RESULT),
        PERCENT_MAXIMUM: parseFloat(data.PERCENT_MAXIMUM),
        PERCENT_GLOBAL: parseFloat(data.PERCENT_GLOBAL),
      })),
    };

    try {
      const response = await fetch('/api/create-software-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Datos enviados con éxito, ID:', result.softwareInfoId);
      console.log('Descargando reporte...');
      await handleDownloadReport(result.softwareInfoId);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleDownloadReport = async (id) => {
    const softwareInfoId = id;
    try {
      const response = await fetch(`/api/generate-report?id=${softwareInfoId}`);
      if (!response.ok) {
        throw new Error('Error al descargar el reporte');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Reporte-${softwareInfoId}.xlsx`; // Nombre del archivo descargado
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
    }
  };

  return (
    <>
      <TableContainer title="Resultados de la Encuesta">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>CÓDIGO</TableHeader>
              <TableHeader>ÍTEM</TableHeader>
              <TableHeader>DESCRIPCIÓN</TableHeader>
              <TableHeader>VALOR</TableHeader>
              <TableHeader>MAXIMO</TableHeader>
              <TableHeader>% RESUL.</TableHeader>
              <TableHeader>% MAXIMO</TableHeader>
              <TableHeader>% GLOBAL</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.VALUE}</TableCell>
                <TableCell>{row.MAXIMUM}</TableCell>
                <TableCell>{row.PERCENT_RESULT}</TableCell>
                <TableCell>{row.PERCENT_MAXIMUM}</TableCell>
                <TableCell>{row.PERCENT_GLOBAL}</TableCell>
              </TableRow>
            ))}
            {/*  Los totales*/}
            <TableRow>
              <TableCell colSpan={3}>TOTAL</TableCell>
              <TableCell>
                {resultData.reduce((acc, row) => acc + row.VALUE, 0)}
              </TableCell>
              <TableCell>
                {resultData.reduce((acc, row) => acc + row.MAXIMUM, 0)}
              </TableCell>
              <TableCell>
                {/*{resultData*/}
                {/*  .reduce((acc, row) => {*/}
                {/*    const value = parseFloat(row.PERCENT_RESULT);*/}
                {/*    return isNaN(value) ? acc : acc + value;*/}
                {/*  }, 0)*/}
                {/*  .toFixed(2) + '%'}*/}
              </TableCell>
              <TableCell>
                {resultData
                  .reduce((acc, row) => {
                    const value = parseFloat(row.PERCENT_MAXIMUM);
                    return isNaN(value) ? acc : acc + value;
                  }, 0)
                  .toFixed(2) + '%'}
              </TableCell>
              {/*Agregar estilos según el porcentaje que tenga se deficiente y suficiente como se muestra en la tabla de abajoEspecialmente pues se refiere al qué color se va a dejarDependiendo del porcentaje que esté*/}
              <TableCell
                style={{
                  backgroundColor:
                    totalPercentageGlobal <= 30
                      ? 'red'
                      : totalPercentageGlobal <= 50
                      ? 'orange'
                      : totalPercentageGlobal <= 70
                      ? 'lightgreen'
                      : totalPercentageGlobal <= 89
                      ? 'green'
                      : 'darkgreen',
                }}
              >
                {totalPercentageGlobal.toFixed(2) + '%'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <h3>RESULTADO DEL EJERCICIO</h3>
        <p style={{ color: 'red' }}>0 A 30% - DEFICIENTE</p>
        <p style={{ color: 'orange' }}>31 A 50% - INSUFICIENTE</p>
        <p style={{ color: 'lightgreen' }}>51 A 70% - ACEPTABLE</p>
        <p style={{ color: 'green' }}>71 A 89% - SOBRESALIENTE</p>
        <p style={{ color: 'darkgreen' }}>MÁS DE 90% - EXCELENTE</p>
      </div>
      {/*<button onClick={handleSubmit}>Guardar</button>*/}
      <h3>Descargar reporte de Excel</h3>
      <p>
        Para descargar el reporte de Excel, primero debes Aceptar que se guarda
        la información en una base de datos.
      </p>
      <Checkbox
        id="checkbox"
        labelText="Acepto que se guarde la información en una base de datos"
        checked={isChecked}
        onChange={(_, { checked }) => setIsChecked(checked)}
      />
      <Button
        kind="primary"
        renderIcon={TableBuilt}
        disabled={!isChecked}
        onClick={handleDownloadReport}
      >
        Descargar Reporte
      </Button>
    </>
  );
};

export default ResultTable;
