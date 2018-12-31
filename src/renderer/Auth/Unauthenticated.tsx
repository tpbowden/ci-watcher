import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

interface Props {
  token?: string;
}

const UnauthenticatedComponent: React.FC<Props> = ({ children, token }) => {
  if (token) {
    return null;
  }
  return <>{children}</>;
};

const mapStateToProps = (state: State) => ({
  token: state.auth.idToken
});

export const Unauthenticated = connect(mapStateToProps)(
  UnauthenticatedComponent
);
