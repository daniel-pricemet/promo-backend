export interface IDatabaseConnection {
  type: string;
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  company_id?: string;
}

export interface IDatabaseConnectionFromSSO {
  type: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database_name: string;
}
