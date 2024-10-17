'use client';

import { Assessment } from '@/@types/codegen/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export const defaultLocale = 'en-gb';

interface UIContextI {
  activeAssessment: Assessment | null;
  createAssessmentModalOpen: boolean;
  headerDropdownOpen: boolean;
  setActiveAssessment: (assessment: Assessment) => void;
  openAssessmentModal: (
    assessment?: Assessment,
    updateAssessment?: boolean,
  ) => void;
  setCreateAssessmentModalOpen: (open: boolean) => void;
  setHeaderDropdownOpen: (open: boolean) => void;
}

export const UIContext = createContext<UIContextI>({
  activeAssessment: null,
  createAssessmentModalOpen: false,
  headerDropdownOpen: false,
  setActiveAssessment: () => {},
  openAssessmentModal: () => {},
  setCreateAssessmentModalOpen: () => {},
  setHeaderDropdownOpen: () => {},
});

export const UIContextProvider = ({ children }: PropsWithChildren) => {
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(
    null,
  );
  const [createAssessmentModalOpen, setCreateAssessmentModalOpen] =
    useState(false);
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false);

  const openAssessmentModal = (
    assessment?: Assessment,
    updateAssessment = false,
  ) => {
    setActiveAssessment(updateAssessment && assessment ? assessment : null);
    setCreateAssessmentModalOpen(true);
    setHeaderDropdownOpen(false);
  };

  return (
    <UIContext.Provider
      value={{
        activeAssessment,
        setActiveAssessment,
        openAssessmentModal,
        createAssessmentModalOpen,
        setCreateAssessmentModalOpen,
        headerDropdownOpen,
        setHeaderDropdownOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const value = useContext(UIContext);

  if (!value) throw new Error('Got undefined ui context!');

  return value;
};
