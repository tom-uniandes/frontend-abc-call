describe('Register Client', () => {
    beforeEach(() => {
        // Mock the token verification API
        cy.intercept('GET', '**/auth/verify-authorization*', {
            statusCode: 200,
            body: {
                company: 'mock-company',
                rol: 'CLIENTE',
                plan: 'EMPRESARIO_PLUS',
            },
        }).as('verifyAuthorization');

        // Mock the Register Client API
        cy.intercept('POST', '**/register_client', {
            statusCode: 200,
            body: {
                id: 'client-123',
                name: 'New Client',
                email: 'newclient@example.com',
            },
        }).as('registerClient');

        // Set mock session storage values
        cy.window().then((win) => {
            win.localStorage.setItem('abcall-token', 'mocked-jwt-token');
            win.sessionStorage.setItem('abcall-company', 'mock-company');
            win.sessionStorage.setItem('abcall-plan', 'EMPRESARIO_PLUS');
            win.sessionStorage.setItem('abcall-rol', 'ADMIN');
        });

        // Visit the page
        cy.visit('/register-client');
    });

    it('should register a new client', () => {
        // Wait for token verification to complete
        cy.wait('@verifyAuthorization');

        // Fill in the registration form
        cy.get('input[formControlName="id"]').type('client-123');
        cy.get('input[formControlName="name"]').type('New Client');
        cy.get('input[formControlName="email"]').type('newclient@example.com');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the registerClient API call
        cy.wait('@registerClient');

        // Check for success message
        cy.get('.toast-message').should('contain', 'Cliente registrado con éxito');
    });
});