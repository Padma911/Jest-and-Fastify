const sqlite3 = require('sqlite3').verbose();



const db = new sqlite3.Database(':memory:');

db.serialize(() => {

    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
      const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
      stmt.run("John Doe", "john@example.com");
      stmt.run("Jane Smith", "jane@example.com");
      stmt.run("p","j");
      stmt.finalize();
      db.run("CREATE TABLE blogs   (id INT,  title VARCHAR(200),  image_url VARCHAR(200),  avatar_url VARCHAR(200),  author VARCHAR(200),  topic VARCHAR(200) ) ");
      const stm = db.prepare("INSERT INTO blogs   (id, title, image_url, avatar_url, author, topic )  VALUES   (? ,?, ?, ?, ?, ?);  ");
    data.map(object =>{
        stm.run(object.id, object.title,object.imageUrl,object.avatarUrl,object.author,object.topic)
    })
    stm.finalize();


});

db.close();