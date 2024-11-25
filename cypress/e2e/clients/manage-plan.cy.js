describe('Manage Plan', () => {
    beforeEach(() => {
        // Set up any necessary state or data
        cy.visit('/clients/manage-plan');
    });

    it('should display the manage plan page correctly', () => {
        // Verify that the page loads correctly
        cy.get('.pricing-container').should('be.visible');
        cy.get('.pricing-card').should('have.length', 3); // Assuming there are 3 pricing plans
    });

    it('should allow the user to select a plan', () => {
        // Simulate selecting a plan
        cy.get('.pricing-card').first().find('button').click();

        // Verify that the selection was successful
        cy.get('.selected-plan').should('contain', 'Plan Emprendedor'); // Adjust based on actual plan name
    });

    it('should display the correct prices based on selected currency', () => {
        // Change currency to USD
        cy.get('.currency-selector').select('USD');

        // Verify that the prices are updated
        cy.get('.pricing-card').first().should('contain', 'USD 22,47'); // Adjust based on actual price

        // Change currency to EUR
        cy.get('.currency-selector').select('€-EUR');

        // Verify that the prices are updated
        cy.get('.pricing-card').first().should('contain', 'EUR 20,85'); // Adjust based on actual price
    });
});