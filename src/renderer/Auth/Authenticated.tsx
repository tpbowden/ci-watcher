import React from "react";
import { connect } from "react-redux";
import { State } from "../store";

interface Props {
  token?: string;
  children(token: string): React.ReactNode;
}

const AuthenticatedComponent: React.FC<Props> = ({ children, token }) => {
  if (!token) {
    return null;
  }
  return <>{children(token)}</>;
};

const mapStateToProps = (state: State) => ({
  token: state.auth.idToken
});

export const Authenticated = connect(mapStateToProps)(AuthenticatedComponent);
