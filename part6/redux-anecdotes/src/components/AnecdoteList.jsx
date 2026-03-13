import { useDispatch, useSelector } from "react-redux"
import { postAnecdoteVote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

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
  console.log(anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter(item => item.content.toLowerCase().includes(filter))

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote} 
          handleClick={() => {
            dispatch(postAnecdoteVote(anecdote))
            dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
          }}
        />
      ))}
    </div>
  )
}

export default AnecdoteList