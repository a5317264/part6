import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      )
    default:
      console.log('state now: ', state)
      console.log('action', action)

      return state
  }
}

export const addVote = (id, anecdoteToChange) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 })
    dispatch({
        type: 'VOTE',
        data: updatedAnecdote
      }
    )
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer