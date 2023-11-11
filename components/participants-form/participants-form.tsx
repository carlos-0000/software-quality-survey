import { useState } from 'react';
import { TextInput, Button } from '@carbon/react';

const ParticipantsForm = ({ onParticipantsChange }) => {
  const [participants, setParticipants] = useState([
    { position: '', name: '', signature: '' },
  ]);

  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
    onParticipantsChange(newParticipants); // Esta función propaga los cambios al estado del componente padre
  };

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { position: '', name: '', signature: '' },
    ]);
  };

  const removeParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
    onParticipantsChange(newParticipants); // Esta función propaga los cambios al estado del componente padre
  };

  return (
    <div>
      {participants.map((participant, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <TextInput
            id={`position-${index}`}
            labelText="Cargo"
            value={participant.position}
            onChange={(e) =>
              handleParticipantChange(index, 'position', e.target.value)
            }
          />
          <TextInput
            id={`name-${index}`}
            labelText="Nombre"
            value={participant.name}
            onChange={(e) =>
              handleParticipantChange(index, 'name', e.target.value)
            }
          />
          <TextInput
            id={`signature-${index}`}
            labelText="Firma"
            value={participant.signature}
            onChange={(e) =>
              handleParticipantChange(index, 'signature', e.target.value)
            }
            // Aquí podrías reemplazar este TextInput por un componente de carga de archivos o firma digital
          />
          <Button kind="danger" onClick={() => removeParticipant(index)}>
            Eliminar
          </Button>
        </div>
      ))}
      <Button onClick={addParticipant}>Agregar Participante</Button>
    </div>
  );
};

export default ParticipantsForm;
