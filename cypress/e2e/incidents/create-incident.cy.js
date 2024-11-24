describe('Create Incident with User Creation', () => {
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

        // Mock the Create User API
        cy.intercept('POST', '**/create_user', {
            statusCode: 200,
            body: {
                id: '123456',
                name: 'Test User',
                phone: '555-1234',
                email: 'testuser@example.com',
            },
        }).as('createUser');

        // Mock the Create Incident API
        cy.intercept('POST', '**/create_incident', {
            statusCode: 200,
        }).as('createIncident');

        // Set mock session storage values
        cy.window().then((win) => {
            win.localStorage.setItem('abcall-token', 'mocked-jwt-token');
            win.sessionStorage.setItem('abcall-company', 'mock-company');
            win.sessionStorage.setItem('abcall-plan', 'EMPRESARIO_PLUS');
            win.sessionStorage.setItem('abcall-rol', 'AGENTE');
        });

        // Visit the page
        cy.visit('/incidents/create-incident');
    });

    it('should create a user after selecting the channel', () => {
        // Wait for token verification to complete
        cy.wait('@verifyAuthorization');

        // Select the channel
        cy.get('mat-select[formControlName="channelSelection"]').click();
        cy.get('mat-option').contains('Correo').click();

        // Open the User Creation Modal
        cy.get('button[mat-icon-button]').contains('add').should('not.be.disabled').click();

        // Fill in the user creation form
        cy.get('input[formControlName="id"]').type('123456');
        cy.get('input[formControlName="name"]').type('Test User');
        cy.get('input[formControlName="phone"]').type('555-1234');
        cy.get('input[formControlName="email"]').type('testuser@example.com');

        // Submit the form
        cy.get('button').contains('Crear Usuario').click();

        // Wait for the API call
        cy.wait('@createUser');

        // Verify that the userId field is populated
        cy.get('input[formControlName="userId"]').should('have.value', '123456');
    });

    it('should create an incident after user creation', () => {
        // Wait for token verification to complete
        cy.wait('@verifyAuthorization');

        // Select the channel
        cy.get('mat-select[formControlName="channelSelection"]').click();
        cy.get('mat-option').contains('Correo').click();

        // Open the User Creation Modal and create a user
        cy.get('button[mat-icon-button]').contains('add').should('not.be.disabled').click();
        cy.get('input[formControlName="id"]').type('123456');
        cy.get('input[formControlName="name"]').type('Test User');
        cy.get('input[formControlName="phone"]').type('555-1234');
        cy.get('input[formControlName="email"]').type('testuser@example.com');
        cy.get('button').contains('Crear Usuario').click();
        cy.wait('@createUser');

        // Fill in the incident form
        cy.get('input[formControlName="date"]').type('2023-10-10');
        cy.get('mat-select[formControlName="type"]').click();
        cy.get('mat-option').contains('Petición').click();
        cy.get('textarea[formControlName="description"]').type('Test Incident Description');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the createIncident API call
        cy.wait('@createIncident');

        // Check for success message
        cy.get('.toast-message').should('contain', 'Incidente registrado con éxito');
    });
});
