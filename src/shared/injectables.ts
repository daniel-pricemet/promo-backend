const INJECTABLES = {
  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  // Externals
  IDataFetcherProvider: Symbol.for('IDataFetcherProvider')
};

export { INJECTABLES };
