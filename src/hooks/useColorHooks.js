import { useCallback, useState } from "react";

export const useColorHooks = () => {
  
  const [colorToGuess, setColorToGuess] = useState('#FFFFFF');
  const [colorOptions, setColorOptions] = useState([]);

  const generateHexColor = useCallback(() => {// função para gerar uma hexcolor aleatória
    const letters = '0123456789ABCDEF';

    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }, []);

  const generateHexColorOptions = useCallback(() => {// função para gerar as ores da rodada
    const colors = [];

    for (let i = 0; i < 3; i++) {
      colors.push(generateHexColor());
      if (i === 0) setColorToGuess(colors[0]);
    }

    setColorOptions(colors.sort())
  }, [colorToGuess])

  return {
    colorToGuess,
    generateHexColorOptions,
    colorOptions,
  }
}