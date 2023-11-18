'use client';
// import { Button } from '@carbon/react';
//import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import {
  Form,
  TextInput,
  Button,
  TextArea,
  // @ts-ignore
  Stack,
  Grid,
  Column,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import ParticipantsForm from '@/components/participants-form/participants-form';
import { useSoftware } from '@/contexts';

const HomePage = () => {
  const { push } = useRouter();
  const { softwareInfo, updateSoftwareInfo } = useSoftware();
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para manejar errores de validación

  const validateForm = () => {
    console.log(softwareInfo);
    const newErrors: typeof errors = {};

    // Validaciones
    if (!softwareInfo.date) {
      newErrors.date = 'La fecha no puede estar vacía';
    }
    if (!softwareInfo.city || softwareInfo.city.length > 255) {
      newErrors.city = 'La ciudad no puede estar vacía';
    }
    if (!softwareInfo.company || softwareInfo.company.length > 255) {
      newErrors.company = 'La empresa no puede estar vacía';
    }
    if (!softwareInfo.phone || softwareInfo.phone.length > 255) {
      newErrors.phone = 'El teléfono no puede estar vacío';
    }
    if (!softwareInfo.softwareName || softwareInfo.softwareName.length > 255) {
      newErrors.softwareName = 'El nombre del software no puede estar vacío';
    }
    if (!softwareInfo.generalObjectives) {
      newErrors.generalObjectives =
        'Los objetivos generales no pueden estar vacíos';
    }
    if (!softwareInfo.specificObjectives) {
      newErrors.specificObjectives =
        'Los objetivos específicos no pueden estar vacíos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateSoftwareInfo({
      ...softwareInfo,
      [e.target.id]: e.target.value,
    });
    // Limpiar errores de validación al cambiar
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: '' });
    }
  };

  const handleDateChange = ([date1]: Date[]) => {
    updateSoftwareInfo({
      ...softwareInfo,
      date: date1.toLocaleDateString(),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log('Errores de validación:', errors);
      return; // Detiene el envío del formulario si hay errores
    }
    console.log(softwareInfo);
    push('/encuesta');
  };

  // Rest of the code...

  return (
    <Grid condensed>
      <Column span={8} lg={{ offset: 4 }}>
        <Stack gap={7}>
          <header>
            <Stack gap={5}>
              <h1>Plantilla Evaluación</h1>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
              >
                <img
                  src="/img/bg.png"
                  alt="Imagen representativa del proyecto genrada con inteligencia artificial para el proyecto USCO"
                  style={{ maxWidth: '40%' }}
                />
                <p>
                  Este aplicativo es una herramienta interactiva diseñada para
                  facilitar la evaluación y calificación de software en diversos
                  aspectos clave como rendimiento y calidad. Utilizando una
                  plantilla de evaluación estructurada, los evaluadores pueden
                  sistemáticamente revisar y puntuar el software según criterios
                  predefinidos que reflejan los objetivos generales y
                  específicos del software en cuestión.
                </p>
              </div>
            </Stack>
          </header>

          <Form onSubmit={handleSubmit}>
            <Stack gap={7}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridGap: '1rem',
                }}
              >
                <DatePicker
                  datePickerType="single"
                  onChange={handleDateChange}
                  style={{ width: '100%' }}
                >
                  <DatePickerInput
                    id="date"
                    labelText="Fecha"
                    invalid={!!errors.date}
                    invalidText={errors.date || ''}
                  />
                </DatePicker>
                <TextInput
                  id="city"
                  labelText="Ciudad"
                  value={softwareInfo.city}
                  onChange={handleChange}
                  invalid={!!errors.city}
                  invalidText={errors.city || ''}
                  maxLength={255}
                />
                <TextInput
                  id="company"
                  labelText="Empresa"
                  value={softwareInfo.company}
                  onChange={handleChange}
                  invalid={!!errors.company}
                  invalidText={errors.company || ''}
                  maxLength={255}
                />
                <TextInput
                  id="phone"
                  labelText="Teléfono"
                  value={softwareInfo.phone}
                  onChange={handleChange}
                  invalid={!!errors.phone}
                  invalidText={errors.phone || ''}
                  maxLength={255}
                />
                <div style={{ gridColumn: '1 / 3' }}>
                  <TextInput
                    id="softwareName"
                    labelText="Nombre del Software"
                    value={softwareInfo.softwareName}
                    onChange={handleChange}
                    invalid={!!errors.softwareName}
                    invalidText={errors.softwareName || ''}
                    maxLength={255}
                  />
                </div>
                <div style={{ gridColumn: '1 / 3' }}>
                  <TextArea
                    id="generalObjectives"
                    labelText="Objetivos Generales del Software"
                    value={softwareInfo.generalObjectives}
                    onChange={handleChange}
                    invalid={!!errors.generalObjectives}
                    invalidText={errors.generalObjectives || ''}
                  />
                </div>
                <div style={{ gridColumn: '1 / 3' }}>
                  <TextArea
                    id="specificObjectives"
                    labelText="Objetivos Específicos del Software"
                    value={softwareInfo.specificObjectives}
                    onChange={handleChange}
                    invalid={!!errors.specificObjectives}
                    invalidText={errors.specificObjectives || ''}
                  />
                </div>
              </div>

              <ParticipantsForm />

              <Button type="submit">Empezar</Button>
            </Stack>
          </Form>
        </Stack>
      </Column>
    </Grid>
  );
};

export default HomePage;
