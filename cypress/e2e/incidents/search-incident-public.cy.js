describe('Search Incident Public', () => {
    beforeEach(() => {
        // Mock the token verification API
        cy.intercept('GET', '**/auth/verify-authorization*', {
            statusCode: 200,
            body: {
                company: 'mock-company',
                rol: 'PUBLIC',
                plan: 'BASIC',
            },
        }).as('verifyAuthorization');

        // Mock the Search Incident API
        cy.intercept('GET', '**/search_incident*', {
            statusCode: 200,
            body: {
                incidents: [
                    {
                        id: '789012',
                        description: 'Test Incident Description',
                        date: '2023-10-10',
                        type: 'Petición',
                    },
                ],
            },
        }).as('searchIncident');

        // Set mock session storage values
        cy.window().then((win) => {
            win.localStorage.setItem('abcall-token', 'mocked-jwt-token');
            win.sessionStorage.setItem('abcall-company', 'mock-company');
            win.sessionStorage.setItem('abcall-plan', 'BASIC');
            win.sessionStorage.setItem('abcall-rol', 'PUBLIC');
        });

        // Visit the page
        cy.visit('/incidents/search-incident');
    });

    it('should search for incidents and display results', () => {
        // Wait for token verification to complete
        cy.wait('@verifyAuthorization');

        // Fill in the search form
        cy.get('input[formControlName="searchTerm"]').type('Test Incident');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the searchIncident API call
        cy.wait('@searchIncident');

        // Verify that the incident is displayed in the results
        cy.get('.incident-list').should('contain', 'Test Incident Description');
    });
});