const initialState = {
  data: 'some data'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}