export class AuthService {
  constructor() { }

  isAuthenticated() {
    return Promise.resolve(false);
  }

  static Instance = new AuthService();
}