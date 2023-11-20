import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TextInput,
} from '@carbon/react';
import { useSoftware } from '@/contexts';
import { AccordionTile } from '@/components'; // Asegúrate de importar correctamente el contexto

const ParametrizationTable = () => {
  const { parametrization, updateParameter, surveyFinished } = useSoftware();
  const [totalError, setTotalError] = useState(false);

  useEffect(() => {
    // Calcula el total cada vez que se actualiza la parametrización
    const totalPercentage = parametrization.reduce(
      (acc, param) => acc + param.totalPercentage,
      0,
    );
    setTotalError(totalPercentage !== 100);
  }, [parametrization]);

  const handlePercentageChange = (id: number, value: string) => {
    const percentage = parseFloat(value);
    // Actualiza el parámetro independientemente del error para permitir cambios
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      updateParameter(id, percentage);
    }
  };

  useEffect(() => {
    console.log('surveyFinished', surveyFinished);
  }, [surveyFinished]);

  return (
    <AccordionTile title={'Configurar parámetros'} isOpenProp={surveyFinished}>
      <p style={{ display: 'block', paddingBlockStart: '1rem' }}>
        Seleccione los porcentajes para cada indicador según el tipo de software
        a evaluar. Por ejemplo, en un software bancario, podría enfocarse más en
        Funcionalidad y Eficiencia, mientras que para un software educativo o de
        capacitación, los indicadores de Usabilidad, Calidad en Uso y
        Portabilidad podrían ser más relevantes. Esta tabla ajustable le permite
        personalizar los criterios de evaluación para cada una de las siete
        secciones, proporcionando flexibilidad para adaptarse a diferentes
        necesidades y tipos de software.
      </p>
      <TableContainer>
        <Table size={'sm'}>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Item</TableHeader>
              <TableHeader>Descripción</TableHeader>
              <TableHeader>Preguntas</TableHeader>
              <TableHeader>(%) Total</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {parametrization.map((param) => (
              <TableRow key={param.id}>
                <TableCell>{param.id}</TableCell>
                <TableCell>{param.item}</TableCell>
                <TableCell style={{ minWidth: '300px' }}>
                  {param.description}
                </TableCell>
                <TableCell>{param.questions}</TableCell>
                <TableCell>
                  <TextInput
                    id={`percentage-${param.id}`}
                    labelText={'ssss'}
                    hideLabel
                    value={param.totalPercentage.toString()}
                    onChange={(e) =>
                      handlePercentageChange(param.id, e.target.value)
                    }
                    onBlur={(e) =>
                      handlePercentageChange(param.id, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    size="sm"
                    style={{ flexShrink: 0, width: '4.6rem' }}
                    invalid={totalError}
                    invalidText=""
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                {parametrization.reduce(
                  (acc, param) => acc + param.totalPercentage,
                  0,
                ) !== 100 ? (
                  <span style={{ color: 'red' }}>
                    El porcentaje Total debe ser igual a 100%
                  </span>
                ) : (
                  'Total'
                )}
              </TableCell>
              <TableCell style={{ color: totalError ? 'red' : 'inherit' }}>
                {parametrization
                  .reduce((acc, param) => acc + param.totalPercentage, 0)
                  .toFixed(2)}
                %
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </AccordionTile>
  );
};

export default ParametrizationTable;
