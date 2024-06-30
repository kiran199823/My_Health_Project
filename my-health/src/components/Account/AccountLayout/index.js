import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Loading } from '../../CustomElements/Loading';

const AccountLayout = ({ children, ...props }) => {
  const { leftTopLogo, leftMiddleHeading, leftBottomMessage, isLoading } =
    props;

  return (
    <>
      <div className="accountScreen flexCenter">
        <div className="accountContainer">
          {isLoading && <Loading />}
          <div className="accountMessageContainer">
            <span className="accountMHLogo">{leftTopLogo}</span>
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
  leftTopLogo: PropTypes.string,
  leftMiddleHeading: PropTypes.string,
  leftBottomMessage: PropTypes.string,
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

export default AccountLayout;
