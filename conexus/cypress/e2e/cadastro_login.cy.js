describe('Fluxo de Cadastro e Login', () => {
  const email = `conexus@teste.com`;
  const senha = 'conexus123';
  const nomeEmpresa = 'Conexus';

  it('deve cadastrar uma nova empresa com sucesso', () => {
    cy.visit('/cadastro');

    cy.get('input[placeholder="Insira o nome da empresa"]').type(nomeEmpresa);
    cy.get('input[placeholder="Insira seu e-mail"]').type(email);
    cy.get('input[placeholder="Insira sua senha"]').type(senha);

    cy.contains('button', 'Cadastrar').click();

    cy.get('.swal2-popup')
      .should('be.visible')
      .and('contain', 'Empresa cadastrada');

    cy.get('.swal-custom-confirm').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('deve realizar login com a empresa recém cadastrada', () => {
    cy.visit('/');

    cy.get('input[placeholder="Insira seu e-mail"]').type(email);
    cy.get('input[placeholder="Insira sua senha"]').type(senha);

    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/planos');
  });
});