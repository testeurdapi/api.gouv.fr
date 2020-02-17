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
 * Carroussel needs to be wrapped not to recreate the typer iterator at every refresh
 */
const CarrousselWrapper = ({ txtBefore, txtAfter, sentences }) => {
  const typer = typerIterator(sentences);
  return (
    <>
      {txtBefore}
      <TypingCarroussel typer={typer} />
      {txtAfter}
    </>
  );
};

export default CarrousselWrapper;