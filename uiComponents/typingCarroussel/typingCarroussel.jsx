import React, { useState, useRef, useEffect } from 'react';
import typerIterator from './carrousselLogic';

const TypingCarroussel = ({ typer }) => {
  const [text, setText] = useState('');
  const componentIsMounted = useRef(true);

  const infiniteType = () => {
    const textToType = typer.next();
    setText(() => textToType.value + '|');

    if (componentIsMounted.current) {
      window.setTimeout(infiniteType, textToType.time);
    }
  };

  useEffect(() => {
    infiniteType();
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  return <>{text}</>;
};

/**
 * Carroussel that need to get wrapped not to recreate the typer iterator at every refresh
 */
const CarrousselWrapper = ({ prefix, suffix, sentences }) => {
  const typer = typerIterator(sentences);
  return (
    <>
      {prefix}
      <TypingCarroussel typer={typer} />
      {suffix}
    </>
  );
};

export default CarrousselWrapper;
