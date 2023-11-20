import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

// Tipos de datos proporcionados
type ContextType = {
  sliderValue: number;
  surveyFinished: boolean;
  softwareInfo: {
    date: string;
    city: string;
    company: string;
    phone: string;
    softwareName: string;
    generalObjectives: string;
    specificObjectives: string;
  };
  participants: {
    position: string;
    name: string;
    signature: string;
  }[];
  parametrization: {
    id: number;
    item: string;
    description: string;
    questions: number;
    totalPercentage: number;
  }[];
  answers: {
    sections: {
      id: number;
      title: string;
      description: string;
      items: {
        id: number;
        title_item: string;
        description_item: string;
        value: number;
        observation: string;
      }[];
    }[];
  };

  updateSliderValue: (value: number) => void;
  updateSurveyFinished: (value: boolean) => void;
  updateSoftwareInfo: (info: typeof defaultContext.softwareInfo) => void;
  updateParticipants: (parts: typeof defaultContext.participants) => void;
  updateParametrization: (param: typeof defaultContext.parametrization) => void;
  updateParameter: (parameterId: number, percentage: number) => void;
  updateAnswers: (ans: typeof defaultContext.answers) => void;
  updateAnswer: (
    sectionId: number,
    questionId: number,
    value: number,
    observation: string,
  ) => void;
};

// Estado inicial por defecto
const defaultContext: ContextType = {
  sliderValue: 50,
  surveyFinished: true,
  softwareInfo: {
    date: '',
    city: '',
    company: '',
    phone: '',
    softwareName: '',
    generalObjectives: '',
    specificObjectives: '',
  },
  participants: [],
  parametrization: [
    {
      id: 1,
      item: 'FUNCIONALIDAD',
      description:
        'La capacidad del software de cumplir con las funciones para satisfacer las necesidades explícitas e implícitas cuando es utilizado en condiciones específicas.',
      questions: 5,
      totalPercentage: 14,
    },
    {
      id: 2,
      item: 'FIABILIDAD',
      description:
        'La capacidad del software para asegurar un nivel de funcionamiento adecuado cuando es utilizando en condiciones especificas.',
      questions: 4,
      totalPercentage: 14,
    },
    {
      id: 3,
      item: 'USABILIDAD',
      description:
        'La capacidad del software de ser entendido, aprendido, y usado en forma fácil y atractiva',
      questions: 5,
      totalPercentage: 15,
    },
    {
      id: 4,
      item: 'EFICIENCIA',
      description:
        'La forma del desempeño adecuado, de acuerdo a al número recursos utilizados según las condiciones planteadas',
      questions: 3,
      totalPercentage: 15,
    },
    {
      id: 5,
      item: 'CAPACIDAD DE MANTENIMIENTO',
      description:
        'La cualidad que tiene el software para ser modificado. Incluyendo correcciones o mejoras del software, a cambios en el entorno, y especificaciones de requerimientos funcionales.',
      questions: 5,
      totalPercentage: 14,
    },
    {
      id: 6,
      item: 'PORTABILIDAD',
      description:
        'La capacidad que tiene el software para ser trasladado de un entorno a otro. cubriendo entornos organizacionales, de hardware o de software',
      questions: 5,
      totalPercentage: 14,
    },
    {
      id: 7,
      item: 'CALIDAD EN USO',
      description:
        'Capacidad del software para permitirles a usuarios lograr las metas propuestas con eficacia, productividad, seguridad y satisfacción, en contextos especificados de uso',
      questions: 6,
      totalPercentage: 14,
    },
  ],
  answers: {
    sections: [
      {
        id: 1,
        title: 'FUNCIONALIDAD',
        description:
          'La capacidad del software para proveer las funciones que satisfacen las necesidades explícitas e implícitas cuando el software se utiliza bajo condiciones específicas.',
        items: [
          {
            id: 1,
            title_item: 'Adecuación',
            description_item:
              'La capacidad del  software para proveer un adecuado conjunto de funciones para las tareas y objetivos especificados por el usuario. Ejemplos de adecuación son la composición orientada a tareas de funciones a partir de sub funciones que las constituyen, y las capacidades de las tablas.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Exactitud',
            description_item:
              'La capacidad del  software para proveer los resultados o efectos acordados con un grado necesario de precisión.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Interoperabilidad',
            description_item:
              'La capacidad del software de interactuar con uno o más sistemas especificados. La interoperabilidad  se utiliza en lugar de compatibilidad para evitar una posible ambigüedad con la reemplazabilidad.',
            value: 0,
            observation: '',
          },
          {
            id: 4,
            title_item: 'Seguridad',
            description_item:
              'La capacidad del software para proteger la información y los datos de modo que las personas o los sistemas no autorizados no puedan leerlos o modificarlos, y a las personas o  sistemas autorizados  no se les niegue el acceso a ellos. La seguridad en un sentido amplio se define como característica de la calidad en uso, pues no se relaciona con el software solamente, sino con todo un sistema.',
            value: 0,
            observation: '',
          },
          {
            id: 5,
            title_item: 'Conformidad de la funcionalidad',
            description_item:
              'La  capacidad  del software  de  adherirse  a  los  estándares, convenciones o regulaciones legales y  prescripciones similares referentes a la funcionalidad.',
            value: 0,
            observation: '',
          },
        ],
      },
      {
        id: 2,
        title: 'FIABILIDAD',
        description:
          'La  capacidad  del software  para  mantener  un  nivel  específico   de funcionamiento cuando se está utilizando bajo condiciones especificadas.',
        items: [
          {
            id: 1,
            title_item: 'Madurez',
            description_item:
              'La capacidad del  software para  evitar fallas como resultado de errores en el software.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Tolerancia a errores',
            description_item:
              'La capacidad del producto de software para mantener un nivel especificado de funcionamiento en caso de errores del software o de incumplimiento de su interfaz especificada. El nivel especificado de funcionamiento puede incluir la falta de capacidad de seguridad.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Recuperabilidad',
            description_item:
              'La capacidad del software para restablecer un nivel especificado de funcionamiento y  recuperar los datos afectados directamente en el caso de una falla. Después de una falla, un software a veces estará no disponible por cierto período del tiempo, intervalo en el cual se evaluará su recuperabilidad.',
            value: 0,
            observation: '',
          },
          {
            id: 4,
            title_item: 'Conformidad de la fiabilidad',
            description_item:
              'La  capacidad  del  software  para  adherirse  a  las  normas, convenciones o regulaciones relativas a la fiabilidad.',
            value: 0,
            observation: '',
          },
        ],
      },
      {
        id: 3,
        title: 'USABILIDAD',
        description:
          'La capacidad del software de ser entendido, aprendido, usado y atractivo al usuario, cuando es utilizado bajo las condiciones especificadas.',
        items: [
          {
            id: 1,
            title_item: 'Entendimiento',
            description_item:
              'La capacidad del software para  permitir al usuario entender si el software  es  adecuado,  y  cómo  puede  ser  utilizado  para  las  tareas  y  las condiciones particulares de la aplicación. Esto dependerá de la documentación y de las impresiones iniciales dadas por el software.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Aprendizaje',
            description_item:
              'La capacidad del  software para  permitir al usuario aprender su aplicación.  Un aspecto importante a considerar aquí es la documentación del software.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Operabilidad',
            description_item:
              'La  capacidad  del  software  para  permitir  al  usuario  operarlo  y controlarlo. Los aspectos de propiedad, de cambio, de adaptabilidad y de instalación pueden afectar la operabilidad.',
            value: 0,
            observation: '',
          },
          {
            id: 4,
            title_item: 'Atracción',
            description_item:
              'La capacidad del  software de ser atractivo al usuario. Esto se refiere a las cualidades del software para hacer el software más atractivo al usuario, tal como el uso del color y la naturaleza del diseño gráfico',
            value: 0,
            observation: '',
          },
          {
            id: 5,
            title_item: 'Conformidad de uso',
            description_item:
              'La  capacidad  del  software  para  adherirse  a  los  estándares, convenciones, guías de estilo o regulaciones relacionadas a su usabilidad.',
            value: 0,
            observation: '',
          },
        ],
      },
      {
        id: 4,
        title: 'EFICIENCIA',
        description:
          'La capacidad del software de  proveer un  desempeño adecuado, de acuerdo a la cantidad de recursos utilizados y bajo las condiciones especificas.',
        items: [
          {
            id: 1,
            title_item: 'Comportamiento de tiempos',
            description_item:
              'La capacidad del software para proveer tiempos adecuados de respuesta y procesamiento, y ratios de rendimiento cuando realiza su función bajo las condiciones establecidas.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Utilización de recursos',
            description_item:
              'La  capacidad  del software  para  utilizar   cantidades  y  tipos adecuados   de   recursos   cuando   este   funciona   bajo   las   condiciones establecidas. Los recursos humanos están incluidos dentro del concepto de productividad.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Conformidad de eficiencia',
            description_item:
              'La  capacidad  del  producto  de  software  para  adherirse  a  estándares  o convenciones relacionados a la eficiencia.',
            value: 0,
            observation: '',
          },
        ],
      },
      {
        id: 5,
        title: 'CAPACIDAD DE MANTENIMIENTO',
        description:
          'Capacidad del software para ser modificado. Las modificaciones pueden incluir correcciones, mejoras o adaptación del  software a cambios en el entorno, y especificaciones de requerimientos funcionales.',
        items: [
          {
            id: 1,
            title_item: 'Capacidad de ser analizado',
            description_item:
              'La  capacidad  del  software  para  atenerse  a  diagnósticos  de deficiencias o causas de fallas en el software o la identificación de las partes a ser modificadas.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Cambiabilidad',
            description_item:
              'La capacidad del software para permitir que una determinada modificación sea implementada. Implementación incluye codificación, diseño y documentación de cambios. Si el software va a ser modificado por el usuario final, la cambiabilidad podría afectar la operabilidad.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Estabilidad',
            description_item:
              'La capacidad del software para evitar efectos inesperados debido a modificaciones del software.',
            value: 0,
            observation: '',
          },
          {
            id: 4,
            title_item: 'Facilidad de prueba',
            description_item:
              'La capacidad del software para permitir que las modificaciones sean validadas',
            value: 0,
            observation: '',
          },
          {
            id: 5,
            title_item: 'Conformidad de facilidad de mantenimiento',
            description_item:
              'La  capacidad  del  software  para   adherirse  a  estándares  o  convenciones relativas a la facilidad de mantenimiento.',
            value: 0,
            observation: '',
          },
        ],
      },
      {
        id: 6,
        title: 'PORTABILIDAD',
        description:
          'La capacidad del software para ser trasladado de un entorno a otro. El entorno puede incluir entornos organizacionales, de hardware o de software.',
        items: [
          {
            id: 1,
            title_item: 'Adaptabilidad',
            description_item:
              'La capacidad del software para ser adaptado a diferentes entornos especificados sin aplicar acciones o medios diferentes de los previstos para el propósito del software considerado. Adaptabilidad incluye la escalabilidad de capacidad interna (Ejemplo: Campos en pantalla, tablas, volúmenes de transacciones, formatos de reporte, etc.). Si  el  software  va  a   ser  adaptado  por  el  usuario  final,  la  adaptabilidad corresponde  a  la  conveniencia  de  la  individualización,  y  podría  afectar  la operabilidad.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Facilidad de instalación',
            description_item:
              'La  capacidad  del  software  para  ser  instalado  en  un  ambiente especificado. Si el software va a ser instalado por el usuario final, puede afectar la propiedad y operatividad resultantes.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Coexistencia',
            description_item:
              'La capacidad del software para coexistir con otros productos de software independientes dentro de un  mismo  entorno, compartiendo  recursos comunes.',
            value: 0,
            observation: '',
          },
          {
            id: 4,
            title_item: 'Reemplazabilidad',
            description_item:
              'La  capacidad  del  software  para  ser  utilizado  en  lugar  de  otro software, para el mismo propósito y  en el mismo entorno. Por  ejemplo,  la  reemplazabilidad  de  una  nueva  versión  de  un  software es importante para el usuario cuando dicho software es actualizado (actualizaciones, upgrades).',
            value: 0,
            observation: '',
          },
          {
            id: 5,
            title_item: 'Conformidad de portabilidad',
            description_item:
              'La  capacidad  del  software  para  adherirse  a  estándares  o  convenciones relacionados a la portabilidad',
            value: 0,
            observation: '',
          },
        ],
      },
      {
        id: 7,
        title: 'CALIDAD EN USO',
        description:
          'La capacidad del software para permitirles a usuarios específicos lograr las  metas  propuestas  con  eficacia,  productividad,  seguridad  y  satisfacción,  en contextos especificados de uso.',
        items: [
          {
            id: 1,
            title_item: 'Eficacia',
            description_item:
              'La capacidad del  software para permitir a los usuarios lograr las metas especificadas con exactitud e integridad, en un contexto especificado de uso.',
            value: 0,
            observation: '',
          },
          {
            id: 2,
            title_item: 'Productividad',
            description_item:
              'La capacidad del software para  permitir a los usuarios emplear cantidades  apropiadas  de  recursos,  en  relación  a  la  eficacia  lograda  en  un contexto especificado de uso. Los recursos relevantes pueden incluir: tiempo para completar la tarea, esfuerzo del usuario, materiales o costo financiero.',
            value: 0,
            observation: '',
          },
          {
            id: 3,
            title_item: 'Seguridad',
            description_item:
              'La capacidad del software para lograr niveles aceptables de riesgo de daño a las personas, institución, software, propiedad (licencias, contratos de uso de software) o entorno, en un contexto especificado de uso. Los riesgos son normalmente el resultado de deficiencias en la funcionalidad (incluyendo seguridad), fiabilidad, usabilidad o facilidad de mantenimiento.',
            value: 0,
            observation: '',
          },
          {
            id: 4,
            title_item: 'Satisfacción',
            description_item:
              'La capacidad del software para  satisfacer a los usuarios en un contexto especificado de uso. La satisfacción es la respuesta del usuario a la interacción con el producto, e incluye las actitudes hacia el uso del producto.',
            value: 0,
            observation: '',
          },
          {
            id: 5,
            title_item: 'Mercadeo',
            description_item:
              'El tiempo que tiene el software o proveedor en el caso del que producto sea a la medida en el mercado. Menor a un año=0,  de 1 a 2 años =1, de 2 a 3 años=2   y de mas de 3 años=3',
            value: 0,
            observation: '',
          },
          {
            id: 6,
            title_item: 'Estandarizacion',
            description_item:
              'Numero de Instalaciones en diferentes empresas locales, si es un producto a la medida Numero de Softwares instalados por el proveedor. Ninguno=0, de 1 a 3=1 de 4 a 6=2 , mas 6 =3',
            value: 0,
            observation: '',
          },
        ],
      },
    ],
  },
  updateSliderValue: () => {},
  updateSurveyFinished: () => {},
  updateSoftwareInfo: () => {},
  updateParticipants: () => {},
  updateParametrization: () => {},
  updateParameter: () => {},
  updateAnswers: () => {},
  updateAnswer: () => {},
};

// Creación del contexto
export const SoftwareContext = createContext<ContextType>(defaultContext);

// Proveedor del contexto
export const SoftwareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sliderValue, setSliderValue] = useState(defaultContext.sliderValue);
  const [surveyFinished, setSurveyFinished] = useState(
    defaultContext.surveyFinished,
  );
  const [softwareInfo, setSoftwareInfo] = useState(defaultContext.softwareInfo);
  const [participants, setParticipants] = useState(defaultContext.participants);
  const [parametrization, setParametrization] = useState(
    defaultContext.parametrization,
  );
  const [answers, setAnswers] = useState(defaultContext.answers);

  const updateSliderValue = useCallback((value: number) => {
    setSliderValue(value);
  }, []);

  const updateSurveyFinished = useCallback((value: boolean) => {
    setSurveyFinished(value);
  }, []);

  // Funciones para actualizar el estado
  const updateSoftwareInfo = useCallback(
    (info: ContextType['softwareInfo']) => {
      setSoftwareInfo(info);
    },
    [],
  );

  const updateParticipants = useCallback(
    (parts: ContextType['participants']) => {
      setParticipants(parts);
    },
    [],
  );

  const updateParametrization = useCallback(
    (param: ContextType['parametrization']) => {
      setParametrization(param);
    },
    [],
  );

  const updateParameter = useCallback(
    (parameterId: number, percentage: number) => {
      const newParametrization = [...parametrization];
      const parameterIndex = newParametrization.findIndex(
        (parameter) => parameter.id === parameterId,
      );
      newParametrization[parameterIndex].totalPercentage = percentage;
      setParametrization(newParametrization);
    },
    [parametrization],
  );

  const updateAnswers = useCallback((ans: ContextType['answers']) => {
    setAnswers(ans);
  }, []);

  const updateAnswer = useCallback(
    (
      sectionId: number,
      questionId: number,
      value: number,
      observation: string,
    ) => {
      const newAnswers = { ...answers };
      const sectionIndex = newAnswers.sections.findIndex(
        (section) => section.id === sectionId,
      );
      const questionIndex = newAnswers.sections[sectionIndex].items.findIndex(
        (item) => item.id === questionId,
      );
      newAnswers.sections[sectionIndex].items[questionIndex].value = value;
      newAnswers.sections[sectionIndex].items[questionIndex].observation =
        observation;
      setAnswers(newAnswers);
    },
    [answers],
  );

  // Memorización de valores del contexto
  const contextValues = useMemo(
    () => ({
      sliderValue,
      updateSliderValue,
      surveyFinished,
      updateSurveyFinished,
      softwareInfo,
      updateSoftwareInfo,
      participants,
      updateParticipants,
      parametrization,
      updateParametrization,
      updateParameter,
      answers,
      updateAnswers,
      updateAnswer,
    }),
    [
      softwareInfo,
      participants,
      parametrization,
      answers,
      sliderValue,
      surveyFinished,
    ],
  );

  return (
    <SoftwareContext.Provider value={contextValues}>
      {children}
    </SoftwareContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSoftware = () => {
  const ctx = useContext(SoftwareContext);

  if (ctx === undefined) {
    throw new Error('useSoftware debe ser usado dentro de un SoftwareProvider');
  }

  return ctx;
};
