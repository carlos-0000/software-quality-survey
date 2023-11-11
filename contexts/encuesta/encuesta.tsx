import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

// Tipos de datos proporcionados
type ContextType = {
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
  answers: {
    sections: {
      id: string;
      questions: {
        id: string;
        answer: number;
        observations: string;
      }[];
    }[];
  };
  updateSoftwareInfo: (info: typeof defaultContext.softwareInfo) => void;
  updateParticipants: (parts: typeof defaultContext.participants) => void;
  updateAnswers: (ans: typeof defaultContext.answers) => void;
};

// Estado inicial por defecto
const defaultContext: ContextType = {
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
  answers: {
    sections: [],
  },
  updateSoftwareInfo: () => {
    /* Comment for avoid eslint error for empty function */
  },
  updateParticipants: () => {
    /* Comment for avoid eslint error for empty function */
  },
  updateAnswers: () => {
    /* Comment for avoid eslint error for empty function */
  },
};

// Creación del contexto
export const SoftwareContext = createContext<ContextType>(defaultContext);

// Proveedor del contexto
export const SoftwareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [softwareInfo, setSoftwareInfo] = useState(defaultContext.softwareInfo);
  const [participants, setParticipants] = useState(defaultContext.participants);
  const [answers, setAnswers] = useState(defaultContext.answers);

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

  const updateAnswers = useCallback((ans: ContextType['answers']) => {
    setAnswers(ans);
  }, []);

  // Memorización de valores del contexto
  const contextValues = useMemo(
    () => ({
      softwareInfo,
      updateSoftwareInfo,
      participants,
      updateParticipants,
      answers,
      updateAnswers,
    }),
    [softwareInfo, participants, answers],
  );

  return (
    <SoftwareContext.Provider value={contextValues}>
      {children}
    </SoftwareContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSoftware = () => {
  const {
    softwareInfo,
    updateSoftwareInfo,
    participants,
    updateParticipants,
    answers,
    updateAnswers,
  } = useContext(SoftwareContext);

  return {
    softwareInfo,
    updateSoftwareInfo,
    participants,
    updateParticipants,
    answers,
    updateAnswers,
  };
};
