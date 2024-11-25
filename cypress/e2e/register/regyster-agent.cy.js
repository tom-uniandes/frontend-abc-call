describe('Register Agent', () => {
    beforeEach(() => {
        // Mock the token verification API
        cy.intercept('GET', '**/auth/verify-authorization*', {
            statusCode: 200,
            body: {
                company: 'mock-company',
                rol: 'AGENTE',
                plan: 'EMPRESARIO_PLUS',
            },
        }).as('verifyAuthorization');

        // Mock the Register Agent API
        cy.intercept('POST', '**/register_agent', {
            statusCode: 200,
            body: {
                id: 'agent-123',
                name: 'New Agent',
                email: 'newagent@example.com',
            },
        }).as('registerAgent');

        // Set mock session storage values
        cy.window().then((win) => {
            win.localStorage.setItem('abcall-token', 'mocked-jwt-token');
            win.sessionStorage.setItem('abcall-company', 'mock-company');
            win.sessionStorage.setItem('abcall-plan', 'EMPRESARIO_PLUS');
            win.sessionStorage.setItem('abcall-rol', 'ADMIN');
        });

        // Visit the page
        cy.visit('/register-agent');
    });

    it('should register a new agent', () => {
        // Wait for token verification to complete
        cy.wait('@verifyAuthorization');

        // Fill in the registration form
        cy.get('input[formControlName="id"]').type('agent-123');
        cy.get('input[formControlName="name"]').type('New Agent');
        cy.get('input[formControlName="email"]').type('newagent@example.com');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the registerAgent API call
        cy.wait('@registerAgent');

        // Check for success message
        cy.get('.toast-message').should('contain', 'Agente registrado con éxito');
    });
});