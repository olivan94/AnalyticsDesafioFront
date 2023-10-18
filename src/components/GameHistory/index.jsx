import { useSelector } from "react-redux"
import './styles.css'
import TextWithContrast from "../TextWithContrast";

export default function GameHistory() {
  //componente do histórico precisa apenas ficar de olho no state do redux
  const latestGame = useSelector((state) => state.latestGame.latestGameResults);

  return (
    <div className='history-container'>
      <b>Current/Latest Game</b>
      <div className='history-card subcontainer'>
        <div className='history-colors'>
          <p className='hexcolor'>correct</p>
          <p className='hexcolor'>answered</p>
        </div>
        <p className='time-tag'>Ts</p>
      </div>

      <div>
        {
          latestGame.map((el, index) => 
            <div key={`key-${index}`} className='history-card history-list'>
              <div className='history-colors'>
                <TextWithContrast bgColor={el.color} />
                <TextWithContrast bgColor={el.answer} />
              </div>
              <p 
                className='time-tag' 
                style={{
                  backgroundColor: el.color === el.answer ? 'forestgreen' : 'red'
                }} 
              >
                {el.time}s
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}