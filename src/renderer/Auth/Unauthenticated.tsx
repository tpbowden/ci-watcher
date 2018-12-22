import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

interface Props {
  token?: string;
  children: React.ReactElement<any>;
}

const UnauthenticatedComponent: React.FunctionComponent<Props> = ({
  token,
  children
}) => (token ? null : children);

const mapStateToProps = (state: State) => ({
  token: state.auth.idToken
});

export const Unauthenticated = connect(mapStateToProps)(
  UnauthenticatedComponent
);
