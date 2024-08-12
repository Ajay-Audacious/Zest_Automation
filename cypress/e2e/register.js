import { registerPage } from "../pages/registerPage";
const registerObject = new registerPage();
import registerData from "../fixtures/registerData.json";
describe("Register the page", () => {
  it("Register flow", () => {
    registerObject.openURl();
    registerObject.enterFirstName(registerData.fristName);
    registerObject.enterLastName(registerData.lastName);
    registerObject.enterEmail(registerData.email);
    registerObject.entertelePhone(registerData.telephone);
    registerObject.enterPassword(registerData.password);
    // registerObject.enterConfirmPassword(registerData.enterConfirmPassword)
    registerObject.selectPvcy();
    registerObject.submit();
    // registerObject.clickOnRegister()
    // registerObject.verifyRegisterSuccess()
  });
});
