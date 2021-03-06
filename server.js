const express = require('express'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      db = require('./config/keys').mongoURI,
      app = express(),
      port = process.env.PORT || 5000,
      auth = require('./routes/auth'),
      admin = require('./routes/admin'),
      posts = require('./routes/posts'),
      comments = require('./routes/comments'),
      multer = require('multer'),
      passport = require('passport');
      socketio = require('socket.io'),
      http = require('http'),
      server = http.createServer(app),
      path = require('path'),
      global.io = module.exports.io =  socketio(server),
      
 



      app.use(express.json())
      app.use( express.urlencoded({ extended: true }) )
      app.use(cors())
      app.use('/public', express.static('public'));
 

      app.use('/api/auth/',auth)
      app.use('/api/admin/',admin)    
      app.use('/api/auth/posts',posts)
      app.use('/api/auth/comments',comments)

    //   io.on('connection',function(socket){
    //     console.log('a user connected')
        
    //     socket.on('disconnect',()=>{
    //         console.log('user has left')
    //     })
    // })

  


 

    // Serve static assets if in production
    if(process.env.NODE_ENV === 'production'){
        // Set Static folder
  
        app.use(express.static('client/build'));
        app.get('*', (req,res) => {
          res.sendFile(path.resolve(__dirname,'client','build','index.html'));
        });
      } 
  

  
   
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify',false);
        
      
        mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true,  useUnifiedTopology: true  })
                .then(console.log('Connected to MongoDB')) 
                .catch(err => console.log(err))

    
      
      server.listen(port,() => {
          console.log(`server started on port ${port}`)
      })


      







     