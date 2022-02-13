const fs = require('fs')
const chalk = require('chalk')

global.APIs = {
	zenz: 'https://zenzapi.xyz',
}

global.APIKeys = {
	'https://zenzapi.xyz': 'Your Key',
}

global.owner = ['6283818221226']
global.packname = 'XC-XieCaa'
global.author = 'FxSx'
global.sessionName = 'xiecaa'
global.prefa = ['','!','.','#','-','+']
global.sp = '⭔'
global.mess = {
    success: 'Success',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Loading...',
}
global.thumb = fs.readFileSync('./src/foto1.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
