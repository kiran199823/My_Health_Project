import { createServer } from 'miragejs';

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    routes () {
      this.namespace = 'api';

      this.get('/posts', () => {
        return [
          { id: 1, title: 'Mock post 1' },
          { id: 2, title: 'Mock post 2' },
          { id: 3, title: 'Mock post 3' }
        ];
      });

      this.post('/posts', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return { ...attrs, id: Math.floor(Math.random() * 1000) };
      });

      this.put('/posts/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        return { id, ...attrs };
      });

      this.delete('/posts/:id', () => {
        return {};
      });
    }
  });

  return server;
}
