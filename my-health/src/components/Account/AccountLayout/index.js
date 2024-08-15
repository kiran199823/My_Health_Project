import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Loading } from '../../CustomElements/Loading';
import { MY_HEALTH_SHORTHAND } from '../../../constants';

const AccountLayout = ({ children, ...props }) => {
  const { leftMiddleHeading, leftBottomMessage, isLoading } = props;

  return (
    <>
      <div className="accountScreen flexCenter">
        <div className="accountContainer">
          {isLoading && <Loading />}
          <div className="accountMessageContainer">
            <span className="accountMHLogo">{MY_HEALTH_SHORTHAND}</span>
            <div>
              <span className="accountaccountText">{leftMiddleHeading}</span>
              <div>
                <span className="googleAccountMessage">
                  {leftBottomMessage}
                </span>
              </div>
            </div>
          </div>
          <div className="accountField">{children}</div>
        </div>
      </div>
    </>
  );
};

AccountLayout.propTypes = {
  leftMiddleHeading: PropTypes.string,
  leftBottomMessage: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

export default AccountLayout;
