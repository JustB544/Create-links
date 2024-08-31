import { useEffect } from 'react';
import { EventEmitter } from 'eventemitter3';

const emitter = new EventEmitter();

const useSub = (event : string, callback : (...args: any[]) => void) => {
  const unsubscribe = () => {
    emitter.off(event, callback);
  };

  useEffect(() => {
    emitter.on(event, callback);
    return unsubscribe;
  }, []);

  return unsubscribe;
};

const usePub = () => {
    return (event : string) => {
      emitter.emit(event);
    };
};

export { useSub, usePub };