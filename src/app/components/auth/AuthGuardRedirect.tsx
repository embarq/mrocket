import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../lib/auth-service';

export interface AuthGuardRedirectProps {
  positive: string;
  negative: string;
}

export default function AuthGuardRedirect(props: AuthGuardRedirectProps) {
  const history = useHistory();

  useEffect(() => {
    AuthService.Instance.isAuthenticated().then(isAuthenticated => {
      history.push(
        isAuthenticated ? props.positive : props.negative
      );
    });
  });

  return null;
}