import React from 'react';
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

  const handlePercentageChange = (id, value) => {
    const percentage = parseFloat(value);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      updateParameter(id, percentage);
    }
  };

  return (
    <Accordion>
      <AccordionItem
        title="Parametrización Tabla"
        style={{ overflow: 'hidden' }}
        defaultExpanded
      >
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
                      value={param.totalPercentage.toString()}
                      onChange={(e) =>
                        handlePercentageChange(param.id, e.target.value)
                      }
                      onBlur={(e) =>
                        handlePercentageChange(param.id, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur();
                        }
                      }}
                      size="sm"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionItem>
    </Accordion>
  );
};

export default ParametrizationTable;
