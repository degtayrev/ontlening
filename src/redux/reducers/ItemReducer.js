export default (state = {
  item: [],
  loading: false,
  connection: ''
}, action) => {
  switch (action.type) {
    case 'GET_ITEM':
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case 'CLEAR_ITEM':
      return {
        ...state,
        item: []
      };
    case 'LOADING_ITEM':
      return {
        ...state,
        loading: true,
        connection: ''
      };
    case 'ITEM_ERROR':
      return {
        ...state,
        connection: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
