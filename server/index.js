require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const sanitizeHtml = require('sanitize-html');


//CSP(Content Security Policy) header to prevent XSS attacks
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; frame-src 'none';");
  next();
});


app.use(cors());
const server = http.createServer(app);

// Connect to MySQL using Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define models based on your database schema
const User = sequelize.define('User', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  nickname: DataTypes.STRING,
  gender_id: DataTypes.INTEGER,
  profile_pic_path: DataTypes.STRING,
  language_id: DataTypes.STRING,
  thread_id: DataTypes.INTEGER,
  status_id: DataTypes.INTEGER,
  about_me: DataTypes.STRING,
  about_me_color: DataTypes.STRING,
  bio_main_color: DataTypes.STRING,
  bio_text_color: DataTypes.STRING,
  verified: DataTypes.BOOLEAN,
  is_admin: DataTypes.BOOLEAN
}, {
  tableName: 'users',
  timestamps: false
});

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_id: DataTypes.INTEGER,
  room_name: DataTypes.STRING,
  text_color: DataTypes.STRING,
  main_color: DataTypes.STRING,
  header_image_path: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  tableName: 'room',
  timestamps: false
});

const RoomMessage = sequelize.define('RoomMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  room_id: DataTypes.INTEGER,
  character_id: DataTypes.INTEGER,
  message: DataTypes.STRING,
  date: DataTypes.DATE
}, {
  tableName: 'room_message',
  timestamps: false
});

const DirectMessage = sequelize.define('DirectMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  room_id: DataTypes.INTEGER,
  sent_from: DataTypes.INTEGER,
  message: DataTypes.STRING,
  sent: DataTypes.DATE,
  seen: DataTypes.BOOLEAN,
  seen_at: DataTypes.DATE
}, {
  tableName: 'direct_message',
  timestamps: false
});

const DirectMessageRoom = sequelize.define('DirectMessageRoom', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user1_id: DataTypes.STRING,
  user2_id: DataTypes.STRING,
  main_color: DataTypes.STRING,
  text_color: DataTypes.STRING,
  header_image_path: DataTypes.STRING,
  is_friend: DataTypes.BOOLEAN
}, {
  tableName: 'direct_message_room',
  timestamps: false
});

const UserCharacter = sequelize.define('UserCharacter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  servermember_id: DataTypes.INTEGER,
  is_verified: DataTypes.BOOLEAN,
  is_own_character: DataTypes.BOOLEAN,
  character_name: DataTypes.STRING,
  nickname: DataTypes.STRING,
  gender_id: DataTypes.INTEGER,
  character_pic_path: DataTypes.STRING,
  birthdate: DataTypes.DATE,
  died: DataTypes.BOOLEAN,
  deathdate: DataTypes.DATE,
  resurrected: DataTypes.BOOLEAN,
  resurrected_date: DataTypes.DATE,
  species_id: DataTypes.INTEGER,
  occupation_id: DataTypes.INTEGER,
  affiliation_id: DataTypes.INTEGER,
  nationality_id: DataTypes.INTEGER,
  status_id: DataTypes.INTEGER,
  story_id: DataTypes.INTEGER,
  bio: DataTypes.STRING,
  powers: DataTypes.STRING,
  weaknesses: DataTypes.STRING,
  used_item: DataTypes.STRING,
  family: DataTypes.STRING,
  universe: DataTypes.STRING,
  fc_type_id: DataTypes.INTEGER,
  fc_name: DataTypes.STRING
}, {
  tableName: 'user_character',
  timestamps: false
});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Define associations
RoomMessage.belongsTo(UserCharacter, { foreignKey: 'character_id' });

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  /*
  // Handle serverKick event
  socket.on('serverKick', async (data) => {
    console.log('serverKick event received:', data);
    const { userId, serverId } = data;

    try {
        // Log the database operation
        console.log(`Removing user ${userId} from server ${serverId} in server_member table`);
        // Remove the user from the server_member table
        await ServerMember.destroy({
            where: {
                user_id: userId,
                server_id: serverId
            }
        });

        // Notify the kicked user
        console.log(`Notifying user ${userId} about being kicked from server ${serverId}`);
        io.to(userId).emit('kickedFromServer', { serverId });

        // Optionally, notify other users in the server about the kick
        console.log(`Notifying other users in server ${serverId} about user ${userId} being kicked`);
        io.to(serverId).emit('userKicked', { userId });

        console.log(`User ${userId} was kicked from server ${serverId}`);
    } catch (error) {
        console.error('Error kicking user from server:', error);
    }
  });
  */



  // Join a room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log("User joined room: " + roomId);

    // Send previous messages in the room
    RoomMessage.findAll({
      where: { room_id: roomId },
      order: [['date', 'ASC']],
      include: [{
        model: UserCharacter,
        attributes: ['character_name', 'character_pic_path']
      }]
    })
    .then(messages => {
      const messagesWithCharacterNames = messages.map(msg => ({
        id: msg.id,
        room_id: msg.room_id,
        character_id: msg.character_id,
        character_name: msg.UserCharacter ? msg.UserCharacter.character_name : 'Unknown',
        character_pic_path: msg.UserCharacter ? msg.UserCharacter.character_pic_path : '',
        message: msg.message,
        date: msg.date
      }));
      console.log('Previous messages:', messagesWithCharacterNames);
      socket.emit('previous_messages', messagesWithCharacterNames);
    })
    .catch(err => console.error('Error fetching previous messages:', err));
  });

  // Handle sending messages
  socket.on('send_message', (data) => {
    const { roomId, userId, characterId, message } = data;

    // Sanitize the message to remove harmful content
    const sanitizedMessage = sanitizeHtml(message, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'], // Allow specific tags
      allowedAttributes: {
        'a': ['href', 'target'] // Allow specific attributes for <a> tags
      }
    });



    console.log('Received message data:', data);
    RoomMessage.create({ room_id: roomId, character_id: characterId, message:sanitizedMessage, date: new Date() })
      .then(newMessage => {
        return RoomMessage.findOne({
          where: { id: newMessage.id },
          include: [{
            model: UserCharacter,
            attributes: ['character_name', 'character_pic_path']
          }]
        });
      })
      .then(newMessageWithCharacterName => {
        const messageData = {
          id: newMessageWithCharacterName.id,
          room_id: newMessageWithCharacterName.room_id,
          character_id: newMessageWithCharacterName.character_id,
          character_name: newMessageWithCharacterName.UserCharacter ? newMessageWithCharacterName.UserCharacter.character_name : 'Unknown',
          character_pic_path: newMessageWithCharacterName.UserCharacter ? newMessageWithCharacterName.UserCharacter.character_pic_path : '',
          message: newMessageWithCharacterName.message,
          date: newMessageWithCharacterName.date
        };
        console.log('Message saved to database:', messageData);
        io.to(roomId).emit('receive_message', messageData);
      })
      .catch(err => {
        console.error('Error saving message to database:', err);
      });
  });


// Join a direct message room
  socket.on("join_direct_message_room", async (roomId) => {
    socket.join(roomId);
    console.log("User joined direct message room: " + roomId);

    // Send previous direct messages in the room
    try {
      const messages = await DirectMessage.findAll({
        where: { room_id: roomId },
        order: [['sent', 'ASC']]
      });

      const messagesWithUserNames = messages.map(msg => ({
        id: msg.id,
        room_id: msg.room_id,
        sent_from: msg.sent_from,
        sent_to: msg.sent_to,
        message: msg.message,
        sent: msg.sent,
        seen: msg.seen,
        seen_at: msg.seen_at
      }));
      console.log('Previous direct messages:', messagesWithUserNames);
      socket.emit('previous_direct_messages', messagesWithUserNames);
    } catch (err) {
      console.error('Error fetching previous direct messages:', err);
    }
  });

  // Handle sending direct messages
  socket.on('send_direct_message', async (data) => {
    const { roomId, sentFrom, sentTo, message } = data;


    // Validate the message field
    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.error('Invalid message received:', message);
      return; // Exit the function if the message is invalid
    }

    // Sanitize the message to remove harmful content
    const sanitizedMessage = sanitizeHtml(message, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'span'], // Allow necessary tags
        allowedAttributes: {
            'a': ['href', 'target', 'rel'], // Allow attributes for <a> tags
            'span': ['class', 'style', 'onclick'], // Allow attributes for <span> tags
        },
        allowedSchemes: ['http', 'https'], // Allow only http and https links
        allowedSchemesByTag: {
            'a': ['http', 'https'], // Ensure <a> tags only allow http/https
        },
    });

    if (!sanitizedMessage || sanitizedMessage.trim() === '') {
        console.error('Sanitized message is empty:', sanitizedMessage);
        return; // Exit the function if the sanitized message is empty
    }


    console.log('Received direct message data:', data);

    try {
     // Check if the DirectMessageRoom exists
     let room = await DirectMessageRoom.findOne({
      where: {
        [Sequelize.Op.or]: [
          { user1_id: sentFrom, user2_id: sentTo },
          { user1_id: sentTo, user2_id: sentFrom }
        ]
      }
    });

      if (!room) {
        room = await DirectMessageRoom.create({
          user1_id: sentFrom,
          user2_id: sentTo
        });
      }

      const newMessage = await DirectMessage.create({
        room_id: room.id,
        sent_from: sentFrom,
        sent_to: sentTo,
        message: sanitizedMessage,
        sent: new Date()
      });

      if(!newMessage) {
        console.error('Failed to create new direct message:', data);
        return; // Exit the function if message creation failed
      }

      const messageData = {
        id: newMessage.id,
        room_id: newMessage.room_id,
        sent_from: newMessage.sent_from,
        sent_to: newMessage.sent_to,
        message: newMessage.message,
        sent: newMessage.sent,
        seen: newMessage.seen,
        seen_at: newMessage.seen_at
      };

      console.log('Direct message saved to database:', messageData);
      io.to(roomId).emit('receive_direct_message', messageData);
    } catch (err) {
      console.error('Error saving direct message to database:', err);
    }
  });






  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING ON PORT 3001");
});