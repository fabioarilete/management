import React from 'react';
import ReactDOM from 'react-dom';

export enum ModalTarget {
  MODAL = 'modal',
  ROOT = 'root',
}

interface ModalProps {
  target: ModalTarget;
  children: any;
}

export const Modal: React.FC<ModalProps> = ({ target, children }) => {
  const domElement = document.getElementById(target);

  return domElement ? ReactDOM.createPortal(children, domElement) : null;
};
