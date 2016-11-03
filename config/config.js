module.exports = {
        url : 'mongodb://localhost:27017/cwtTasks',
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
