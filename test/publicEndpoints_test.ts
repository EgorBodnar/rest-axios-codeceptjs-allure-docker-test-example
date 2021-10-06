import expect from 'expect';
import { ServerInfoService } from '../services/ServerInfoService';
import { PatronsService } from '../services/PatronsService';

Feature('Public endpoints');

Scenario('/serverInfo should return actual server info data', async () => {
  const serverInfoService = new ServerInfoService();

  await serverInfoService.requestGetServerInfo();

  expect(serverInfoService.response.status).toBe(200);
  expect(serverInfoService.response.data.baseUrl).toEqual('http://localhost');
  expect(serverInfoService.response.data.serverTitle).toEqual(
    'Mocked back-end server'
  );
  expect(serverInfoService.response.data.version).toEqual('1.0.3');
  expect(serverInfoService.response.data.buildInfo).toEqual(
    'Mocked back-end based on MockServer(https://www.mock-server.com). Works in docker container.'
  );
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
