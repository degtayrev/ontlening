export default (state = {
  barang: [],
  loading: false,
  connection: ''
}, action) => {
  switch (action.type) {
    case 'GET_BARANG':
      return {
        ...state,
        barang: action.payload,
        loading: false
      };
    case 'LOADING_BARANG':
      return {
        ...state,
        loading: true,
        connection: ''
      };
    case 'BARANG_ERROR':
      return {
        ...state,
        connection: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
