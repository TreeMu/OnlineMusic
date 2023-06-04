const express = require('express')
// console.log(express)

const app = express();

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mydb';
// 使用 MongoClient 连接到 MongoDB 数据库
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected successfully to server");

        const mySchema = mongoose.Schema({
            name: String,
            artist: String,
            duration: String,
            album: String,
            hot: String,
        }, { strictPopulate: false });

        const favorSchema = new mongoose.Schema({
            fname: [{ type: String, ref: 'music' }],
            username: String,
            name: String,
        });

        const favorCol = mongoose.model('favor', favorSchema, 'Favor');
        const myCol = mongoose.model('music', mySchema, 'music_collection');


        const userCol = mongoose.model('user', mySchema, 'User');


        // favorCol.updateOne({ username: '123' }, {$push: {'fname': '789'}})
        // .then(() => {
        //     console.log("Document updated successfully");
        // })
        // .catch((err) => {
        //     console.log("Error updating document:", err);
        // })

        //get查询功能
        app.get('/get', (req, res) => {

            if (req.query.artistName) {
                // Find documents in the collection with a name that matches the regular expression
                myCol.find({ artist: { $regex: req.query.artistName, $options: 'i' } })
                    .then((docs) => {
                        console.log("Documents found:", docs);
                        res.send(docs)
                    })
                    .catch((err) => {
                        console.log("Error finding documents:", err);
                    })
            } else {
                myCol.find({})
                    .then((docs) => {
                        console.log("Found documents:", docs);
                        res.send(docs)
                    })
                    .catch((err) => {
                        console.log("Error finding documents:", err);
                    })
            }
        })

        app.post('/add', (req, res) => {
            var doc = new myCol({
                name: req.name + '',
                artist: req.artist + '',
                duration: req.duration + '',
                poster: req.pos + '',
                lyric: req.lyr + ''
            });

            doc.save().then(() => {
                console.log("Document inserted successfully");
                res.send("success")
            })
                .catch((err) => {
                    console.log("Error inserting document:", err);
                });

        })

        app.post('/edit', (req, res) => {
            // Update a single document based on _id field

            MyCollection.updateOne({ _id: req.id + '' }, { artist: req.artist + '', duration: req.dur, poster: req.pos + '', lyric: req.lyr + '' })
                .then(() => {
                    console.log("Document updated successfully");
                    res.send("操作成功！");
                })
                .catch((err) => {
                    console.log("Error updating document:", err);
                    res.send(err);
                })
        })

        app.get('/del', (req, res) => {
            MyCollection.findByIdAndDelete({ _id: req.id + '' })
                .then(() => {
                    console.log("Document deleted successfully");
                    res.send("操作成功！");
                })
                .catch((err) => {
                    console.log("Error deleting document:", err);
                    res.send(err);
                });
        })

        app.post('/addmusic', (req, res) => {
            mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });
            const conn = mongoose.connection;
            const bucket = new mongoose.mongo.GridFSBucket(conn.db);

            const audioData = bucket.createReadStream('/path/to/audio/file.mp3');
            const uploadStream = bucket.openUploadStream('file.mp3');
            const id = uploadStream.id;

            new Promise((resolve, reject) => {
                audioData.pipe(uploadStream)
                    .on('error', reject)
                    .on('finish', resolve);
            });

            res.send(id);
        })
        app.get('/getmusic', (req, res) => {
            if (req.query.id) {
                const bucket = new mongoose.mongo.GridFSBucket(conn.db)

                const downloadStream = bucket.openDownloadStream(id)
                const chunks = []

                res.send(new Promise((resolve, reject) => {
                    downloadStream.on('data', (chunk) => chunks.push(chunk));
                    downloadStream.on('error', reject);
                    downloadStream.on('end', () => {
                        const audioData = Buffer.concat(chunks);
                        resolve(audioData);
                    });
                }))
            }
        })
        app.get('/findByName', (req, res) => {
            if (req.query.Name) {
                // Find documents in the collection with a name that matches the regular expression
                myCol.find({ name: req.query.Name })
                    .then((docs) => {
                        console.log("Documents found:", docs);
                        res.send(docs)
                    })
                    .catch((err) => {
                        console.log("Error finding documents:", err);
                    })
            }
        });

        app.get('/findByfavor', (req, res) => {
            if (req.query.username) {
                // Find documents in the collection with a name that matches the regular expression
                favorCol.aggregate([
                    {
                        $match: { username: req.query.username }
                    },
                    {
                        $lookup: {
                            from: 'music_collection',
                            localField: 'fname',
                            foreignField: 'name',
                            as: 'songList',
                        }
                    },
                    {
                        $project: {
                            '_id': 0,
                            'username': 1,
                            'songList.name': 1,
                            'songList.artist': 1, // 指定 music 表的 字段返回
                            'songList.duration': 1,
                            'songList.album': 1,
                            'songList.hot': 1,
                            'songList.src': 1,
                        }
                    }
                ]).then((docs) => {
                    console.log("Documents found:", docs);
                    res.send(docs)
                })
                    .catch((err) => {
                        console.log("Error finding documents:", err);
                    })
            }
        });

        app.post('/addfavor', (req, res) => {
            // Update a single document based on _id field
            favorCol.updateOne({ username: req.query.username + '' }, { $push: { 'fname': req.query.fname + '' } })
                .then(() => {
                    console.log("fname updated successfully");
                    res.send("操作成功！");
                })
                .catch((err) => {
                    console.log("Error updating document:", err);
                    res.send(err);
                })
        })

        app.post('/delfavor', (req, res) => {

            favorCol.updateOne({ username: req.query.username + '' }, { $pull: { 'fname': req.query.fname + '' } })
                .then(() => {
                    console.log("fname deled successfully");
                    res.send("操作成功！");
                })
                .catch((err) => {
                    console.log("Error updating document:", err);
                    res.send(err);
                })
        })

        app.get('/checklogin', (req, res) => {
            //接收用户名和密码
            //去数据库查找是否存在该账号密码的用户
            userCol.findOne({ "username": req.query.username, "password": req.query.password })
                .then((data, err) => {
                    if (!err) {
                        res.send(data);
                    } else {
                        throw err;
                    }
                })
                .catch((err) => {
                    throw err;
                })

        });

        app.post('/register', (req, res) => {
            
            userCol.findOne({"username":req.body.username})
            .then((data,err) => {
                if (data){
                    res.send({message: "账号已存在"});
                }else{
                    userCol.insertMany({
                        "username": req.body.username,
                        "password": req.body.password,
                        "phone": req.body.phone,
                        "email": req.body.email,
                     })
                        .then((data, err) => {
                            if (!err) {
                                res.send(data);
                            } else {
                                throw err;
                            }
                        })
                        .catch((err) => {
                            throw err;
                        })
                }
            })
        
        });
    })
    .catch((err) => {
        console.log("Error connecting to server:", err);
    });


const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database!');

    app.get('/getmusic_path', (req, res) => {
        const sql = 'SELECT path FROM music WHERE songname = ?';
        const values = [req.query.songname + ''];
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error retrieving audio file path from database:', err);
                res.send(err)
                return;
            }
            console.log(result)
            const filePath = result[0].path;
            res.send(filePath)
            console.log('Audio file path retrieved from database:', filePath);
        });
    });

});


const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: 'root',
    connect_timeout: 10000, // set connect timeout to 10 seconds
    retry_max_delay: 10000 // set maximum delay for retries to 10 seconds
});

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Redis error: ' + err);
});

app.post('/add_recom', (req, res) => {
    const songname = req.body.songname
    const songData = {
        album: req.body.album,
        artist: req.body.artist,
        duration: req.body.duration,
        hot: req.body.hot,
        path: req.body.path
    };

    client.set(songname, JSON.stringify(songData), (err, redisRes) => {
        if (err) {
            res.status(500).send('Error storing song data in Redis');
        } else {
            console.log(redisRes); // should output 'OK'
            res.send('Song data stored in Redis');
        }
    });
});
const csvtojson = require('csvtojson');
app.get('/get_recom', (req, res) => {
    client.get('csvData', (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error retrieving CSV data from Redis');
        } else {
          csvtojson()
            .fromString(result)
            .then((jsonArray) => {
              const updatedJsonArray = jsonArray.map((row) => {
                delete row['']; // Replace 'column1' with the actual name of the first column
                return row;
              });
              res.send(updatedJsonArray);
              console.log('Get from Redis Successfully')
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Error converting CSV data to JSON');
            });
        }
      });
});

const { spawn } = require('child_process');
app.get('/python', (req, res) => {
    const pythonProcess = spawn('python', ['recom.py'])
    pythonProcess.on('error', (error) => {
        console.error(`error: ${error.message}`);
      });
    pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    console.log(`python finished!!!`);
    });
})

app.get('/csvtojson', (req, res) => {
    const csvFilePath = '../demo/public/follows.csv';
  
    csvtojson()
      .fromFile(csvFilePath)
      .then((json) => {
        res.json(json);
      })
      .catch((err) => {
        console.log('Error while converting CSV to JSON:', err);
        res.status(500).send('Error while converting CSV to JSON');
      });
  });

const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'root'));

const session = driver.session();
console.log('Connect neo4j successfully')
app.get('/get_follow', async (req, res) => {
    // Define the query
    const query = `
    MATCH (person:Person)
    WHERE NOT person.name = "123456"
    OPTIONAL MATCH (other: Person {name: "123456"})-[rel]->(person)
    RETURN person, rel
    `;
  
    // Execute the query and convert the results to JSON
    const result = await session.run(query);
    const jsonResult = [];
    result.records.forEach((record) => {
      const personJson = record.get("person").properties;
      const rel = record.get("rel")
      const relJson = rel ? rel.type : '';
      jsonResult.push({ person: personJson, rel: relJson });
      console.log(personJson);
    });
    console.log(JSON.stringify(jsonResult));
    // Send each JSON object as a separate HTTP response
    res.send(jsonResult)
  });
  

app.post('/add_follow', (req, res) => {
    session.run(
        `
        MATCH (person1:Person {name: $Name1}), (person2:Person {name: $Name2})
        CREATE (person1)-[:FOLLOWS]->(person2)
        `,
        { Name1: req.query.name1, Name2: req.query.name2}
    )
    .then(result => {
        console.log(result.records);
    })
    .catch(error => {
        console.log(error);
    });
})

app.post('/del_follow', (req, res) => {
    session.run(
        'MERGE (b:Person {name: $Name1})-[f:FOLLOWS]->(j:Person {name: $Name2}) DELETE f',
        { Name1: req.query.name1, Name2: req.query.name2}
      )
        .then(result => {
          console.log(`Deleted ${result.summary.counters._stats.relationshipsDeleted} relationship(s)`);
        })
        .catch(error => {
          console.log(error);
        });
})