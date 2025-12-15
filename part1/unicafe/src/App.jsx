import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Feedback = (props) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={props.goodFeedback} text={"good"}></Button>
      <Button onClick={props.neutralFeedback} text={"neutral"}></Button>
      <Button onClick={props.badFeedback} text={"bad"}></Button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { goodCount, neutralCount, badCount } = props;
  const total = goodCount + neutralCount + badCount;
  const average = (goodCount * 1 + neutralCount * 0 + (badCount * -1)) / total;
  const positive = goodCount / total * 100.0;

  if(total <= 0){
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } 

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={goodCount} />
          <StatisticLine text="neutral" value={neutralCount} />
          <StatisticLine text="bad" value={badCount} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    const goodCount = good + 1;
    setGood(goodCount);
  }

  const handleNeutralClick = () => {
    const neutralCount = neutral + 1;
    setNeutral(neutralCount);
  }
  
  const handleBadClick = () => {
    const badCount = bad + 1;
    setBad(badCount);
  }

  return (
    <>
      <Feedback goodFeedback={handleGoodClick} neutralFeedback={handleNeutralClick} badFeedback={handleBadClick}/>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad}/>
    </>
  )
}

export default App
