import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addToHistoryList } from "../redux/slices/historySlice";

export const useScoreHooks = () => {
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const highScore = localStorage.getItem('highScore') !== null ? JSON.parse(localStorage.getItem('highScore')) : 0;

  //função para computar resposta selecionada na rodada
  const chooseAnswer = useCallback((answer, colorToGuess, answerTimer, generateHexColorOptions, setAnswerTimer) => {
    if (answer === colorToGuess) {
      // se a resposta for correta adiciona 5 pontos
      setScore((prevState) => prevState + 5);
    } else {
      // se a resposta for errada subtrai 1 ponto
      setScore((prevState) => prevState > 0 ? prevState - 1 : 0);
    }

    // salva a resposta no histórico
    dispatch(addToHistoryList({
      color: colorToGuess,
      answer: answer,
      time: 10 - answerTimer
    }));
    // reseta o timer
    setAnswerTimer(9);
    // gera as cores da próxima rodada
    generateHexColorOptions();
  }, []);

  const checkHighScore = useCallback(() => {// função que verifica se o recorde foi batido
    if (score > highScore) {
      localStorage.setItem('highScore', JSON.stringify(score))
    }
  }, [score, highScore]);

  return {
    score,
    setScore,
    highScore,
    chooseAnswer,
    checkHighScore
  }
}