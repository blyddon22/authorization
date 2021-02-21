import json
from django import test


class LoginTests(test.TestCase):

    def test_can_login(self):
        input_data = {
            'data': {
                # 'type': 'people',
                # 'attributes': {
                #       'first_name': 'Matt',
                #       'last_name': 'Morrison'
                # }
            }
        }
        response = self.client.post('/login/', json.dumps(input_data), 'application/json')
        self.assertEqual(201, response.status_code, response.content)
        # response_data = json.loads(response.content)['data']
        # expected_data = input_data['data']['attributes']
        # self.assertEqual(expected_data['first_name'], response_data['attributes']['first_name'])
        # self.assertEqual(expected_data['last_name'], response_data['attributes']['last_name'])
        # self.assertIn('id', response_data)
