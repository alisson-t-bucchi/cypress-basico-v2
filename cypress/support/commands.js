Cypress.Commands.add('fillMAndatoryFildsAndSubmit', function() {
    cy.get('#firstName').type('Alisson')
    cy.get('#lastName').type('Bucchi')
    cy.get('#email').type('alisson.t.bucchi@gmail.com')
    cy.get('#open-text-area').type('Teste123')
    cy.get('button[type="submit"]').click()
})