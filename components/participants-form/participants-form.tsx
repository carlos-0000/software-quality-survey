import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  // @ts-ignore
  Stack,
  // @ts-ignore
  Layer,
  Tile,
} from '@carbon/react';
import { useSoftware } from '@/contexts';
import { Add, TrashCan } from '@carbon/icons-react';

const ParticipantsForm = () => {
  const { participants, updateParticipants } = useSoftware();
  const [newParticipant, setNewParticipant] = useState({
    position: '',
    name: '',
    signature: '',
  });
  const [errors, setErrors] = useState({
    position: '',
    name: '',
  });

  const handleNewParticipantChange = (field: string, value: string) => {
    setNewParticipant((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addParticipant = () => {
    const newErrors = {
      position: '',
      name: '',
    };

    if (!newParticipant.position) {
      newErrors.position = 'El cargo es obligatorio.';
    }
    if (!newParticipant.name) {
      newErrors.name = 'El nombre es obligatorio.';
    }

    if (!newParticipant.position || !newParticipant.name) {
      setErrors(newErrors);
      return;
    }

    updateParticipants([...participants, newParticipant]);
    setNewParticipant({ position: '', name: '', signature: '' }); // Reset form after adding
    setErrors({ position: '', name: '' }); // Reset errors
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
    <Stack gap={5}>
      <h3>Participantes</h3>
      <Tile>
        <Layer>
          <Stack gap={5}>
            <Stack orientation={'vertical'} gap={5}>
              <TextInput
                id="new-participant-position"
                labelText="Cargo *"
                value={newParticipant.position}
                onChange={(e) =>
                  handleNewParticipantChange('position', e.target.value)
                }
                invalid={!!errors.position}
                invalidText={errors.position}
              />
              <TextInput
                id="new-participant-name"
                labelText="Nombre *"
                value={newParticipant.name}
                onChange={(e) =>
                  handleNewParticipantChange('name', e.target.value)
                }
                invalid={!!errors.name}
                invalidText={errors.name}
              />
              <TextInput
                id="new-participant-signature"
                labelText="Firma"
                value={newParticipant.signature}
                onChange={(e) =>
                  handleNewParticipantChange('signature', e.target.value)
                }
              />
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button onClick={addParticipant} renderIcon={Add} size={'md'}>
                  Agregar
                </Button>
              </div>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableHeader key={index}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!participants || participants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>No hay participantes</TableCell>
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
                            size={'sm'}
                            renderIcon={TrashCan}
                            hasIconOnly={true}
                            iconDescription={'Eliminar'}
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
        </Layer>
      </Tile>
    </Stack>
  );
};

export default ParticipantsForm;
