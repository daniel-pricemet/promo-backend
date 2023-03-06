export class Company {
  id: string;
  name: string;
  corpoate_name: string;
  patron: string;
  cnpj: string;
  ie: string;

  constructor(
    id: string,
    name: string,
    corpoate_name: string,
    patron: string,
    cnpj: string,
    ie: string,
  ) {
    this.id = id;
    this.name = name;
    this.corpoate_name = corpoate_name;
    this.patron = patron;
    this.cnpj = cnpj;
    this.ie = ie;
  }
}
