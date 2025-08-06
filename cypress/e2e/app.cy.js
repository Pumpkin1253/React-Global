describe('MovieDetails spec', () => {
  it('user can move to movieDetails', () => {
    cy.visit('http://localhost:5173/')
    cy.get('img').first().click(); 
    cy.url().should('include', '/962');
  })

    it('user can return to SearchForm', () => {
    cy.visit('http://localhost:5173/962')
    cy.get('[data-cy="movie-search"]').click();
    cy.url().should('include', '/');
  })
})

describe('SearchParams spec', () => {
  it('filtering', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="genre"]').first().click(); 
    cy.url().should('include', '?filter=');
  })

  it('searching', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="search-input"]').type('crazy'); 
    cy.get('[data-cy="search-input-btn"]').click(); 
    cy.url().should('include', '?search=');
  })

    it('sorting', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-cy="sort-select"]').select(1); 
    cy.url().should('include', '?sortBy=');
  })
})