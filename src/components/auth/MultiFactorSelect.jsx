import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authAction } from '../../actions/authAction'

const MultiFactorSelect = (props) => {
  const [active, setActive] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.transaction.factors[active].verify().then((transaction) => {
      if (transaction.status === "MFA_CHALLENGE") {
        dispatch(authAction.update(transaction))
        history.push("/verify");
      }
    });

  };

  const handleFactorChange = (e) => {
    setActive(e.target.value);
  };
  const getFactorValue = (factor) => {
    if (factor.factorType === 'sms') {
      return factor.profile.phoneNumber;
    }
    if (factor.factorType === 'email') {
      return factor.profile.email;
    }

  }
  const factors = (props.transaction.factors) ? props.transaction.factors : [];
  return (
    <form onSubmit={handleSubmit}>
      {factors.map((factor, index) =>
        <div key={`div+index`}>
          <input
            type="radio"
            value={index}
            onChange={handleFactorChange}
          />
          <label>
            {getFactorValue(factor)}
          </label>
        </div>
      )}
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
const mapStateToProps = state => {
  const { transaction } = state.authReducer;
  return { transaction };
}
export default connect(mapStateToProps, null)(MultiFactorSelect);
