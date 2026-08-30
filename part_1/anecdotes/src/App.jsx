import { useState } from 'react'

const getRandomInt = (max, exclude) => {
  let ret = 0
  do {ret = Math.floor(Math.random() * max)} 
  while (ret === exclude)
  return ret;
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const AnecdoteComponent = ({anecdote, vote}) => {
  return (
    <p>
      {anecdote}
      <br></br>
      has {vote || 0} votes
    </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length - 1))
  const [votes, setVotes] = useState({})

  const voteCurrentAnecdote = () => {
    let updatedVotes = {...votes}
    let vote = selected.toString()
    let currentValue = updatedVotes[vote]
    updatedVotes[vote] = currentValue ? currentValue + 1 : 1
    setVotes(updatedVotes)
  }

  const getMostVotedAnecdoteIndex = () => {
    if (anecdotes.length === 0) throw new Error('Anecdotes are empty!')
    let maxVoteIdx = 0
    let maxVoteCount = 0
    for (let i=0; i < anecdotes.length; i++) {
      let voteCount = votes[i.toString()]
      if (voteCount && voteCount > maxVoteCount) {
        maxVoteCount = voteCount
        maxVoteIdx = i
      }
    }
    return maxVoteIdx
  }

  let maxVoteIdx = getMostVotedAnecdoteIndex()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteComponent anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={voteCurrentAnecdote} text='vote' />
      <Button onClick={() => setSelected(getRandomInt(anecdotes.length - 1, selected))} text='next anecdote' />
      
      <h1>Anecdote with most votes</h1>
      <AnecdoteComponent anecdote={anecdotes[maxVoteIdx]} vote={votes[maxVoteIdx]} />
    </div>
  )
}

export default App