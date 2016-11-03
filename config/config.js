module.exports = {
        url : 'mongodb://localhost:27017/cwtTasks',
        mailer: {
		from: 'test@mail.com',
		path: 'Task',
		options: {
			//service: process.env.MAILER_SERVICE_PROVIDER || 'smtpout.secureserver.net',
			host: 'smtp.server.com',
			port: port,
			auth: {
				user: 'test@mail.com',
				pass: 'test@123'
			}
		}
	}
}
