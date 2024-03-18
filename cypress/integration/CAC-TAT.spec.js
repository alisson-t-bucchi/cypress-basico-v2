// CAC-TAT.spec.js created with Cypress
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works, check out the link below and learn how to write your first test: https://on.cypress.io/writing-first-test
// <reference types="Cypress" /> 

//import { slowCypressDown } from "cypress-slow-down"



describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    //slowCypressDown(1000)

    it ('verifica titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //exercicio extra 1
    it('preenche os campos obrigatorios e envio os formularios', function() {

        const longText = 'O referido teste por caractericas unicas de fiabilidade e competencias de assertividade pois a framework Cypress foi desenvolvida exclusivamente sobre essas caracteristas, o que confere, por sua vez, segurança e fiabiliade na execução dos mesmos.'

        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Bucchi')
        cy.get('#email').type('alisson.t.bucchi@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    //exercicio extra 2
    it('exibe mensagem de erro ao submeter formulario email com formatação inválida', function() {

        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Bucchi')
        cy.get('#email').type('alisson.t.bucchi@gmail,com')
        cy.get('#open-text-area').type('Teste123')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //exercicio extra 3
    it('exibe campo telefonico vazio se preenchido com valor diferente de numeros', function() {
        cy.get('#phone')
        .type('cjhvbshfjvbndf')
        .should('have.value', '')
    })

    //exercicio extra 4
    it('exibe mensagem de erro quando telefone é obrigatório porém não foi preenchido', function() {
        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Bucchi')
        cy.get('#email').type('alisson.t.bucchi@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste123')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //exercicio extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
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

    //exercicio extra 6
    it('exibe mensagem de erro ao submeter formulario sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //exercicio extra 7 -ler como criar comandos customizados com Cypress 
    it('envia formulario com sucesso usando comando customizado', function() {
        cy.fillMAndatoryFildsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //exercicio extra 8 - troca para o comando cy.contains('button', 'Enviar').click()

    //Seção 4 - campos de seleção suspensa - exercicio 1
    it('seleciona produto Youtube', function() {
        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')
    })

    //exercicio extra 1
    it('seleciona produto pelo seu valor', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    //exercicio extra 2
    it('seleciona produto pelo seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    //Seção 5 - exercicio
    it('marca o tipo de atendimento Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it.only('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })


})

