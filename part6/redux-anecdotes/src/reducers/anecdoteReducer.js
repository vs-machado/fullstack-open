import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteOnAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      anecdoteToVote.votes += 1
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteOnAnecdote, setAnecdotes } = anecdoteSlicer.actions
export default anecdoteSlicer.reducer 