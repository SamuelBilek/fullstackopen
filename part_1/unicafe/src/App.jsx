import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const FeedbackComponent = ({onGoodClick, onNeutralClick, onBadClick}) => {
  return (
    <div>
      <Button onClick={onGoodClick} text='good'/>
      <Button onClick={onNeutralClick} text='neutral'/>
      <Button onClick={onBadClick} text='bad'/>
    </div>
  )
}

const StatsTableRow = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatsComponent = ({good, neutral, bad}) => {
  const goodFactor = 1
  const neutralFactor = 0
  const badFactor = -1

  const getAllCount = () => good + neutral + bad
  const getAverage = () => ((good * goodFactor) + (neutral * neutralFactor) + (bad * badFactor)) / (getAllCount() || 1)
  const getPositivePercentage = () => good / (getAllCount() || 1)

  let content = <p>No feedback given</p>
  if (good > 0 || neutral > 0 || bad > 0) {
    content = (
      <>
        <table>
          <StatsTableRow text='good' value={good} />
          <StatsTableRow text='neutral' value={neutral} />
          <StatsTableRow text='bad' value={bad} />
          <StatsTableRow text='all' value={getAllCount()} />
          <StatsTableRow text='average' value={getAverage()} />
          <StatsTableRow text='positive' value={getPositivePercentage()} />
        </table>
      </>
    )
  }
  
  return (
    <div>
      <h1>statistics</h1>
      {content}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleBadClick = () => setBad(bad + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackComponent onGoodClick={handleGoodClick} onNeutralClick={handleNeutralClick} onBadClick={handleBadClick} />
      <StatsComponent good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App