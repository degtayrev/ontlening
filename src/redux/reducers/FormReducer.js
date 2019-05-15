export default (state = {
  username: '',
  usernameMsg: '',
  password: '',
  passwordMsg: '',
  loading: false,
  connection: '',
  name: '',
  image: '',
  location: '',
  description: '',
  quantity: 0,
  category: ''
}, action) => {
  switch (action.type) {
    case 'USERNAME_CHANGE':
      return {
        ...state,
        username: action.payload,
        usernameMsg: ''
      };
    case 'PASSWORD_CHANGE':
      return {
        ...state,
        password: action.payload,
        passwordMsg: ''
      };
    case 'USERNAME_ERROR':
      return {
        ...state,
        usernameMsg: action.payload,
        loading: false
      };
    case 'PASSWORD_ERROR':
      return {
        ...state,
        passwordMsg: action.payload,
        loading: false
      };
    case 'INTERNET_ERROR':
      return {
        ...state,
        connection: action.payload,
        loading: false
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: '',
        usernameMsg: '',
        password: '',
        passwordMsg: '',
        loading: false,
        connection: ''
      };
    case 'CONNECTION_TRUE':
      return {
        ...state,
        connection: ''
      };
    case 'NAME_CHANGE':
      return {
        ...state,
        name: action.payload
      };
    case 'IMAGE_CHANGE':
      return {
        ...state,
        image: action.payload
      };
    case 'CREATE_BARANG_SUCCESS':
      return {
        ...state,
        name: '',
        image: '',
        loading: false
      };
    case 'LOCATION_CHANGE':
      return {
        ...state,
        location: action.payload
      };
    case 'QUANTITY_CHANGE':
      return {
        ...state,
        quantity: action.payload
      };
    case 'DESCRIPTION_CHANGE':
      return {
        ...state,
        description: action.payload
      };
    case 'CATEGORY_CHANGE':
      return {
        ...state,
        category: action.payload
      };
    case 'CREATE_ITEM_SUCCESS':
      return {
        ...state,
        name: '',
        location: '',
        quantity: '',
        category: '',
        loading: false
      };
    case 'CLEAR_FORM':
      return {
        ...state,
        username: '',
        usernameMsg: '',
        password: '',
        passwordMsg: '',
        loading: false,
        connection: '',
        name: '',
        image: '',
        location: '',
        quantity: 0,
        category: ''
      };
    default:
      return state;
  }
};
