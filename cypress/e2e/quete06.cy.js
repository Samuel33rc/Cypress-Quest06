const password1 = "cypressQ06";
const firstName = "Testing";
const lastName = "Quete06";
const email = "047ee7d8-60d4-4b55-bce5-d2d969e0e484@mailslurp.com";
const inboxId1 = "047ee7d8-60d4-4b55-bce5-d2d969e0e484";
const changedPassword = "changedQ06";

describe("Automatisation de réinitialisation de mot de passe", () => {
  // before(function () {
  //   cy.log("Wrap inbox before test");
  //   return cy
  //     .mailslurp()
  //     .then((mailslurp) => mailslurp.createInbox())
  //     .then((inbox) => {
  //       cy.log(`Inbox id ${inbox.id} and Address ${inbox.emailAddress}`);
  //       // save inbox id and email address to this (make sure you use function and not arrow syntax)
  //       cy.wrap(inbox.id).as("inboxId");
  //       cy.wrap(inbox.emailAddress).as("emailAddress");
  //     });
  // });

  // it("test email address", function () {
  //   expect(this.emailAddress).to.contain("@mailslurp");
  // });

  it("la création de compte fonctionne", function () {
    expect(email).to.contain("@mailslurp");
    cy.visit("/");
    cy.get(".mb-6 > .body-2-bold").click();
    cy.get('[data-test="icon-avatar"]').click();
    cy.get("#email").type(email);
    cy.get("#submit-login").click();
    cy.get("#password").type(password1);
    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#submit-signup").click();
    cy.url().should("contain", "dashboard");
  });

  it("la connexion fonctionne", function () {
    expect(email).to.contain("@mailslurp");
    cy.visit("/register");
    cy.get(".mb-6 > .body-2-bold").click();
    cy.get("#signin-email").type(email);
    cy.get("#signin-password").type(password1);
    cy.get('[data-qa="signin-submit-button"] > .MkLAMntR > ._2GvJDBxS').click();
    cy.get('[data-test="dashboard-navigation-profil"]').click();
    cy.get(".body-1-light > .h-auto").click();
  });

  it.only("la connexion avec le nouveau mot de passe fonctionne", function () {
    expect(email).to.contain("@mailslurp");
    cy.visit("/register");
    cy.get(".mb-6 > .body-2-bold").click();
    cy.get("form > :nth-child(3) > .cK_xUFG6").click();
    cy.url().should("include", "password-reset");
    cy.get("#email").type(email);
    cy.get('[data-test="password-reset-submit-button"]').click();
    cy.wait(2000);
    cy.url().should("contain", "password-reset/confirm");
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(inboxId1, 30000, true))
      .then((email) => {
        cy.document().invoke("write", email.body);
        cy.get(".t_pt20px > a").click();
        cy.get("#newPassword").type(changedPassword);
        cy.get("#newPasswordConfirmation").type(changedPassword);
        cy.get("._1xMx-RYw").click();
      });
    cy.get("#email").type(email);
    cy.get("#submit-login").click();
    cy.get("#password").type(changedPassword);
    cy.get("#submit-login").click();
    cy.visit("/dashboard/orders").should("be.ok");
    cy.get('[data-test="dashboard-navigation-profil"]').click();
    cy.get(".body-1-light > :nth-child(2)").then((item) => {
      expect(item).to.contain(email);
    });
  });
});

// Expression régulière pour les liens href
// href="([^"]+)"
