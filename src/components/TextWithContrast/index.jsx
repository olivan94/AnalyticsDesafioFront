import { useEffect, useState, useRef } from 'react';
import '../GameHistory/styles.css'

export default function TextWithContrast({bgColor}) {
  const [textColor, setTextColor] = useState('black');
  const textRef = useRef(null);

  useEffect(() => {// sempre que recebe uma cor de fundo verifica a luminância para definir se a cor da fonte será preto ou branco
    if (textRef.current) {
      const backgroundColor = getComputedStyle(textRef.current).backgroundColor;
      const r = parseInt(backgroundColor.split('(')[1].split(',')[0]);
      const g = parseInt(backgroundColor.split(',')[1]);
      const b = parseInt(backgroundColor.split(',')[2].split(')')[0]);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

      setTextColor(luminance > 128 ? 'black' : 'white');
    }
  }, [bgColor]);

  return (
    <p ref={textRef} className='hexcolor' style={{backgroundColor: bgColor, color: textColor}} >{bgColor}</p>
  );
}