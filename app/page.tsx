'use client';
// import { Button } from '@carbon/react';
//import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Form, TextInput, Button, TextArea } from '@carbon/react';
import { useState } from 'react';
import ParticipantsForm from '@/components/participants-form/participants-form';
import { useSoftware } from '@/contexts';

const HomePage = () => {
  const { push } = useRouter();
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
    <div>
      <header>
        <h1
          style={{
            padding: '1rem',
          }}
        >
          PLANTILLA EVALUACION
        </h1>
        <p
          style={{
            paddingBottom: '1rem',
          }}
        >
          Este aplicativo es una herramienta interactiva diseñada para facilitar
          la evaluación y calificación de software en diversos aspectos clave
          como rendimiento y calidad. Utilizando una plantilla de evaluación
          estructurada, los evaluadores pueden sistemáticamente revisar y
          puntuar el software según criterios predefinidos que reflejan los
          objetivos generales y específicos del software en cuestión.
        </p>
      </header>

      <Form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <TextInput
          id="date"
          labelText="Fecha"
          value={formData.date}
          onChange={handleChange}
          defaultValue={new Date().toLocaleDateString()}
        />
        <TextInput
          id="city"
          labelText="Ciudad"
          value={formData.city}
          onChange={handleChange}
        />
        <TextInput
          id="company"
          labelText="Empresa"
          value={formData.company}
          onChange={handleChange}
        />
        <TextInput
          id="phone"
          labelText="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextInput
          id="softwareName"
          labelText="Nombre del Software"
          value={formData.softwareName}
          onChange={handleChange}
        />

        <TextArea
          id="generalObjectives"
          labelText="Objetivos Generales del Software"
          value={formData.generalObjectives}
          onChange={handleChange}
          placeholder="Ingrese los objetivos generales del software aquí"
          rows={4}
          style={{ marginBottom: '1rem' }} // Asegura espacio entre los campos
        />
        <TextArea
          id="specificObjectives"
          labelText="Objetivos Específicos del Software"
          value={formData.specificObjectives}
          onChange={handleChange}
          placeholder="Ingrese los objetivos específicos del software aquí"
          rows={4}
          style={{ marginBottom: '1rem' }} // Asegura espacio entre los campos
        />

        <ParticipantsForm onParticipantsChange={setParticipants} />

        <Button type="submit">Empezar</Button>
      </Form>
    </div>
  );
};

export default HomePage;
