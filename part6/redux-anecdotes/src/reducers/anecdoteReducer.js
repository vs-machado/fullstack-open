import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteOnAnecdote(state, action) {
      const anecdote = action.payload
      const anecdoteToVote = state.find(n => n.id === anecdote.id)
      anecdoteToVote.votes += 1
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, setAnecdotes, voteOnAnecdote } = anecdoteSlicer.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const postAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const postAnecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteOnAnecdote(anecdote)
    dispatch(voteOnAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlicer.reducer 