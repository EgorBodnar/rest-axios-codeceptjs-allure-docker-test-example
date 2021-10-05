import expect from 'expect';
import { SimpleEndpointService } from '../services/SimpleEndpointService';
import { PatronsService } from '../services/PatronsService';

Feature('Public endpoints');

Scenario('/simpleEndpoint should return simple response data', async () => {
  const simpleEndpointService = new SimpleEndpointService();

  await simpleEndpointService.requestSimpleEndpoint();

  expect(simpleEndpointService.response.status).toBe(200);
  expect(simpleEndpointService.response.data).toEqual('simple response data');
});

Scenario('/patrons should return array of Patrons', async () => {
  const patronsService = new PatronsService();

  const patrons = await patronsService.getPatrons();
  expect(patronsService.response.status).toBe(200);

  expect(patrons.length).toBe(3);

  expect(patrons[0].id).toEqual(123);
  expect(patrons[0].topRatingPlace).toEqual(3);
  expect(patrons[0].nickname).toEqual('Bezons3000');
  expect(patrons[0].donationAmount).toEqual(123987);

  expect(patrons[1].id).toEqual(132);
  expect(patrons[1].topRatingPlace).toEqual(1);
  expect(patrons[1].nickname).toEqual('BlueWolf');
  expect(patrons[1].donationAmount).toEqual(323984);

  expect(patrons[2].id).toEqual(142);
  expect(patrons[2].topRatingPlace).toEqual(2);
  expect(patrons[2].nickname).toEqual('DronMacron');
  expect(patrons[2].donationAmount).toEqual(223989);
});
