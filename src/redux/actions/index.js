/* eslint-disable radix */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-community/async-storage';

const FETCH_TIMEOUT = 30000;

export const host = 'https://ontlening.herokuapp.com';

const internetError = async dispatch => {
  dispatch({
    type: 'INTERNET_ERROR',
    payload: 'Cek koneksi internet anda'
  });
};

const saveToken = async token => {
  await AsyncStorage.setItem('Token', token);
};

export const setError = () => ({
  type: 'CONNECTION_TRUE'
});

export const formChange = (text, field) => dispatch => {
  switch (field) {
    case 'username':
      dispatch({
        type: 'USERNAME_CHANGE',
        payload: text
      });
      break;
    case 'password':
      dispatch({
        type: 'PASSWORD_CHANGE',
        payload: text
      });
      break;
    case 'name':
      dispatch({
        type: 'NAME_CHANGE',
        payload: text
      });
      break;
    case 'image':
      dispatch({
        type: 'IMAGE_CHANGE',
        payload: text
      });
      break;
    case 'location':
      dispatch({
        type: 'LOCATION_CHANGE',
        payload: text
      });
      break;
    case 'quantity':
      dispatch({
        type: 'QUANTITY_CHANGE',
        payload: text
      });
      break;
    case 'description':
      dispatch({
        type: 'DESCRIPTION_CHANGE',
        payload: text
      });
      break;
    case 'category':
      dispatch({
        type: 'CATEGORY_CHANGE',
        payload: text
      });
      break;
    default:
      break;
  }
};

export const clearForm = () => dispatch => {
  dispatch({
    type: 'CLEAR_FORM'
  });
};

export const clearItem = () => dispatch => {
  dispatch({
    type: 'CLEAR_ITEM'
  });
};

export const login = (username, password, nav) => dispatch => {
  const timeout = setTimeout(() => {
    internetError(dispatch);
  }, FETCH_TIMEOUT);
  dispatch({
    type: 'LOADING'
  });
  fetch(`${host}/api/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(async result => {
      const res = await result.json();
      clearTimeout(timeout);
      if (result.status === 201) {
        const token = result.headers.map.authorization.split(' ')[1];
        setTimeout(() => {
          saveToken(token);
          dispatch({
            type: 'LOGIN_SUCCESS'
          });
          nav.navigate('Auth');
        }, 1000);
      } else if (result.status === 401) {
        dispatch({
          type: 'PASSWORD_ERROR',
          payload: res.message
        });
      } else if (result.status === 404) {
        dispatch({
          type: 'USERNAME_ERROR',
          payload: res.message
        });
      }
    })
    .catch(() => {
      clearTimeout(timeout);
      internetError(dispatch);
    });
};

export const createBarang = (name, image, nav) => async dispatch => {
  const timeout = setTimeout(() => {
    internetError(dispatch);
  }, FETCH_TIMEOUT);
  dispatch({
    type: 'LOADING'
  });
  const token = await AsyncStorage.getItem('Token');
  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', {
    uri: image.uri,
    type: image.type,
    name: image.fileName
  });
  fetch(`${host}/api/barang`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    .then(async () => {
      clearTimeout(timeout);
      setTimeout(() => {
        dispatch({
          type: 'CREATE_BARANG_SUCCESS'
        });
        nav.state.params.returnData();
        nav.goBack();
      }, 1000);
    })
    .catch(() => {
      clearTimeout(timeout);
      internetError(dispatch);
    });
};

export const createItem = (name, location, quantity, description, category, nav) => async dispatch => {
  const timeout = setTimeout(() => {
    internetError(dispatch);
  }, FETCH_TIMEOUT);
  dispatch({
    type: 'LOADING'
  });
  const token = await AsyncStorage.getItem('Token');
  fetch(`${host}/api/item`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        location,
        quantity: parseInt(quantity),
        description,
        category
      })
    })
    .then(async () => {
      clearTimeout(timeout);
      setTimeout(() => {
        dispatch({
          type: 'CREATE_ITEM_SUCCESS'
        });
        nav.goBack();
      }, 1000);
    })
    .catch(() => {
      clearTimeout(timeout);
      internetError(dispatch);
    });
};

export const getBarang = () => async dispatch => {
  const timeout = setTimeout(() => {
    internetError(dispatch);
  }, FETCH_TIMEOUT);
  dispatch({
    type: 'LOADING_BARANG'
  });
  fetch(`${host}/api/barang`, {
      method: 'GET'
    })
    .then(async result => {
      const res = await result.json();
      clearTimeout(timeout);
      dispatch({
        type: 'GET_BARANG',
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: 'BARANG_ERROR',
        payload: 'Cek koneksi internet anda'
      });
    });
};

export const getItems = (category, isCategory) => async dispatch => {
  const timeout = setTimeout(() => {
    internetError(dispatch);
  }, FETCH_TIMEOUT);
  dispatch({
    type: 'LOADING_ITEM'
  });
  const url = isCategory ? `item/${category}` : 'item';
  fetch(`${host}/api/${url}`, {
      method: 'GET'
    })
    .then(async result => {
      const res = await result.json();
      clearTimeout(timeout);
      dispatch({
        type: 'GET_ITEM',
        payload: res
      });
    })
    .catch(() => {
      clearTimeout(timeout);
      dispatch({
        type: 'ITEM_ERROR',
        payload: 'Cek koneksi internet anda'
      });
    });
};

export const deleteBarang = (id, nav) => async dispatch => {
  const timeout = setTimeout(() => {
    internetError(dispatch);
  }, FETCH_TIMEOUT);
  const token = await AsyncStorage.getItem('Token');
  fetch(`${host}/api/barang/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async () => {
      clearTimeout(timeout);
      setTimeout(() => {
        nav.state.params.returnData();
        nav.goBack();
      }, 1000);
    })
    .catch(() => {
      clearTimeout(timeout);
      internetError(dispatch);
    });
};
