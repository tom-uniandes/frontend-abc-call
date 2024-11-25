describe('Incident Creation and Detail Mock', () => {
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

        // Mock the incident creation API
        cy.intercept('POST', '**/incidents/create_incident', {
            statusCode: 201,
            body: {
                id: '1', // Mocked incident ID
                message: 'Incident created successfully',
            },
        }).as('createIncident');

        // Mock the incident detail API
        cy.intercept('GET', '**/get_incident/1', {
            statusCode: 200,
            body: {
                id: '1',
                type: 'Petición',
                description: 'Test Incident Description',
                date: '2023-10-10',
                userId: '123456',
                channel: 'Correo',
                agentId: 'agent-1',
                company: 'mock-company',
                solved: false,
                response: 'Pending',
            },
        }).as('getIncident');

        // Set mock session storage values
        cy.window().then((win) => {
            win.localStorage.setItem('abcall-token', 'mocked-jwt-token');
            win.sessionStorage.setItem('abcall-company', 'mock-company');
            win.sessionStorage.setItem('abcall-plan', 'EMPRESARIO_PLUS');
            win.sessionStorage.setItem('abcall-rol', 'AGENTE');
        });
    });

    it('should create an incident and display its details', () => {
        // Visit the creation page
        cy.visit('/incidents/create-incident');

        // Wait for token verification
        cy.wait('@verifyAuthorization');

        // Fill in the incident form and submit
        cy.get('mat-select[formControlName="channelSelection"]').click();
        cy.get('mat-option').contains('Correo').click();
        cy.get('input[formControlName="userId"]').type('123456');
        cy.get('input[formControlName="date"]').type('2023-10-10');
        cy.get('mat-select[formControlName="type"]').click();
        cy.get('mat-option').contains('Petición').click();
        cy.get('textarea[formControlName="description"]').type('Test Incident Description');
        cy.get('button[type="submit"]').click();

        // Wait for the mocked incident creation API
        cy.wait('@createIncident').then(({ response }) => {
            expect(response.statusCode).to.eq(201);
            expect(response.body.id).to.eq('1'); // Verify the incident ID
        });

        // Simulate navigation to detail view
        cy.visit('/incidents/incident-detail/1');

        // Wait for the mocked incident detail API
        cy.wait('@getIncident').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body.id).to.eq('1'); // Verify the incident ID in detail view
        });

        // Verify rendered details
        cy.get('h1').should('contain', 'Detalle del incidente 1');
        cy.get('p').contains('Fecha:').should('contain', '2023-10-10');
        cy.get('p').contains('Tipo de problema:').should('contain', 'Petición');
        cy.get('p').contains('Estado:').should('contain', 'Abierto');
        cy.get('p').contains('Descripción:').should('contain', 'Test Incident Description');
        cy.get('p').contains('Respuesta:').should('contain', 'Pending');
    });
});
