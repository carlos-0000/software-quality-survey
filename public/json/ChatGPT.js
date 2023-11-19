function generarPromptParaChatGPT(
  encuesta,
  puntajeSaludable,
  puntajeSostenible,
) {
  let prompt =
    'Hola, acabo de responder una encuesta sobre cómo me alimento con un enfoque en sostenibilidad y salud. Obtuve un puntaje de ' +
    puntajeSaludable +
    "% en la sección 'Saludable' y un " +
    puntajeSostenible +
    "% en la sección 'Sostenible'. Cada pregunta tenía cuatro opciones de respuesta, donde 1 es el valor mínimo y 4 es el máximo. Aquí están algunas de mis respuestas específicas:\n\n";

  encuesta.forEach((seccion) => {
    prompt += `Sección: ${seccion.title}\n`;
    seccion.items.forEach((item) => {
      const respuestaSeleccionada = item.options.find(
        (op) => op.value === item.respuesta,
      );
      prompt += `- Pregunta: ${item.title_item}\n  Respuesta Elegida: ${respuestaSeleccionada.label} (Valor: ${respuestaSeleccionada.value})\n`;
    });
    prompt += '\n';
  });

  prompt +=
    'Me gustaría recibir recomendaciones sobre cómo podría mejorar mi alimentación en términos de salud y sostenibilidad basado en estos resultados. ¿Qué me sugieres?';

  return prompt;
}

// Ejemplo de uso
const puntajeSaludable = 85; // Ejemplo de puntaje obtenido en la sección Saludable
const puntajeSostenible = 75; // Ejemplo de puntaje obtenido en la sección Sostenible
const promptParaChatGPT = generarPromptParaChatGPT(
  encuesta,
  puntajeSaludable,
  puntajeSostenible,
);
console.log(promptParaChatGPT);
