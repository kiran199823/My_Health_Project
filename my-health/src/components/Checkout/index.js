import { connect } from 'react-redux';
import Checkout from './CheckoutComponent';
import { handlefetchCartDetails, selectCartDetails } from '../DoctorsInfo';

const mapStateToProps = (state, ownProps) => ({
  cartDetails: selectCartDetails(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCartDetails: (cartId) => handlefetchCartDetails(cartId, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
