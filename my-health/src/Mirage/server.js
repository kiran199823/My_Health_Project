import { createServer } from 'miragejs';

export function makeServer ({ environment = 'development' } = {}) {
  const emailsData = [
    { id: 1, email: 'testing@gmail.com', password: 'Testing@123' },
    { id: 2, email: 'xyz@gmail.com', password: 'Testing@123' },
    { id: 3, email: 'kiranmgowda@gmail.com', password: 'Testing@123' }
  ];

  const server = createServer({
    environment,

    timing: 3000,
    routes () {
      this.namespace = 'api';

      this.get('/getemail', () => {
        return emailsData;
      });

      this.post('/email', (schema, request) => {
        const attrs = JSON.parse(request.data);
        return { ...attrs, id: Math.floor(Math.random() * 1000) };
      });

      this.post('/signin/email', (schema, request) => {
        const email = JSON.parse(request.requestBody);
        const emailData = emailsData.find((data) => data.email === email) ?? '';
        const responseData = {
          email: emailData ?? '',
          isEmailExist: emailData !== ''
        };
        return responseData;
      });

      this.post('/signin/password', (schema, request) => {
        const password = JSON.parse(request.requestBody);
        const emailData =
          emailsData.find((data) => data.password === password) ?? '';
        const responseData = {
          email: emailData ?? '',
          isPasswordMatched: emailData !== ''
        };
        return responseData;
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
