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
import { ArrowRight, ViewFilled } from '@carbon/icons-react';

const HomePage = () => {
  const { push } = useRouter();
  const { softwareInfo, updateSoftwareInfo, participants } = useSoftware();
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
    if (participants.length === 0) {
      newErrors.participants = 'Debe haber al menos un participante';
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
      <Column span={12} lg={{ offset: 2 }}>
        <Stack gap={7}>
          <header>
            <Stack gap={5}>
              <h1>Plantilla Evaluación</h1>

              <div className="header-content">
                <img
                  src="/img/bg.png"
                  alt="Imagen representativa del proyecto generada con inteligencia artificial para el proyecto USCO"
                  className="header-image"
                />
                <p className="header-text">
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
              <div className="input-grid">
                <div className="input-group">
                  <DatePicker
                    datePickerType="single"
                    onChange={handleDateChange}
                    className="date-picker"
                  >
                    <DatePickerInput
                      id="date"
                      labelText="Fecha *"
                      invalid={!!errors.date}
                      invalidText={errors.date || ''}
                    />
                  </DatePicker>
                  <TextInput
                    id="city"
                    labelText="Ciudad *"
                    value={softwareInfo.city}
                    onChange={handleChange}
                    invalid={!!errors.city}
                    invalidText={errors.city || ''}
                    maxLength={255}
                  />
                  <TextInput
                    id="company"
                    labelText="Empresa *"
                    value={softwareInfo.company}
                    onChange={handleChange}
                    invalid={!!errors.company}
                    invalidText={errors.company || ''}
                    maxLength={255}
                  />
                  <TextInput
                    id="phone"
                    labelText="Teléfono *"
                    value={softwareInfo.phone}
                    onChange={handleChange}
                    invalid={!!errors.phone}
                    invalidText={errors.phone || ''}
                    maxLength={255}
                  />
                </div>
                <div className="full-width-input">
                  <TextInput
                    id="softwareName"
                    labelText="Nombre del Software *"
                    value={softwareInfo.softwareName}
                    onChange={handleChange}
                    invalid={!!errors.softwareName}
                    invalidText={errors.softwareName || ''}
                    maxLength={255}
                  />
                </div>
                <div className="full-width-input">
                  <TextArea
                    id="generalObjectives"
                    labelText="Objetivos Generales del Software *"
                    value={softwareInfo.generalObjectives}
                    onChange={handleChange}
                    invalid={!!errors.generalObjectives}
                    invalidText={errors.generalObjectives || ''}
                  />
                </div>
                <div className="full-width-input">
                  <TextArea
                    id="specificObjectives"
                    labelText="Objetivos Específicos del Software *"
                    value={softwareInfo.specificObjectives}
                    onChange={handleChange}
                    invalid={!!errors.specificObjectives}
                    invalidText={errors.specificObjectives || ''}
                  />
                </div>
              </div>

              <ParticipantsForm />

              {errors.participants && (
                <p style={{ color: 'red' }}>{errors.participants}</p>
              )}
              <div style={{ marginBottom: '2rem' }}>
                <Button
                  kind="secondary"
                  renderIcon={ViewFilled}
                  onClick={() => {
                    push('/historial');
                  }}
                  style={{ marginRight: '1rem', marginBottom: '1rem' }}
                >
                  Ver software evaluados
                </Button>
                <Button type="submit" renderIcon={ArrowRight}>
                  Siguiente
                </Button>
              </div>
            </Stack>
          </Form>
        </Stack>
      </Column>
    </Grid>
  );
};

export default HomePage;
