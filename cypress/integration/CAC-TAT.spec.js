// CAC-TAT.spec.js created with Cypress
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works, check out the link below and learn how to write your first test: https://on.cypress.io/writing-first-test
// <reference types="Cypress" /> 

//import { slowCypressDown } from "cypress-slow-down"


describe('Central de Atendimento ao Cliente TAT', function() {

    var TIME = 3000

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

        cy.clock()

        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Bucchi')
        cy.get('#email').type('alisson.t.bucchi@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(TIME)

        cy.get('.success').should('not.be.visible')
    })

    //exercicio extra 2
    it('exibe mensagem de erro ao submeter formulario email com formatação inválida', function() {

       cy.clock()
       
        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Bucchi')
        cy.get('#email').type('alisson.t.bucchi@gmail,com')
        cy.get('#open-text-area').type('Teste123')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TIME)

        cy.get('.success').should('not.be.visible')
    })

    //exercicio extra 3
    it('exibe campo telefonico vazio se preenchido com valor diferente de numeros', function() {
        cy.get('#phone')
        .type('cjhvbshfjvbndf')
        .should('have.value', '')
    })

    //exercicio extra 4
    it('exibe mensagem de erro quando telefone é obrigatório porém não foi preenchido', function() {
        
        cy.clock()

        cy.get('#firstName').type('Alisson')
        cy.get('#lastName').type('Bucchi')
        cy.get('#email').type('alisson.t.bucchi@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste123')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(TIME)

        cy.get('.success').should('not.be.visible')
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
        
        cy.clock()

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(TIME)

        cy.get('.success').should('not.be.visible')
    })

    //exercicio extra 7 -ler como criar comandos customizados com Cypress 
    it('envia formulario com sucesso usando comando customizado', function() {
        
        cy.clock()

        cy.fillMAndatoryFildsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(TIME)

        cy.get('.success').should('not.be.visible')
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

    //Seção 5 - exercicio extra
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //Seção 6 - exercicio e exercicio extra
    it('marca ambos checkbox e desmarca o ultimo', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    //Seção 7 - exercicio 
    it('faz upload de ficheiro', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    //exercicio extra 1
    it('faz upload de ficheiro simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    //exercicio extra 2
    it('seleciona um arquivo utilizando uma fixture a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
    })


    it('verifica a politica de privacidade abre em outra aba sem a necessidade de clicar', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina da politica de privacidade removendo o target', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })


      it('preenche area de texto usando invoke', () => {

        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

      })

      it('faz uma requisição HTTP', () => {

        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const { status, statusText, body } = response 
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it.only('encontra gato escondido', () => {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
        .invoke('text', 'Eu gosto de gatos')






    })
    
})