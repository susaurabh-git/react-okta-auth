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
        <div class="form-group form-check" key={`div+index`}>
          <input class="form-check-input" type="radio" id={`radio+index`} value={index} onChange={handleFactorChange} />
          <label class="form-check-label" for={`radio+index`}>
            {getFactorValue(factor)}
          </label>
          <small id="passwordHelp" class="form-text text-muted">&nbsp;</small>
        </div>
      )}
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  );
};
const mapStateToProps = state => {
  const { transaction } = state.authReducer;
  return { transaction };
}
export default connect(mapStateToProps, null)(MultiFactorSelect);
