'use client';

import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { useClickOutside } from '@/app/hooks/useClickOutside';

type ModalNode = React.ReactNode;

interface ModalContextValue {
  modals: ModalNode[];
  visibleModalIds: string[];
  setVisibleModalIds: React.Dispatch<React.SetStateAction<string[]>>;
  registerModal: (modal: ModalNode) => void;
  closeModal: (onClose?: () => void) => void;
}

const ModalContext = createContext<ModalContextValue>({
  modals: [], // List of mounted modal elements
  registerModal: () => {},
  visibleModalIds: [],
  setVisibleModalIds: () => {},
  closeModal: () => {},
});

const useModal = () => useContext(ModalContext);

interface ModalComponent {
  Window: typeof ModalWindow;
}

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ModalContextValue['modals']>([]);
  const [visibleModalIds, setVisibleModalIds] = useState<
    ModalContextValue['visibleModalIds']
  >([]);

  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    }

    return () => {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    };
  }, [modals, visibleModalIds]);

  const value = useMemo(() => {
    const registerModal = (modal: ModalNode) => {
      setModals((prev) => [modal, ...prev]);
    };
    const closeModal = (onClose?: () => void) => {
      setModals((prev) => prev.filter((val) => val === prev));

      if (onClose && typeof onClose === 'function') onClose();
    };
    return {
      modals,
      registerModal,
      visibleModalIds,
      setVisibleModalIds,
      closeModal,
    };
  }, [modals, visibleModalIds, setVisibleModalIds, setModals]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export interface ModalWindowProps extends PropsWithChildren {
  id: string;
  size?: 'small' | 'large';
  preventClose?: boolean;
  fullWidth?: boolean;
  centered?: boolean;
  title?: string;
  description?: string | ReactNode;
}

const ModalWindow = ({
  children,
  id,
  size = 'large',
  preventClose = false,
  fullWidth = false,
  centered = false,
  title,
  description,
}: ModalWindowProps) => {
  const windowRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { visibleModalIds, setVisibleModalIds, closeModal } = useModal();

  useEffect(() => {
    setVisibleModalIds([...visibleModalIds, id]);

    return () => {
      setVisibleModalIds(visibleModalIds.filter((mId) => mId !== id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useClickOutside(windowRef, closeModal);

  return (
    <div
      id={id}
      role="dialog"
      ref={windowRef}
      className={classNames(
        'overflow-auto relative flex flex-col w-full mx-auto bg-white z-50',
        'md:min-h-0 md:inline-block md:align-middle md:text-left',
        size === 'small' ? 'md:max-w-[60%] xl:max-w-[40%]' : 'lg:max-w-3xl',
      )}
    >
      {!preventClose && (
        <button
          className="flex justify-center items-center absolute top-2 right-2 w-10 h-10 bg-dark text-white"
          onClick={() => closeModal()}
        >
          <svg className="icon w-7 h-7 fill-white">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      )}
      <div
        className={classNames(
          'overflow-auto',
          fullWidth ? 'p-0' : 'py-10 px-3 md:py-20',
          centered && 'flex items-center flex-col',
        )}
      >
        <div
          className={classNames(
            'mx-auto mb-20 md:mb-0',
            !fullWidth && 'max-w-[80%] xl:max-w-[500px]',
          )}
        >
          {title && description && (
            <div className="mb-10 w-full">
              <h2 className="text-2xl md:text-4xl mb-6 text-center">{title}</h2>
              {description && <div className="rte">{description}</div>}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

const Modal: FC & ModalComponent = () => {
  const { modals } = useModal();
  const hasModals = modals.length > 0;

  return (
    <div
      className={classNames(
        'fixed w-screen h-screen top-0 left-0',
        'flex flex-col items-center justify-center',
        'bg-black/15 backdrop-blur-sm z-50',
        hasModals ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      {hasModals ? modals[0] : null}
    </div>
  );
};

Modal.Window = ModalWindow;

export { Modal, useModal };
