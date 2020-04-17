import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../lib/auth-service';

export interface AuthGuardProps {
  unauthorizedRedirect: string;
  unauthorizedRedirectState?: any;
  children: React.ReactNode;
};

enum AuthGuardState {
  Unauthorized,
  Authenticated,
  Unset
}

export default function AuthGuard(props: AuthGuardProps) {
  const [authState, setAuthState] = useState<AuthGuardState>(AuthGuardState.Unset);
  const history = useHistory();

  AuthService.Instance.isAuthenticated().then(isAuthenticated => {
    setAuthState(
      isAuthenticated ? AuthGuardState.Authenticated : AuthGuardState.Unauthorized
    );
  });

  useEffect(() => {
    if (authState === AuthGuardState.Unauthorized) {
      // The setTimeout here is to fix React's warnging:
      //   "Can't perform a React state update on an unmounted component"
      // From my understanding, it was thrown because this redirect below cancels
      // the next render cycle after it was called, which breaks any further setState calls 
      const tid = setTimeout(() => {
        history.push(props.unauthorizedRedirect, props.unauthorizedRedirectState);
        clearTimeout(tid);
      }, 0);
    }
  });

  if (authState === AuthGuardState.Authenticated) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
}