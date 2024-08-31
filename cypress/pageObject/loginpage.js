class Login {
  setUserName(username) {
    cy.get("#login_email").type(username);
  }
  setPassword(password) {
    cy.get("#login_password").type(password);
  }
  clicksubmit() {
    cy.get("#submit").click();
  }
  verifylogin() {
    // cy.get('');
  }
}
export default Login;
