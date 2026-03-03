import { useDispatch, useSelector } from "react-redux"
import { voteOnAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote => (
        <div>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote} 
            handleClick={() => dispatch(voteOnAnecdote(anecdote.id))}
          />
        </div>
      ))}
    </div>
  )
}

export default Anecdotes