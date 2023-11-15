import React, { useState } from 'react';
import {
  TextInput,
  Button,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Stack,
} from '@carbon/react';
import { useSoftware } from '@/contexts';

const ParticipantsForm = () => {
  const { participants, updateParticipants } = useSoftware();
  const [newParticipant, setNewParticipant] = useState({
    position: '',
    name: '',
    signature: '',
  });

  const handleNewParticipantChange = (field: string, value: string) => {
    setNewParticipant((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addParticipant = () => {
    updateParticipants([...participants, newParticipant]);
    setNewParticipant({ position: '', name: '', signature: '' }); // Reset form after adding
  };

  const removeParticipant = (index: number) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    updateParticipants(newParticipants);
  };

  const headers = [
    { key: 'position', header: 'Cargo' },
    { key: 'name', header: 'Nombre' },
    { key: 'signature', header: 'Firma' },
    { header: 'Acciones' },
  ];

  return (
    <Stack gap={5} style={{ width: '100%' }}>
      <TextInput
        id="new-participant-position"
        labelText="Cargo"
        value={newParticipant.position}
        onChange={(e) => handleNewParticipantChange('position', e.target.value)}
      />
      <TextInput
        id="new-participant-name"
        labelText="Nombre"
        value={newParticipant.name}
        onChange={(e) => handleNewParticipantChange('name', e.target.value)}
      />
      <TextInput
        id="new-participant-signature"
        labelText="Firma"
        value={newParticipant.signature}
        onChange={(e) =>
          handleNewParticipantChange('signature', e.target.value)
        }
      />
      <Button onClick={addParticipant}>Agregar Participante</Button>

      <TableContainer title="Participantes">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key}>{header.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!participants || participants.length === 0 ? (
              <TableRow>
                <TableCell>No hay participantes</TableCell>
              </TableRow>
            ) : (
              participants.map((participant, index) => (
                <TableRow key={index}>
                  <TableCell>{participant.position}</TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.signature}</TableCell>
                  <TableCell>
                    <Button
                      kind="danger"
                      onClick={() => removeParticipant(index)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ParticipantsForm;
