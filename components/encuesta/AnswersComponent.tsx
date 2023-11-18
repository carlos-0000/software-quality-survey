import React, { useState } from 'react';
import {
  TextArea,
  Button,
  // @ts-ignore
  Stack,
  // @ts-ignore
  Slider,
  Tile,
  // @ts-ignore
  Layer,
} from '@carbon/react';
import { useSoftware } from '@/contexts';
import ResultTable from '@/components/resultTable/resultTable';

export const AnswersComponent = () => {
  const { answers, updateAnswer } = useSoftware();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [currentObservation, setCurrentObservation] = useState('');

  const currentSection = answers.sections[currentSectionIndex];
  const currentItem = currentSection?.items[currentItemIndex];

  const [sliderValue, setSliderValue] = useState(50);

  const handleNext = () => {
    // Con el objetivo de hacer pruebasGenera un número aleatorio entre 0:03 para el valor actual
    const randomValue = Math.random() * (3 - 0) + 0;
    console.log(randomValue);
    setCurrentValue(randomValue);

    // Actualiza la respuesta en el contexto
    updateAnswer(
      currentSection.id,
      currentItem.id,
      currentValue,
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
    setCurrentValue(0);
    setCurrentObservation('');
  };

  if (currentItem.id === -1) {
    return <ResultTable />;
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        gap: '1rem',
      }}
    >
      <div>
        <Tile style={{ padding: 0 }}>
          <Layer>
            <div style={{ padding: '1rem' }}>
              <Stack gap={3}>
                <small>
                  Sección {currentSection.id} de {answers.sections.length}
                </small>
                <h2 style={{ textTransform: 'capitalize' }}>
                  {currentSection.title.toLowerCase()}
                </h2>
                <p>{currentSection.description}</p>
              </Stack>
            </div>
            <Tile>
              <Layer>
                <Stack gap={3}>
                  <small>
                    Pregunta {currentItem.id} de {currentSection.items.length}
                  </small>
                  <h3>{currentItem.title_item}</h3>
                  <p>{currentItem.description_item}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '1rem',
                      paddingBlock: '1rem',
                    }}
                  >
                    <div>
                      <Slider
                        labelText="Nivel de cumplimiento"
                        max={100}
                        min={0}
                        step={1}
                        value={sliderValue}
                        hideTextInput={true}
                        formatLabel={(value: string) => `${value}%`}
                        onChange={({ value }: { value: number }) => {
                          const result =
                            value <= 30
                              ? 0
                              : value <= 50
                              ? 1
                              : value <= 89
                              ? 2
                              : 3;
                          setSliderValue(value);
                          setCurrentValue(result);
                        }}
                      />
                    </div>
                    <h1>{sliderValue}%</h1>
                  </div>
                  <TextArea
                    id={`observation-${currentItem.id}`}
                    labelText="Observación"
                    value={currentObservation}
                    onChange={(e) => setCurrentObservation(e.target.value)}
                  />
                </Stack>
              </Layer>
            </Tile>
          </Layer>
        </Tile>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button kind={'secondary'} onClick={handleNext}>
          Anterior
        </Button>
        <Button onClick={handleNext}>Siguiente</Button>
      </div>
    </div>
  );
};

export default AnswersComponent;
