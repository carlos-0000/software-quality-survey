// @ts-nocheck

import React, { useState } from 'react';
import { RadioButton, RadioButtonGroup, TextArea, Button } from '@carbon/react';
import { useSoftware } from '@/contexts'; // Importa correctamente tu contexto

export const AnswersComponent = () => {
  const { answers, updateAnswer } = useSoftware();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState('');
  const [currentObservation, setCurrentObservation] = useState('');

  const currentSection = answers.sections[currentSectionIndex];
  const currentItem = currentSection?.items[currentItemIndex];

  const handleNext = () => {
    // Actualiza la respuesta en el contexto
    updateAnswer(
      currentSection.id,
      currentItem.id,
      parseInt(currentValue, 10),
      currentObservation,
    );

    // Avanza a la siguiente pregunta o sección
    if (currentItemIndex < currentSection.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (currentSectionIndex < answers.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentItemIndex(0); // Reinicia el índice del ítem para la nueva sección
    } else {
      currentItem.id = -1; // No hay más preguntas
    }

    // Limpia los valores actuales para la siguiente pregunta
    setCurrentValue('');
    setCurrentObservation('');
  };

  if (currentItem.id === -1) {
    return <div>No hay más preguntas en la encuesta.</div>;
  }

  //
  return (
    <div>
      <h2>{currentSection.title}</h2>
      <p>{currentSection.description}</p>
      <h3>{currentItem.title_item}</h3>
      <p>{currentItem.description_item}</p>
      <RadioButtonGroup
        name={`group-${currentItem.id}`}
        valueSelected={currentValue}
        onChange={(value) => setCurrentValue(value as string)}
        defaultSelected={'res-0'}
      >
        <RadioButton labelText="0 No cumple de 0% a un 30%" value="0" />
        <RadioButton labelText="1 Cumple de 31% a 50%" value="1" />
        <RadioButton labelText="2 Cumple de 51% a 89%" value="2" />
        <RadioButton labelText="3 Cumple con o más del 90%" value="3" />
      </RadioButtonGroup>
      <TextArea
        id={`observation-${currentItem.id}`}
        labelText="Observación"
        value={currentObservation}
        onChange={(e) => setCurrentObservation(e.target.value)}
      />
      <Button onClick={handleNext}>Siguiente</Button>
    </div>
  );
};

export default AnswersComponent;
