
import DepartmentPage from '../../pageObject/department';

import { faker } from "@faker-js/faker";
import { login } from "../common_component/common_All";
import { credentials } from "../Validation/logs";
import "cypress-file-upload";

const departmentName = faker.commerce.department();
const description = `This department, ${departmentName}, focuses on ${faker.company.bsBuzz()} and ${faker.company.bsNoun()}.`;

describe("Department Management", () => {
  beforeEach(() => {
    login(credentials);
    cy.wait(5000);
    
  });

  it("Verify Error Message", () => {
    DepartmentPage.openAddDepartmentForm();
    cy.xpath("//span[normalize-space()='Save']").click();
    DepartmentPage.checkErrorMessages({
      name: "Please enter department name",
      leader: "Select department leader",
      identifier: "Please enter unique identifier"
    });
  });

  it("Add Department", () => {
    DepartmentPage.openAddDepartmentForm();
    DepartmentPage.enterDepartmentName(departmentName);
    DepartmentPage.selectManager(2);
    DepartmentPage.enterUniqueIdentifier(faker.datatype.uuid());
    DepartmentPage.enterDescription(description);
    DepartmentPage.uploadFile("testimg.png", "png");
    DepartmentPage.clickSave();
    DepartmentPage.verifySuccessNotification("Department create successfully");
  });

  it("Department Update", () => {
    DepartmentPage.openDepartment(departmentName);
    DepartmentPage.editDepartment();
    DepartmentPage.clickSave();
    DepartmentPage.verifySuccessNotification("Department update successfully");
  });

  it("Add Teams", () => {
    DepartmentPage.openDepartment(departmentName);
    DepartmentPage.addTeams([1, 2, 3]);
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Team assign successfully"
    );
  });

  it("Unassign the Team", () => {
    DepartmentPage.openDepartment(departmentName);
    DepartmentPage.unassignTeams([1, 2, 3]);
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Team Unassign successfully"
    );
  });

  it("Delete Department", () => {
    DepartmentPage.deleteDepartment(departmentName);
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Department deleted successfully"
    );
  });
});
