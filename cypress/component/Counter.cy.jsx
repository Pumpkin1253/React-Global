import { Counter } from './../../src/feature/homepage/components/Counter'
import { mount } from "cypress/react";  

describe("Counter component", () => {
  it("renders with initial value", () => {
    mount(<Counter initialValue={5} />);
    cy.get("span").should("have.text", "5");
  });

  it("increments count when + button clicked", () => {
    mount(<Counter initialValue={0} />);
    cy.get("button").contains("+").click();
    cy.get("span").should("have.text", "1");
  });

  it("decrements count when – button clicked", () => {
    mount(<Counter initialValue={10} />);
    cy.get("button").contains("–").click();
    cy.get("span").should("have.text", "9");
  });

  it("increments and decrements correctly multiple times", () => {
    mount(<Counter initialValue={0} />);
    cy.get("button").contains("+").click().click();
    cy.get("button").contains("–").click();
    cy.get("span").should("have.text", "1");
  });
});
