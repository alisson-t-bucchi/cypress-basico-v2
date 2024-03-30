Cypress._.times(3, function() {

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.visit('./src/index.html')
        
        cy.get('#firstName')
        .type('Alisson')
        .should('have.value', 'Alisson')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Bucchi')
        .should('have.value', 'Bucchi')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('alisson.t.bucchi@gmail.com')
        .should('have.value', 'alisson.t.bucchi@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('913353366')
        .should('have.value', '913353366')
        .clear()
        .should('have.value', '')
    })

})