import { createServer } from 'miragejs';

export function makeServer ({ environment = 'development' } = {}) {
  const emailData = [
    { id: 1, email: 'abc@gmail.com' },
    { id: 2, email: 'xyz@gmail.com' },
    { id: 3, email: 'kiranmgowda@gmail.com' }
  ];

  const server = createServer({
    environment,

    timing: 5000,
    routes () {
      this.namespace = 'api';

      this.get('/getemail', () => {
        return emailData;
      });

      this.post('/email', (schema, request) => {
        const attrs = JSON.parse(request.data);
        return { ...attrs, id: Math.floor(Math.random() * 1000) };
      });

      this.post('/findemail', (schema, request) => {
        const email = JSON.parse(request.requestBody);
        const isEmailFound = emailData.find((data) => data.email === email);
        return isEmailFound ?? 'Not found';
      });

      this.put('/email/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        return { id, ...attrs };
      });

      this.delete('/email/:id', () => {
        return {};
      });
    }
  });

  return server;
}
