module.exports = {
        url : 'mongodb://localhost:27017/cwtTasks',
        mailer: {
		from: 'test@canwin.com',
		path: 'cwtTask',
		options: {
			//service: process.env.MAILER_SERVICE_PROVIDER || 'smtpout.secureserver.net',
			host: 'smtpout.secureserver.net',
			port: 3535,
			auth: {
				user: 'test@canwin.com',
				pass: 'test@123'
			}
		}
	}
}
