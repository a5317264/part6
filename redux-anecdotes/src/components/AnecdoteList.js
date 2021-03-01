import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {
  const sortByVotes = (a, b) => b.votes - a.votes
  const filteredAndSortedAnecdotes = props.anecdotes
    .sort(sortByVotes)
    .filter((anecdote) => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))

  const vote = (anecdote) => {
    props.addVote(anecdote.id, anecdote)
    const message = `you vote ${anecdote.content}`
    props.setNotification(message, 5)
  }

  return (
    <div>
      {filteredAndSortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            vote(anecdote)
          }
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes