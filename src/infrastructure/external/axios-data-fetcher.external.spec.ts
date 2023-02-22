import { AxiosDataFetcherProvider } from './axios-data-fetcher.external';
import axios from 'axios';

describe('AxiosDataFetcherProvider', () => {
  let sut: AxiosDataFetcherProvider;

  beforeEach(() => {
    sut = new AxiosDataFetcherProvider();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('get', () => {
    beforeEach(() => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation(() => Promise.resolve({ data: 'data' }));
    });

    it('should return data', async () => {
      const response = await sut.get('https://example.com');

      expect(response.data).toBeDefined();
    });
  });

  describe('post', () => {
    beforeEach(() => {
      jest
        .spyOn(axios, 'post')
        .mockImplementation(() => Promise.resolve({ data: 'data' }));
    });

    it('should return data', async () => {
      const response = await sut.post('https://example.com');

      expect(response.data).toBeDefined();
    });
  });

  describe('put', () => {
    beforeEach(() => {
      jest
        .spyOn(axios, 'put')
        .mockImplementation(() => Promise.resolve({ data: 'data' }));
    });

    it('should return data', async () => {
      const response = await sut.put('https://example.com');

      expect(response.data).toBeDefined();
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      jest
        .spyOn(axios, 'delete')
        .mockImplementation(() => Promise.resolve({ data: 'data' }));
    });

    it('should return data', async () => {
      const response = await sut.delete('https://example.com');

      expect(response.data).toBeDefined();
    });
  });
});
