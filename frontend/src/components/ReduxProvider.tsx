"use client";
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef(store);
  
  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
} 