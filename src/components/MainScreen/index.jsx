import { useCallback, useEffect, useState } from "react";
import { useColorHooks } from "../../hooks/useColorHooks";
import { useDispatch, useSelector } from "react-redux";
import { addToHistoryList, resetHistory } from "../../redux/slices/historySlice";
import { useScoreHooks } from "../../hooks/useScoreHooks";
import './styles.css'

export default function MainScreen() {
  const {
    colorToGuess,
    colorOptions,
    generateHexColorOptions,
  } = useColorHooks();

  const {
    score,
    setScore,
    highScore,
    chooseAnswer,
    checkHighScore,
  } = useScoreHooks();

  const [start, setStart] = useState(false);
  const [gameTimer, setGameTimer] = useState(30);
  const [answerTimer, setAnswerTimer] = useState(9);

  const latestGameResults = useSelector((state) => state.latestGame.latestGameResults);

  const dispatch = useDispatch();

  useEffect(() => { // esse effect controla o timer do jogo (30s)
    let interval;

    if (start) {
      // se o jogo já foi iniciado cria um setInterval para o timer do jogo
      interval = setInterval(() => {
        if (gameTimer > 0) {
          // se o timer do jogo for maior que zero, decrementa o valor do timer
          setGameTimer(gameTimer - 1);
        } else {
          // quado o jogo acaba limpa o intervalo
          clearInterval(interval);
          // seta start para false
          setStart(false);
          // salva o histórico de respostas no storage
          localStorage.setItem('latestGameResults', JSON.stringify(latestGameResults.map(item => item)));
          // verifica se o recorde foi batido e seta o novo valor do mesmo caso seja verdade
          checkHighScore();
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameTimer, start]);

  useEffect(() => {//esse effec controla o timer da jogada
    let interval;

    if (start) {
      //se o jogo já foi iniciado cria um setInterval para o timer da jogada
      interval = setInterval(() => {
        if (answerTimer > 0) {
          // se o timer da jogada for maior que zero, decrementa o valor do timer
          setAnswerTimer(answerTimer - 1);
        } else {
          // caso contrario limpa o intervalo e seta o timer da jogada para o valor inicial
          clearInterval(interval);
          setAnswerTimer(9);
          // despacha uma resposta errada para a lista do histórico
          dispatch(addToHistoryList({
            color: colorToGuess,
            answer: colorToGuess === colorOptions[0] ? colorOptions[1] : colorOptions[0],
            time: 10 - answerTimer
          }));
          // gera a cor e opções para próxima rodada
          generateHexColorOptions();
          // e por fim reduz 2 pontos da pontuação atual de modo que não gere um valor abaixo de zero
          setScore((prevState) => (prevState - 2) >= 0 ? prevState - 2 : 0);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [answerTimer, start]);

  const startGame = useCallback(() => {
    //seta os estados iniciais dos timers e da pontuação
    setScore(0);
    setGameTimer(30);
    setAnswerTimer(9);
    setStart(true);
    //gera a primeira cor do jogo e as opções de resposta
    generateHexColorOptions();
    //reseta o histórico ao lado esquerdo
    dispatch(resetHistory());
  }, []);

  const restartGame = useCallback(() => {
    //seta os estados iniciais dos timers e da pontuação
    setScore(0);
    setGameTimer(30);
    setAnswerTimer(9);
    setStart(false);
  }, []);

  const clearData = useCallback(() => {
    restartGame();
    dispatch(resetHistory());
    localStorage.setItem('highScore', JSON.stringify(0));
  }, []);
  
  //poderia ter feito um componente para a top-bar e outro para o progresso, cor e opções.
  return (
    <div className='main-screen'>
      <h1>Guess the color</h1>

      <div className='top-bar'>
        <div className='bar-section'>
          remaining time {gameTimer}
        </div>
        <div className='bar-section clickable restart' onClick={() => restartGame()} >
          restart
        </div>
        <div className='bar-section'>
          <div style={{borderBottom: '1px solid whitesmoke'}} >High score {highScore}</div>
          <div>Score {score}</div>
        </div>
      </div>

      <progress className='progress-bar' value={gameTimer} max={30} ></progress>

      <div className='color-container' style={{backgroundColor: colorToGuess}} >
        {
          !start
          ? <button className='start' onClick={() => startGame()} >
              START
            </button>
          : null
        }
      </div>
      {
        start ? 
        <div className='options-container' >
          {
            colorOptions.map((option, index) => 
              <div 
                key={`option-${index}`} 
                className='bar-section clickable' 
                onClick={(option) => 
                  chooseAnswer(
                    option.currentTarget.innerText, 
                    colorToGuess, 
                    answerTimer, 
                    generateHexColorOptions, 
                    setAnswerTimer
                  )
                } 
              >
                {option}
              </div>
            )
          }
        </div>
        : null
      }

      <a onClick={() => clearData()} style={{marginTop: '5em'}} > Reset all data </a>
    </div>
  )
}