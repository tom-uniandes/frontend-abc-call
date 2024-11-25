describe('Respond to Incident', () => {
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

        // Mock the Get Incident API
        cy.intercept('GET', '**/get_incident*', {
            statusCode: 200,
            body: {
                id: 'incident-123',
                description: 'Test Incident',
                agentId: 'agent-123',
                solved: false,
            },
        }).as('getIncident');

        // Mock the Respond to Incident API
        cy.intercept('POST', '**/respond_incident', {
            statusCode: 200,
        }).as('respondIncident');

        // Set mock session storage values
        cy.window().then((win) => {
            win.localStorage.setItem('abcall-token', 'mocked-jwt-token');
            win.sessionStorage.setItem('abcall-company', 'mock-company');
            win.sessionStorage.setItem('abcall-plan', 'EMPRESARIO_PLUS');
            win.sessionStorage.setItem('abcall-rol', 'AGENTE');
        });

        // Visit the page
        cy.visit('/incidents/incident-detail/incident-123');
    });

    it('should respond to an incident', () => {
        // Wait for token verification and incident retrieval to complete
        cy.wait('@verifyAuthorization');
        cy.wait('@getIncident');

        // Fill in the response form
        cy.get('textarea[formControlName="response"]').type('This is a test response.');

        // Submit the response
        cy.get('button[type="submit"]').click();

        // Wait for the respondIncident API call
        cy.wait('@respondIncident');

        // Check for success message
        cy.get('.toast-message').should('contain', 'Respuesta registrada con éxito');
    });
});