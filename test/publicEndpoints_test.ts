import expect from 'expect';
import { SimpleEndpointService } from '../services/SimpleEndpointService';

Feature('Public endpoints');

Scenario('simpleEndpoint should return simple response data', async () => {
  const simpleEndpointService = new SimpleEndpointService();

  await simpleEndpointService.requestSimpleEndpoint();

  expect(simpleEndpointService.response.status).toBe(200);
  expect(simpleEndpointService.response.data).toEqual('simple response data');
});
