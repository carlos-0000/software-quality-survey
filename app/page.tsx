'use client';
// import { Button } from '@carbon/react';
//import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import {
  Form,
  TextInput,
  Button,
  TextArea,
  Stack,
  Grid,
  Column,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { useState } from 'react';
import ParticipantsForm from '@/components/participants-form/participants-form';
import { useSoftware } from '@/contexts';

const HomePage = () => {
  const { push } = useRouter();
  // const { softwareInfo, updateSoftwareInfo } = useSoftware();

  // const { softwareInfo, setFormData } = use

  const { softwareInfo, updateSoftwareInfo } = useSoftware();

  const handleChange = (e) => {
    updateSoftwareInfo({
      ...softwareInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(softwareInfo);
    push('/encuesta');
  };

  return (
    <Grid condensed>
      <Column span={8} lg={{ offset: 4 }}>
        <Stack gap={7}>
          <header>
            <Stack gap={5}>
              <h1>PLANTILLA EVALUACION</h1>
              <p>
                Este aplicativo es una herramienta interactiva diseñada para
                facilitar la evaluación y calificación de software en diversos
                aspectos clave como rendimiento y calidad. Utilizando una
                plantilla de evaluación estructurada, los evaluadores pueden
                sistemáticamente revisar y puntuar el software según criterios
                predefinidos que reflejan los objetivos generales y específicos
                del software en cuestión.
              </p>
            </Stack>
          </header>

          <Form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              // flexDirection: 'column',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <DatePicker datePickerType={'single'}>
              <DatePickerInput
                id={'sss'}
                labelText={'Fecha'}
                defaultValue={new Date().toLocaleDateString()}
                onChange={handleChange}
              />
            </DatePicker>
            <TextInput
              id="city"
              labelText="Ciudad"
              value={softwareInfo.city}
              onChange={handleChange}
            />
            <TextInput
              id="company"
              labelText="Empresa"
              value={softwareInfo.company}
              onChange={handleChange}
            />
            <TextInput
              id="phone"
              labelText="Teléfono"
              value={softwareInfo.phone}
              onChange={handleChange}
            />
            <TextInput
              id="softwareName"
              labelText="Nombre del Software"
              value={softwareInfo.softwareName}
              onChange={handleChange}
            />
            <div style={{ width: '100%' }}>
              <TextArea
                id="generalObjectives"
                labelText="Objetivos Generales del Software"
                value={softwareInfo.generalObjectives}
                onChange={handleChange}
                placeholder="Ingrese los objetivos generales del software aquí"
                rows={4}
              />
            </div>
            <div style={{ width: '100%' }}>
              <TextArea
                id="specificObjectives"
                labelText="Objetivos Específicos del Software"
                value={softwareInfo.specificObjectives}
                onChange={handleChange}
                placeholder="Ingrese los objetivos específicos del software aquí"
                rows={4}
              />
            </div>

            <div style={{ width: '100%' }}>
              <ParticipantsForm />
            </div>

            <Button type="submit">Empezar</Button>
          </Form>
        </Stack>
      </Column>
    </Grid>
  );
};

export default HomePage;
