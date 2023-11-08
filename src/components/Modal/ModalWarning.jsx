import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { SecondGreyBtn, DestructiveBtn } from '../Button';
import { AlertIcon } from '../../images/svg';

const modalContainer = document.getElementById('modal-root');

export const ModalWarning = ({ onFinishChat, closeModal }) => {
  useEffect(() => {
    const handleEscape = evt => {
      if (evt.code === `Escape`) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeModal]);

  const onBackdropOpen = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      onMouseDown={onBackdropOpen}
      className="fixed z-40 top-[0] left-[0] w-[100vw] h-[100vh] bg-bgColors-backDrop"
    >
      <div
        className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   flex flex-col gap-m2 py-m px-s w-[400px] h-auto items-center justify-center
                 bg-bgColors-white rounded-medium"
      >
        <div className="flex flex-col gap-xs items-center justify-center">
          <AlertIcon />
          <div className="flex flex-col gap-xs2 items-center justify-center leading-6 tracking-textBase">
            <h4 className="font-medium text-xl text-textColors-primary">
              Завершити чат з оператором?
            </h4>
            <p className="font-normal text-base text-textColors-secondary text-center">
              Ви впевнені, що хочете завершити діалог з оператором?
            </p>
          </div>
        </div>
        <div className="flex gap-xs justify-between">
          <SecondGreyBtn onClick={closeModal}>Скасувати</SecondGreyBtn>
          <DestructiveBtn to="/" onClick={() => onFinishChat()}>
            Так, завершити
          </DestructiveBtn>
        </div>
      </div>
    </div>,
    modalContainer
  );
};

ModalWarning.propTypes = {
  onFinishChat: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
