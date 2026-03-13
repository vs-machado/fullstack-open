const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return response.json()
}

const createAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      content,
      id: getId(),
      votes: 0
    })
  }
  const response = await fetch(baseUrl, options)
  
  if(!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return await response.json()
}

const voteOnAnecdote = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

  if(!response.ok) {
    throw new Error('Failed to vote on anecdote')
  }

  return await response.json()
}

export default { getAll, createAnecdote, voteOnAnecdote }
