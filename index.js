// server.js
const fastify = require('fastify')({ logger: true });
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database(':memory:');


const data = require('./blogs');
console.log(data)
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  stmt.run("John Doe", "john@example.com");
  stmt.run("Jane Smith", "jane@example.com");
  stmt.finalize();

  db.run("CREATE TABLE blogs   (id INT,  title VARCHAR(200),  image_url VARCHAR(200),  avatar_url VARCHAR(200),  author VARCHAR(200),  topic VARCHAR(200) ) ");
  const stm = db.prepare("INSERT INTO blogs   (id, title, image_url, avatar_url, author, topic )  VALUES   (? ,?, ?, ?, ?, ?)  ");
data.map(object =>{
    stm.run(object.id, object.title,object.imageUrl,object.avatarUrl,object.author,object.topic)
})
stm.finalize();


});

//GET  ALL USERS


fastify.get('/users', async (request, reply) => {
    try {
      const users = await getAllUsers();
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
  };

//GET USER WITH ID

fastify.get('/users/:id', (request, reply) => {
    const { id } = request.params;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        reply.status(500).send(err);
      } else if (row) {
        reply.send(row);
      } else {
        reply.status(404).send({ error: 'User not found' });
      }
    });
  });


  //GET ALL BLOGS
  fastify.get('/blogs', async (request, reply) => {
    try {
      const users = await getAllUsers();
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
  const getAllBlogs = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM blogs', (err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
  };


  //GET BLOG WITH ID 

  fastify.get('/blogs/:id', (request, reply) => {
    const { id } = request.params;
    db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
      if (err) {
        reply.status(500).send(err);
      } else if (row) {
        reply.send(row);
      } else {
        reply.status(404).send({ error: 'User not found' });
      }
    });
  });

  //GET PING

fastify.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' };
});

const start = async () => {
  try {
    await fastify.listen({port:3000});
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.log("fastify error", err)
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

module.exports = {fastify,db};
