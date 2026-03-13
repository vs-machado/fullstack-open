import { useDispatch, useSelector } from "react-redux"
import { voteOnAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, showNotification } from "../reducers/notificationReducer"

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

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter(item => item.content.toLowerCase().includes(filter))

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote} 
          handleClick={() => {
            dispatch(voteOnAnecdote(anecdote.id))
            dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
          }}
        />
      ))}
    </div>
  )
}

export default AnecdoteList