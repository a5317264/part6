const notificationReducer = (state = 'test', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.message
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, second) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      message
    })
    if (window.notificationTimeout) {
      window.clearTimeout(window.notificationTimeout)
    }
    window.notificationTimeout = setTimeout(() => dispatch(removeNotification()), second * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}


export default notificationReducer