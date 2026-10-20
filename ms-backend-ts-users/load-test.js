import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',

  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {

 const url = 'http://[::1]:3008/dev/users/login';

  const payload = JSON.stringify({
    correo: 'juan@test.com',
    password: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status es 200': (r) => r.status === 200,
    'respuesta contiene token': (r) =>
      r.body && r.body.includes('token'),
  });
}