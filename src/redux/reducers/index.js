import {
  combineReducers
} from 'redux';
import FormReducer from './FormReducer';
import BarangReducer from './BarangReducer';
import ItemReducer from './ItemReducer';

export default combineReducers({
  form: FormReducer,
  barang: BarangReducer,
  item: ItemReducer
});
