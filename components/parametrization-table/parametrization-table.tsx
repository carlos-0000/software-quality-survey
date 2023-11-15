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
import { useSoftware } from '@/contexts'; // Asegúrate de importar correctamente el contexto

const ParametrizationTable = () => {
  const { parametrization, updateParameter } = useSoftware();
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

  return (
    <Accordion>
      <AccordionItem open={false} title="Parametrización Tabla">
        <TableContainer
          title="Parametrización Tabla"
          style={{ overflowX: 'auto' }}
        >
          <Table>
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
                  <TableCell>{param.description}</TableCell>
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
                      invalid={totalError}
                      invalidText=""
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
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
      </AccordionItem>
    </Accordion>
  );
};

export default ParametrizationTable;
