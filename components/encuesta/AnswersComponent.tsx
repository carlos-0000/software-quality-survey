// @ts-nocheck
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Button, Layer, Slider, Stack, TextArea, Tile } from '@carbon/react';
import { useSoftware } from '@/contexts';
import ResultTable from '@/components/resultTable/resultTable';
// @ts-ignore
import { durationSlow01 } from '@carbon/motion';

const fadeInRightClassNames = 'animate__animated animate__fadeInRight';
const fadeInLeftClassNames = 'animate__animated animate__fadeInLeft';
const fadeOutLeftClassNames = 'animate__animated animate__fadeOutLeft';
const fadeOutRightClassNames = 'animate__animated animate__fadeOutRight';
const animationDuration = Number(durationSlow01.slice(0, -2)); // 700ms like

const getPercentageColor = (value: number) => {
  return value <= 30
    ? 'var(--cds-support-error)'
    : value <= 50
    ? 'var(--cds-support-caution-major)'
    : value <= 89
    ? 'var(--cds-support-caution-minor)'
    : 'var(--cds-support-success)';
};

const categories = {
  '0': 'No cumple',
  '1': 'Cumple parcialmente',
  '2': 'Cumple',
  '3': 'Cumple totalmente',
};

export const AnswersComponent = () => {
  const { answers, updateAnswer, sliderValue, updateSliderValue } =
    useSoftware();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [currentObservation, setCurrentObservation] = useState('');

  const [sectionClassNames, setSectionClassNames] = useState('');
  const [itemClassNames, setItemClassNames] = useState('');

  const currentSection = answers.sections[currentSectionIndex];
  const currentItem = currentSection?.items[currentItemIndex];

  const changeItemSection = (prev = false) => {
    // Actualiza la respuesta en el contexto
    console.log('currentSection.id', currentSection.id);
    console.log('currentItem.id', currentItem.id);
    console.log('currentValue', currentValue);
    console.log('currentObservation', currentObservation);
    updateAnswer(
      currentSection.id,
      currentItem.id,
      currentValue,
      currentObservation,
    );

    if (prev) {
      const nextItemIndex = currentItemIndex - 1;
      const hasToChangeSection = nextItemIndex < 0;

      if (hasToChangeSection) {
        const nextSectionIndex = currentSectionIndex - 1;

        setSectionClassNames(fadeInRightClassNames);
        setTimeout(() => {
          setCurrentSectionIndex(nextSectionIndex);
          setSectionClassNames(fadeInLeftClassNames);
        }, animationDuration);

        setItemClassNames(fadeOutRightClassNames);
        setTimeout(() => {
          setCurrentItemIndex(
            answers.sections[nextSectionIndex].items.length - 1,
          );
          setItemClassNames(fadeInLeftClassNames);
        }, animationDuration);
      } else {
        setItemClassNames(fadeOutRightClassNames);
        setTimeout(() => {
          setCurrentItemIndex(nextItemIndex);
          setItemClassNames(fadeInLeftClassNames);
        }, animationDuration);
      }
    } else {
      const hasToChangeSection =
        currentItemIndex + 1 >= currentSection.items.length;
      const nextItemIndex = currentItemIndex + 1;
      if (hasToChangeSection) {
        setSectionClassNames(fadeOutLeftClassNames);
        setTimeout(() => {
          setCurrentSectionIndex(currentSectionIndex + 1);
          setSectionClassNames(fadeInRightClassNames);
        }, animationDuration);
        setItemClassNames(fadeOutLeftClassNames);
        setTimeout(() => {
          setCurrentItemIndex(0);
          setItemClassNames(fadeInRightClassNames);
        }, animationDuration);
      } else {
        setItemClassNames(fadeOutLeftClassNames);
        setTimeout(() => {
          setCurrentItemIndex(nextItemIndex);
          setItemClassNames(fadeInRightClassNames);
        }, animationDuration);
      }
    }

    // Limpia los valores actuales para la siguiente pregunta
    setCurrentValue(currentValue);
    setCurrentObservation('');
  };

  if (!currentItem) {
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
      <div style={{ overflow: 'hidden' }}>
        <Tile style={{ padding: 0 }} className={sectionClassNames}>
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
            <Tile className={itemClassNames}>
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
                      flexDirection: 'column',
                      paddingBlock: '.75rem',
                      gap: '.5rem',
                    }}
                  >
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
                        updateSliderValue(value);
                        setCurrentValue(result);
                      }}
                    />
                    <span
                      style={{
                        color: getPercentageColor(sliderValue),
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {sliderValue}% -{' '}
                      {
                        categories[
                          String(currentValue) as keyof typeof categories
                        ]
                      }
                    </span>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Button
          kind={'secondary'}
          onClick={() => changeItemSection(true)}
          disabled={currentSectionIndex === 0 && currentItemIndex === 0}
        >
          Anterior
        </Button>
        <Button onClick={() => changeItemSection()}>Siguiente</Button>
      </div>
    </div>
  );
};

export default AnswersComponent;
