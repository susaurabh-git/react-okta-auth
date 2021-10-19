import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import oktaAuthClient from "../../utils/oktaAuthClient";

const MultiFactorVerify = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const silentSignIn = (sessionToken) => {
        return oktaAuthClient.token.getWithoutPrompt({ scopes: ['openid'], sessionToken })
            .then(({ tokens }) => {
                oktaAuthClient.setOriginalUri('/');
                return oktaAuthClient.handleLoginRedirect(tokens);
            })
            .catch((e) => {
                if (e.errorCode === 'login_required') {
                    throw new Error('Authentication Failed.')
                }
                throw new Error(e);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.transaction.verify({ passCode: e.target.code.value }).then((transaction) => {
            if (transaction.status === "SUCCESS") {
                // dispatch(authAction.update(transaction))
                silentSignIn(transaction.sessionToken);
            }
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="code">Code</label>
                <input type="code" class="form-control" id="code" aria-describedby="codeHelp" placeholder="Enter OTP code" />
                <small id="codeHelp" class="form-text text-muted">Never share your OTP with anyone else.</small>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    );
};
const mapStateToProps = state => {
    const { transaction } = state.authReducer;
    return { transaction };
}
export default connect(mapStateToProps, null)(MultiFactorVerify);
