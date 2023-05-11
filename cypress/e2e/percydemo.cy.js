describe('Integration test with visual testing', function() {
    it('Loads the homepage', function() {
      // Load the page or perform any other interactions with the app.
      cy.visit('/');
      cy.get(".mb-6 > .body-2-bold").click();
      // Take a snapshot for visual diffing
      cy.percySnapshot();
    });
  });