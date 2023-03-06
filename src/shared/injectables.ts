const INJECTABLES = {
  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  // Externals
  IDataFetcherProvider: Symbol.for('IDataFetcherProvider'),
  IUserProvider: Symbol.for('IUserProvider'),
};

export { INJECTABLES };
