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
import './modal.scss';

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
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
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
  contentModifier?: 'full-width';
  centered?: boolean;
  title?: string;
  description?: string | ReactNode;
}

const ModalWindow = ({
  children,
  id,
  size = 'small',
  preventClose = false,
  contentModifier,
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

  return (
    <div
      id={id}
      role="dialog"
      ref={windowRef}
      className={classNames('modal-window', `modal-window--${size}`)}
    >
      {!preventClose && (
        <button className="modal__close-btn" onClick={() => closeModal()}>
          <svg className="icon">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      )}
      <div
        className={classNames(
          'modal__content',
          contentModifier && 'modal__content--' + contentModifier,
          centered && 'modal__content--center',
        )}
      >
        {title && description && (
          <div className="modal__content-header">
            <h2 className="modal__title">{title}</h2>
            {description && <div className="rte">{description}</div>}
          </div>
        )}

        {children}
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
        'modal-overlay',
        hasModals && 'modal-overlay--visible',
      )}
    >
      {hasModals ? modals[0] : null}
    </div>
  );
};

Modal.Window = ModalWindow;

export { Modal, useModal };
