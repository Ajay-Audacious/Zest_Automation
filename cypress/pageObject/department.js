// cypress/support/pages/departmentPage.js

class DepartmentPage {
  // Selectors
  get addButton() {
    return cy.get("#add_role");
  }
  get departmentNameField() {
    return cy.get("#name");
  }
  get managerDropdown() {
    return cy.get("#manager_name");
  }
  get managerOption() {
    return cy.get(".rc-virtual-list-holder-inner >");
  }
  get uniqueIdentifierField() {
    return cy.get("#uniqueIdentifier");
  }
  get descriptionField() {
    return cy.get("#description");
  }
  get uploadArea() {
    return cy.get(".ant-upload-drag");
  }
  get saveButton() {
    return cy.xpath("//span[normalize-space()='Save']");
  }
  get errorMessages() {
    return {
      name: cy.get("#name_help"),
      leader: cy.get("#leaderId_help"),
      identifier: cy.get("#uniqueIdentifier_help"),
    };
  }
  get successNotification() {
    return cy.get(".ant-notification-notice-description");
  }
  get departmentListItem() {
    return (name) => cy.xpath(`//a[normalize-space()='${name}']`);
  }
  get editButton() {
    return cy.xpath("//span[contains(text(),'Edit')]");
  }
  get teamAddButton() {
    return cy.xpath("//span[normalize-space()='Add']");
  }
  get teamUnassignButton() {
    return cy.get(".ant-page-header-heading-extra >").eq(1);
  }
  get confirmationTextField() {
    return cy.get("#text");
  }
  get deleteButton() {
    return cy.xpath("//span[normalize-space()='Delete']");
  }
  get settingsButton() {
    return cy.get('[data-node-key="settings"]');
  }
  get existingTeamHeader() {
    return cy.xpath("//h1[normalize-space()='Existing team']");
  }

  openAddDepartmentForm() {
    this.addButton.click();
  }

  enterDepartmentName(name) {
    this.departmentNameField.type(name);
  }

  selectManager(index) {
    this.managerDropdown.click();
    this.managerOption.eq(index).click();
  }

  enterUniqueIdentifier(identifier) {
    this.uniqueIdentifierField.type(identifier);
  }

  enterDescription(description) {
    this.descriptionField.type(description);
  }

  uploadFile(fileName, fileType) {
    this.uploadArea.click();
    cy.uploadFile(fileName, fileType);
  }

  clickSave() {
    this.saveButton.click();
  }

  checkErrorMessages(expectedErrors) {
    this.errorMessages.name.should("have.text", expectedErrors.name);
    this.errorMessages.leader.should("have.text", expectedErrors.leader);
    this.errorMessages.identifier.should(
      "have.text",
      expectedErrors.identifier
    );
  }

  verifySuccessNotification(message) {
    this.successNotification.should("be.visible").and("contain.text", message);
  }

  openDepartment(name) {
    this.departmentListItem(name).click();
  }

  editDepartment() {
    this.editButton.click();
  }

  addTeams(indices) {
    this.existingTeamHeader.click();
    indices.forEach((index) => {
      cy.get(".ant-table-selection-column").eq(index).click();
    });
    this.teamAddButton.click();
  }

  unassignTeams(indices) {
    this.teamUnassignButton.click();
    this.existingTeamHeader.click();
    indices.forEach((index) => {
      cy.get(".ant-table-selection-column").eq(index).click();
    });
    this.teamAddButton.click();
  }

  deleteDepartment(name) {
    this.openDepartment(name);
    this.settingsButton.click();
    this.deleteButton.click();
    this.confirmationTextField.type(name);
    this.deleteButton.click();
  }
}

export default new DepartmentPage();

class TeamsPage {
  // Selectors
  get addButton() {
    return cy.get("#add_role");
  }
  get teamNameInput() {
    return cy.get("#role_name");
  }
  get teamDescriptionInput() {
    return cy.get("#role_description");
  }
  get teamSaveButton() {
    return cy.get("#save_role");
  }
  get teamCancelButton() {
    return cy.get("#cancel_role");
  }
  get teamDeleteButton() {
    return cy.get("#delete_role");
  }
  get teamUnassignButton() {
    return cy.get("#unassign_role");
  }
}
// export default new = TeamsPage()
