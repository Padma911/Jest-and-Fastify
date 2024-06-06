// test/server.test.js

const {fastify,db} = require('./index');





afterAll(() => {
  fastify.close();
});

describe('GET ', () => {
//USER ID DETAILS

    it('should return user details', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/users/1'
        });


    
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
     
     


        expect(response.json()).toEqual({ id: 1, name: 'John Doe', email: 'john@example.com' });
      });


      //ALL USER DETAILS

      it('should return all users details', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/users'
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');

        const usersFromDatabase = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, users) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(users);
                }
              });
            
    
        })

        expect(response.json()).toEqual(usersFromDatabase);
      });

      //ALL BLOG DETAILS

      it('should return all BLOG details', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/blogs'
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');

        const blogsFromDatabase = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM blogs', (err, users) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(users);
                }
              });
            
    
        })

        expect(response.json()).toEqual(blogsFromDatabase);
      });

      it('should return blogs details', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/blogs/1'
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.json()).toEqual({ id: 1, title: 'React v16.9.0 and the Roadmap Update', image_url: 'https://miro.medium.com/max/1050/1*i3hzpSEiEEMTuWIYviYweQ.png',avatar_url: 'https://miro.medium.com/max/4096/1*wiOSfPd2sY0gXSNK9vv6bg.jpeg',author:'Dan Abramov,',topic:'React.js'});
      });
      
      it('should return 404 for non-existent user', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/users/3'
        });
    
        expect(response.statusCode).toBe(404);
        expect(response.json()).toEqual({ error: 'User not found' });
      });
    

  it('should return pong', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/ping'
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.json()).toEqual({ pong: 'it worked!' });
  });
});
