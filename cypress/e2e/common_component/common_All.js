//Login Repeat to Every Testcase
import { credentials } from "../Validation/logs";
export const login = (credentials) => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  cy.visit("https://staging.zesthrm.com");
  cy.viewport(3000, 1500);
  cy.get("#login_email").type(credentials.id);
  cy.get("#login_password").type(credentials.password);
  cy.get("#submit").click();
};

import {
  verifyErrorMessage,
  verifyErrorOrg,
  verifyErrorProject,
  verifyErrorReports,
  verifyErrorRole,
} from "../Validation/errorValidation"; //Employee module verify the error message Placeholder
export const employeesErrorMessage = () => {
  cy.wait(5000);
  cy.get('[href="/employees"]', { timeout: 5000 }).click()
  cy.get("#employee_add").click();
  cy.contains('Submit').click();
  const errors = {
    name_help: "Please enter name",
    email_help: "Please enter valid email address",
    contactNumber_help: "Please enter contact number",
    employeeCode_help: "Please enter employee code",
    designation_help: "Please enter designation",
    joiningDate_help: "Please select joining date",
    locationId_help: "Please select location",
  };
  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const message = errors[key];
      verifyErrorMessage(key, message);
    }
  }
};
//Verify the Roles module verify the error message Placeholder
export const rolesErrorMessage = () => {
  cy.get("#add_role").click();
  cy.get("#role_submit").click();
  cy.url().should("include", "https://staging.zesthrm.com/roles/new");
  const errors = {
    register_name_help: "Please enter the role name",
    register_description_help: "Please enter the description",
  };
  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const message = errors[key];
      verifyErrorRole(key, message);
    }
  }
};

//Verify the Project Module error message Placeholder
export const projectsErrorMessage = () => {
  cy.get("button[class='ant-btn ant-btn-primary']").click();
  cy.get("#project_submit").click();
  const errors = {
    project_name_help: "Please enter project name",
    project_managerId_help: "Please select manager name",
    project_startDate_help: "Please select start date",
  };
  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const message = errors[key];
      verifyErrorProject(key, message);
    }
  }
};
//Verify the Reports Module error message Placeholder
export const reportsErrorMessage = () => {
  cy.get('#add_report').click();
  cy.get('#save').click();
  const errors = {
    reports_tasks_0_startTime_help: "Please select start time",
    reports_tasks_0_endTime_help: "Please select end time",
    reports_tasks_0_assignedBy_help: "Please select manager name",
    reports_tasks_0_projectId_help: "Please select project name",
    reports_tasks_0_description_help: "Please enter the description",
  };
  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const message = errors[key];
      verifyErrorReports(key, message);
    }
  }
};
//Verify the Org details Error message verify
export const orgErrorMessage = () => {
  cy.get("#Organization_details_tab").click();
  cy.get("#organizations_btn").click();
  cy.get("#save").click();
  const errors = {
    Organization_organizationName_help: "Please enter name",
    Organization_LandlineNo_help: "Please enter landline number",
    Organization_mobileNo_help: "Please enter mobile number",
    Organization_organizationEmail_help: "Please enter email address",
    Organization_industryType_help: "Please enter industry type",
    Organization_BuisnessLocation_help: "Please enter business location",

    Organization_registeredAddress_help: "Please enter registered address",
    Organization_PAN_No_help: "Please enter PAN number",
    // Organization_Tax_Deduction_No_help: "Please enter tan number",
  };

  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const message = errors[key];
      verifyErrorOrg(key, message);
    }
  }
};

//Leave module reasons
import faker from "faker";
import dayjs from "dayjs";
export const addLeaveForSpecificDay = (dayOffset) => {
  const leaveReasonsList = [
    {
      reason: "Out of station",
      description:
        "I am writing to request a leave of absence to travel. I am traveling on a family trip to three different places. I hope for your kind approval.",
    },
    {
      reason: "Fever",
      description:
        "I am writing to inform you that I am not feeling well and will need to take a day off from work.",
    },
    {
      reason: "Personal work",
      description:
        "I wish to inform you that I have to go with my younger daughter to her school for the Annual Day function today. As the function will run from morning to evening, I would not be able to attend the office.",
    },
  ];
  // Rest of the code remains the same
  const randomLeaveReason = faker.random.arrayElement(leaveReasonsList);
  cy.get("#leave_title").type(randomLeaveReason.reason);
  cy.get("#leave_description").type(randomLeaveReason.description);
};

// Usage:
// addLeaveForSpecificDay(0); // To add leave for the current day
// addLeaveForSpecificDay(-1); // To add leave for the previous day
// addLeaveForSpecificDay(1); // To add leave for the next day
export const holidaysList = () => {};
export const generateRandomIncomeCategory = () => {
  const incomeCategories = [
    "Commission",
    "Clients payment",
    "Products",
    "Project",
  ];
  const randomIncomeCategory = faker.random.arrayElement(incomeCategories);
  let description = "";

  switch (randomIncomeCategory) {
    case "Commission":
      description = "Earned through commission on sales.";
      break;
    case "Clients payment":
      description = "Payment received from clients for services rendered.";
      break;
    case "Products":
      description = "Income generated from sales of products.";
      break;
    case "Project":
      description = "Revenue generated from completed projects.";
      break;
    default:
      description = "No description available.";
  }

  return {
    category: randomIncomeCategory,
    description: description,
  };
};

export const generateRandomExpenseCategory = () => {
  const expenseCategories = ["Office rent", "Hotel", "Events", "Other"];
  const randomExpenseCategory = faker.random.arrayElement(expenseCategories);
  let description = "";
  switch (randomExpenseCategory) {
    case "Office rent":
      description = "Payment for office space rental.";
      break;
    case "Hotel":
      description = "Expense incurred for hotel accommodations.";
      break;
    case "Events":
      description = "Costs associated with organizing events.";
      break;
    case "Other":
      description = "Miscellaneous expenses not covered by other categories.";
      break;
    default:
      description = "No description available.";
  }

  return {
    category: randomExpenseCategory,
    description: description,
  };
};
export const generateRandomAnnouncement = () => {
  const announcements = [
    {
      type: "Upcoming Office Closure",
      description:
        "Please be informed that our offices will be closed on [Date] due to [Reason]. Kindly plan your work accordingly and ensure that any urgent tasks are addressed beforehand.",
    },
    {
      type: "New Company Policies",
      description:
        "We have implemented several new policies to enhance our operations and promote a positive work environment. These policies include [brief description of each policy].",
    },
    {
      type: "Employee Recognition",
      description:
        "We would like to recognize the outstanding contributions of [Employee Name/Team] for their exceptional performance on [Project/Task]. Your hard work and dedication are truly appreciated.",
    },
    {
      type: "Reminder: Safety Protocols",
      description:
        "As we continue to prioritize the health and safety of our employees, we kindly remind everyone to adhere to all safety protocols, including wearing masks, practicing social distancing, and following hygiene guidelines.",
    },
    {
      type: "Feedback Survey",
      description:
        "Your feedback is invaluable to us. We invite you to participate in our latest feedback survey to help us improve our services and workplace environment. Your input is highly appreciated.",
    },
  ];

  const randomAnnouncement = faker.random.arrayElement(announcements);
  return {
    type: randomAnnouncement.type,
    description: randomAnnouncement.description,
  };
};
export const getCurrentDate = () => dayjs().format("YYYY-MM-DD");
