module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '52.164.216.10',
      username: 'smartlist',
      password: 'C0nv3rf1t@Sm4rtL1st'
      // pem: './path/to/pem'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    name: 'smartlist',
    path: '../../../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      //PORT:8001,  // Add this line
      ROOT_URL: 'http://smartlist.conver.fit',
      MONGO_URL: 'mongodb://localhost/smartlist',
    },

    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'email.address@domain.com',
    //     // comma separated list of domains
    //     domains: 'website.com,www.website.com'
    //   }
    // },

    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      //image: 'abernix/meteord:base',
	image: 'abernix/meteord:node-8.4.0-base'
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
