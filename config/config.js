module.exports = {
        url : process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;'mongodb://localhost:27017/cwtTasks',
        mailer: {
		path: 'Task',
		options: {
			host: 'smtp.server.com',
			port: 'port',
			auth: {
				user: 'test@mail.com',
				pass: 'test@123'
			}
		}
	}
}
