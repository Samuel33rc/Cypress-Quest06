// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

//Import mailslurp
import "cypress-mailslurp";

// For usage ? 
import { MailSlurp } from "mailslurp-client";

const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
// const inbox = await mailslurp.inboxController.createInboxWithDefaults();

Cypress.Commands.add('mailslurp', () => {
    return Promise.resolve(mailslurp);
});
