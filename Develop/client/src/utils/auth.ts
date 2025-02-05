class AuthService {
  private TOKEN_KEY = 'kanban_auth_token';

  // Return the decoded token
  getProfile() {
    const token = this.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp * 1000 < Date.now();
    } catch (err) {
      return true;
    }
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Login: Save token and redirect to Kanban board
  login(idToken: string) {
    localStorage.setItem(this.TOKEN_KEY, idToken);
    window.location.assign('/'); // Redirect to the Kanban board
  }

  // Logout: Remove token and redirect to login page
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.assign('/');
  }
}

export default new AuthService();
