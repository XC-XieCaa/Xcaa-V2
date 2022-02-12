/*
> Create By : FxSx
> Partner : Fatih
> Partner : FdlX
> Partner : NuyFaa
> Xcaa-V2 : [Multi Device]
*/
require('./config')
const { BufferJSON, 
       WA_DEFAULT_EPHEMERAL, 
       generateWAMessageFromContent, 
       proto, 
       generateWAMessageContent, 
       generateWAMessage, 
       prepareWAMessageMedia, 
       areJidsSameUser 
} = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const { fromBuffer } = require('file-type')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom } = require('./lib/myfunc')

let cmdmedia = JSON.parse(fs.readFileSync('./database/cmdmedia.json'))
let game = JSON.parse(fs.readFileSync("./database/game.json"))
let tebaklagu = game.tebaklagu = []
let _family100 = game.family100 = []
let kuismath = game.math = []
let tebakgambar = game.tebakgambar = []
let tebakkata = game.tebakkata = []
let caklontong = game.lontong = []
let tebakkalimat = game.kalimat = []
let tebaklirik = game.lirik = []
let tebaktebakan = game.tebakan = []

	module.exports = xcaa = async (xcaa, m, chatUpdate, store) => {
            var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
            var budy = (typeof m.text == 'string' ? m.text : '')
            var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
            const isCmd = body.startsWith(prefix)
            const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const pushname = m.pushName || "No Name"
            const botNumber = xcaa.user.id ? xcaa.user.id.split(":")[0]+"@s.whatsapp.net" : xcaa.user.id
            const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            const itsMe = m.sender == botNumber ? true : false
            const text = q = args.join(" ")
            const quoted = m.quoted ? m.quoted : m
            const mime = (quoted.msg || quoted).mimetype || ''
            const isMedia = /image|video|sticker|audio/.test(mime)

            const groupMetadata = m.isGroup ? await xcaa.groupMetadata(m.chat).catch(e => {}) : ''
            const groupName = m.isGroup ? groupMetadata.subject : ''
            const participants = m.isGroup ? await groupMetadata.participants : ''
            const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
            const groupOwner = m.isGroup ? groupMetadata.owner : ''
            const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
            const isGroupOwner = m.isGroup ? groupOwner.includes(m.sender) : false
            const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total
			last.speed += cpu.speed / length
			last.times.user += cpu.times.user
			last.times.nice += cpu.times.nice
			last.times.sys += cpu.times.sys
			last.times.idle += cpu.times.idle
			last.times.irq += cpu.times.irq
			return last
            }, {
            speed: 0,
			total: 0,
			times: {
			    user: 0,
			    nice: 0,
			    sys: 0,
			    idle: 0,
			    irq: 0
              }
            })

            // Public & Self
            if (!xcaa.public) {
            if (!m.key.fromMe) return
            }

            if (m.message) {
            xcaa.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
            }
            
            if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in cmdmedia)) {
            let hash = cmdmedia[m.msg.fileSha256.toString('base64')]
            let { text, mentionedJid } = hash
            let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: xcaa.user.id,
            quoted: m.quoted && m.quoted.fakeObj
            })
            messages.key.fromMe = areJidsSameUser(m.sender, xcaa.user.id)
            messages.key.id = m.key.id
            messages.pushName = m.pushName
            if (m.isGroup) messages.participant = m.sender
            let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
            }
            xcaa.ev.emit('messages.upsert', msg)
            }
            
            if (('family100'+m.chat in _family100) && isCmd) {
            kuis = true
            let room = _family100['family100'+m.chat]
            let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, '')
            let isSurender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
            if (!isSurender) {
                let index = room.jawaban.findIndex(v => v.toLowerCase().replace(/[^\w\s\-]+/, '') === teks)
                if (room.terjawab[index]) return !0
                room.terjawab[index] = m.sender
            }
            let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
            let caption = `Jawablah Pertanyaan Berikut :\n${room.soal}\n\n\nTerdapat ${room.jawaban.length} Jawaban ${room.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}
            ${isWin ? `Semua Jawaban Terjawab` : isSurender ? 'Menyerah!' : ''}
            ${Array.from(room.jawaban, (jawaban, index) => {
            return isSurender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
            }).filter(v => v).join('\n')}
            ${isSurender ? '' : `Perfect Player`}`.trim()
            xcaa.sendText(m.chat, caption, m, { contextInfo: { mentionedJid: parseMention(caption) }}).then(mes => { return _family100['family100'+m.chat].pesan = mesg }).catch(_ => _)
            if (isWin || isSurender) delete _family100['family100'+m.chat]
            }

            if (tebaklagu.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebaklagu[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak lagu', buttonText: { displayText: 'Tebak Lagu' }, type: 1 }], `🎮 Tebak Lagu 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete tebaklagu[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

            if (kuismath.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = kuismath[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await m.reply(`🎮 Kuis Matematika  🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? kirim ${prefix}math mode`)
                delete kuismath[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

            if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebakgambar[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak gambar', buttonText: { displayText: 'Tebak Gambar' }, type: 1 }], `🎮 Tebak Gambar 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete tebakgambar[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

            if (tebakkata.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebakkata[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak kata', buttonText: { displayText: 'Tebak Kata' }, type: 1 }], `🎮 Tebak Kata 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete tebakkata[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

            if (caklontong.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = caklontong[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak lontong', buttonText: { displayText: 'Tebak Lontong' }, type: 1 }], `🎮 Cak Lontong 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete caklontong[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

            if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebakkalimat[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak kalimat', buttonText: { displayText: 'Tebak Kalimat' }, type: 1 }], `🎮 Tebak Kalimat 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete tebakkalimat[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

            if (tebaklirik.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebaklirik[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak lirik', buttonText: { displayText: 'Tebak Lirik' }, type: 1 }], `🎮 Tebak Lirik 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete tebaklirik[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }

	        if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
            kuis = true
            jawaban = tebaktebakan[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak tebakan', buttonText: { displayText: 'Tebak Tebakan' }, type: 1 }], `🎮 Tebak Tebakan 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`, xcaa.user.name, m)
                delete tebaktebakan[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
            }
        
            //TicTacToe
            this.game = this.game ? this.game : {}
            let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING')
            if (room) {
            let ok
            let isWin = !1
            let isTie = !1
            let isSurrender = !1
            if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text)) return
            isSurrender = !/^[1-9]$/.test(m.text)
            if (m.sender !== room.game.currentTurn) {
            if (!isSurrender) return !0
            }
            if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
            m.reply({
            '-3': 'Game telah berakhir',
            '-2': 'Invalid',
            '-1': 'Posisi Invalid',
            0: 'Posisi Invalid',
            }[ok])
            return !0
            }
            if (m.sender === room.game.winner) isWin = true
            else if (room.game.board === 511) isTie = true
            let arr = room.game.render().map(v => {
            return {
            X: '❌',
            O: '⭕',
            1: '1️⃣',
            2: '2️⃣',
            3: '3️⃣',
            4: '4️⃣',
            5: '5️⃣',
            6: '6️⃣',
            7: '7️⃣',
            8: '8️⃣',
            9: '9️⃣',
            }[v]
            })
            if (isSurrender) {
            room.game._currentTurn = m.sender === room.game.playerX
            isWin = true
            }
            let winner = isSurrender ? room.game.currentTurn : room.game.winner
            let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} Menang!` : isTie ? `Game berakhir (+${playScore} XP)` : `Giliran ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}
❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}

Ketik *nyerah* untuk menyerah dan mengakui kekalahan`
            if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
            room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
            if (room.x !== room.o) await xcaa.sendText(room.x, str, m, { mentions: parseMention(str) } )
            await xcaa.sendText(room.o, str, m, { mentions: parseMention(str) } )
            if (isTie || isWin) {
            delete this.game[room.id]
            }
            }

            //Suit PvP
            this.suit = this.suit ? this.suit : {}
            let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
            if (roof) {
            let win = ''
            let tie = false
            if (m.sender == roof.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
            if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
            xcaa.sendTextWithMentions(m.chat, `@${roof.p2.split`@`[0]} menolak suit, suit dibatalkan`, m)
            delete this.suit[roof.id]
            return !0
            }
            roof.status = 'play'
            roof.asal = m.chat
            clearTimeout(roof.waktu)
            xcaa.sendText(m.chat, `Suit telah dikirimkan ke chat

@${roof.p.split`@`[0]} dan 
@${roof.p2.split`@`[0]}

Silahkan pilih suit di chat masing²
klik https://wa.me/${botNumber.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })
            if (!roof.pilih) xcaa.sendText(roof.p, `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`, m)
            if (!roof.pilih2) xcaa.sendText(roof.p2, `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`, m)
            roof.waktu_milih = setTimeout(() => {
            if (!roof.pilih && !roof.pilih2) xcaa.sendText(m.chat, `Kedua pemain tidak niat main,\nSuit dibatalkan`)
            else if (!roof.pilih || !roof.pilih2) {
            win = !roof.pilih ? roof.p2 : roof.p
            xcaa.sendTextWithMentions(m.chat, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} tidak memilih suit, game berakhir`, m)
            }
            delete this.suit[roof.id]
            return !0
            }, roof.timeout)
            }
            let jwb = m.sender == roof.p
            let jwb2 = m.sender == roof.p2
            let g = /gunting/i
            let b = /batu/i
            let k = /kertas/i
            let reg = /^(gunting|batu|kertas)/i
            if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
            roof.pilih = reg.exec(m.text.toLowerCase())[0]
            roof.text = m.text
            m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ''}`)
            if (!roof.pilih2) xcaa.sendText(roof.p2, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
            }
            if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
            roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
            roof.text2 = m.text
            m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih ? `\n\nMenunggu lawan memilih` : ''}`)
            if (!roof.pilih) xcaa.sendText(roof.p, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
            }
            let stage = roof.pilih
            let stage2 = roof.pilih2
            if (roof.pilih && roof.pilih2) {
            clearTimeout(roof.waktu_milih)
            if (b.test(stage) && g.test(stage2)) win = roof.p
            else if (b.test(stage) && k.test(stage2)) win = roof.p2
            else if (g.test(stage) && k.test(stage2)) win = roof.p
            else if (g.test(stage) && b.test(stage2)) win = roof.p2
            else if (k.test(stage) && b.test(stage2)) win = roof.p
            else if (k.test(stage) && g.test(stage2)) win = roof.p2
            else if (stage == stage2) tie = true
            xcaa.sendText(roof.asal, `_*Hasil Suit*_${tie ? '\nSERI' : ''}

            @${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Menang \n` : ` Kalah \n`}
            @${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Menang \n` : ` Kalah \n`}
            `.trim(), m, { mentions: [roof.p, roof.p2] })
            delete this.suit[roof.id]
            }
            }
			switch(command) {
            case 'menu':
                 textnya = `
╭「 *INFO BOT* 」
├ Name : Xcaa-Bot
└ Create : FxSx

╭「 *ABOUT* 」
├ ${prefix}owner
├ ${prefix}ping
├ ${prefix}delete
├ ${prefix}listpc
├ ${prefix}listgrup
└ ${prefix}sc

╭「 *FUNNY* 」
├ ${prefix}halah
├ ${prefix}hilih
├ ${prefix}huluh
├ ${prefix}heleh
├ ${prefix}holoh
├ ${prefix}kuismath
├ ${prefix}tictactoe
├ ${prefix}delttt
├ ${prefix}suit
├ ${prefix}family100
└ ${prefix}tebak

╭「 *PRIMBON* 」
├ ${prefix}nomerhoki
├ ${prefix}artimimpi
├ ${prefix}ramalanjodoh
├ ${prefix}ramalanjodohbali
├ ${prefix}suamiistri
├ ${prefix}ramalancinta
├ ${prefix}artinama
├ ${prefix}kecocokannama
├ ${prefix}kecocokanpasangan
├ ${prefix}jadianpernikahan
├ ${prefix}sifatusaha
├ ${prefix}rejeki
├ ${prefix}pekerjaan
├ ${prefix}ramalannasib
├ ${prefix}potensipenyakit
├ ${prefix}artitarot
├ ${prefix}fengshui
├ ${prefix}haribaik
├ ${prefix}harisangar
├ ${prefix}harinaas
├ ${prefix}nagahari
├ ${prefix}arahrejeki
├ ${prefix}peruntungan
├ ${prefix}weton
├ ${prefix}keberuntungan
├ ${prefix}memancing
├ ${prefix}masasubur
├ ${prefix}zodiak
├ ${prefix}shio
└ ${prefix}sifat

╭「 *SEARCH-DOWN* 」
├ ${prefix}play
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}getmusic
├ ${prefix}getvideo
├ ${prefix}pinterest
├ ${prefix}gimage
├ ${prefix}google
├ ${prefix}ytsearch
├ ${prefix}wikimedia
├ ${prefix}ytsearch
├ ${prefix}quotesanime
├ ${prefix}tiktoknowm
├ ${prefix}tiktokwm
├ ${prefix}tiktokmp3
├ ${prefix}igdl
├ ${prefix}igdltv
├ ${prefix}twitdl
├ ${prefix}twittermp3
├ ${prefix}fbdl
└ ${prefix}pinterestdl

╭「 *GROUPS* 」
├ ${prefix}hidetag
├ ${prefix}tagall
├ ${prefix}setprofile
├ ${prefix}setdesc
├ ${prefix}setname
├ ${prefix}group
├ ${prefix}editinfo
├ ${prefix}linkgroup
├ ${prefix}ephemeral
├ ${prefix}add
├ ${prefix}promote
├ ${prefix}demote
├ ${prefix}block
└ ${prefix}unblock

╭「 *CONVERTER* 」
├ ${prefix}sticker
├ ${prefix}ebinary
├ ${prefix}dbinary
├ ${prefix}emojimix
├ ${prefix}toimage
├ ${prefix}tovideo
├ ${prefix}togif
├ ${prefix}tourl
└ ${prefix}imagenobg

╭「 *DATABASE* 」
├ ${prefix}setcmd
├ ${prefix}delcmd
├ ${prefix}listcmd
├ ${prefix}lockcmd
├ ${prefix}addmsg
├ ${prefix}getmsg
├ ${prefix}listmsg
└ ${prefix}delmsg

╭「 *OWNER* 」
├ ${prefix}public
├ ${prefix}self
├ ${prefix}join
├ ${prefix}leave
├ ${prefix}block
├ ${prefix}unblock
├ ${prefix}chat
├ ${prefix}bcgc
├ ${prefix}bcall
└ ${prefix}quoted
`
                 let message = await prepareWAMessageMedia({ image: fs.readFileSync('./src/foto1.jpg') }, { upload: xcaa.waUploadToServer })
                 const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: textnya,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Source Code',
                                    url: 'https://github.com/XC-XieCaa'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Owner',
                                    phoneNumber: '+62 838-1822-1226'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Status Bot',
                                    id: 'ping'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: 'owner'
                                }  
                            }, {
                                quickReplyButton: {
                                    displayText: 'Script',
                                    id: 'sc'
                                }
                            }]
                         }
                     }
                 }), { userJid: m.chat, quoted: m })
                 xcaa.relayMessage(m.chat, template.message, { messageId: template.key.id })
                 }
                 break
//=====[ ABOUT ] =====\\
            case 'ping': case 'botstatus': case 'statusbot': {
                 let timestamp = speed()
                 let latensi = speed() - timestamp
                 neww = performance.now()
                 oldd = performance.now()
                 respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim()
                 m.reply(respon)
                 }
                 break
            case 'sc': {
                 m.reply('Script : https://github.com/XC-XieCaa')
                 }
                 break
            case 'owner': case 'creator': {
                 xcaa.sendContact(m.chat, global.owner, m)
                 }
                 break
            case 'delete': case 'del': case 'd': {
                 if (!m.quoted) throw false
                 let { chat, fromMe, id, isBaileys } = m.quoted
                 if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                 xcaa.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
                 }
                 break
            case 'listpc': {
                 let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
                 let teks = `⬣ *LIST CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
                 for (let i of anu) {
                     let nama = store.messages[i].array[0].pushName
                     teks += `⬡ *Nama :* ${nama}\n⬡ *User :* @${i.split('@')[0]}\n⬡ *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
                 }
                 xcaa.sendTextWithMentions(m.chat, teks, m)
                 }
                 break
            case 'listgc': case 'listgrup': {
                 let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
                 let teks = `⬣ *LIST GROUP*\n\nTotal Group : ${anu.length} Group\n\n`
                 for (let i of anu) {
                     let metadata = await xcaa.groupMetadata(i)
                     teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* @${metadata.owner.split('@')[0]}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
                 }
                 xcaa.sendTextWithMentions(m.chat, teks, m)
                 }
                 break
//=====[ FUNNY ]=====\\
            case 'ttc': case 'ttt': case 'tictactoe': {
                 let TicTacToe = require("./lib/tictactoe")
                 this.game = this.game ? this.game : {}
                 if (Object.values(this.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw 'Kamu masih didalam game'
                 let room = Object.values(this.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
                 if (room) {
                 m.reply('Partner ditemukan!')
                 room.o = m.chat
                 room.game.playerO = m.sender
                 room.state = 'PLAYING'
                 let arr = room.game.render().map(v => {
                 return {
                 X: '❌',
                 O: '⭕',
                 1: '1️⃣',
                 2: '2️⃣',
                 3: '3️⃣',
                 4: '4️⃣',
                 5: '5️⃣',
                 6: '6️⃣',
                 7: '7️⃣',
                 8: '8️⃣',
                 9: '9️⃣',
                 }[v]
                 })
                 let str = `Room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Menunggu @${room.game.currentTurn.split('@')[0]}

Ketik *nyerah* untuk menyerah dan mengakui kekalahan`
                 if (room.x !== room.o) await xcaa.sendText(room.x, str, m, { mentions: parseMention(str) } )
                 await xcaa.sendText(room.o, str, m, { mentions: parseMention(str) } )
                 } else {
                 room = {
                 id: 'tictactoe-' + (+new Date),
                 x: m.chat,
                 o: '',
                 game: new TicTacToe(m.sender, 'o'),
                 state: 'WAITING'
                 }
                 if (text) room.name = text
                 m.reply('Menunggu partner' + (text ? ` mengetik command dibawah ini ${prefix}${command} ${text}` : ''))
                 this.game[room.id] = room
                 }
                 }
                 break
            case 'tebak': {
                 if (!text) throw `Example : ${prefix + command} lagu\n\nOption : \n1. lagu\n2. gambar\n3. kata\n4. kalimat\n5. lirik\n6.lontong`
                 if (args[0] === "lagu") {
                    if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://fatiharridho.github.io/tebaklagu.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    let msg = await xcaa.sendMessage(m.chat, { audio: { url: result.link_song }, mimetype: 'audio/mpeg' }, { quoted: m })
                    xcaa.sendText(m.chat, `Lagu Tersebut Adalah Lagu dari?\n\nArtist : ${result.artist}\nWaktu : 60s`, msg).then(() => {
                    tebaklagu[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak lagu', buttonText: { displayText: 'Tebak Lagu' }, type: 1 }], `Waktu Habis\nJawaban:  ${result.jawaban}\n\nIngin bermain? tekan button dibawah`, xcaa.user.name, m)
                    delete tebaklagu[m.sender.split('@')[0]]
                    }
                 } else if (args[0] === 'gambar') {
                    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    xcaa.sendImage(m.chat, result.img, `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 60s`, m).then(() => {
                    tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak gambar', buttonText: { displayText: 'Tebak Gambar' }, type: 1 }], `Waktu Habis\nJawaban:  ${result.jawaban}\n\nIngin bermain? tekan button dibawah`, xcaa.user.name, m)
                    delete tebakgambar[m.sender.split('@')[0]]
                    }
                 } else if (args[0] === 'kata') {
                    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    xcaa.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`, m).then(() => {
                    tebakkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak kata', buttonText: { displayText: 'Tebak Kata' }, type: 1 }], `Waktu Habis\nJawaban:  ${result.jawaban}\n\nIngin bermain? tekan button dibawah`, xcaa.user.name, m)
                    delete tebakkata[m.sender.split('@')[0]]
                    }
                 } else if (args[0] === 'kalimat') {
                    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    xcaa.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`, m).then(() => {
                    tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak kalimat', buttonText: { displayText: 'Tebak Kalimat' }, type: 1 }], `Waktu Habis\nJawaban:  ${result.jawaban}\n\nIngin bermain? tekan button dibawah`, xcaa.user.name, m)
                    delete tebakkalimat[m.sender.split('@')[0]]
                    }
                 } else if (args[0] === 'lirik') {
                    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    xcaa.sendText(m.chat, `Ini Adalah Lirik Dari Lagu? : *${result.soal}*?\nWaktu : 60s`, m).then(() => {
                    tebaklirik[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak lirik', buttonText: { displayText: 'Tebak Lirik' }, type: 1 }], `Waktu Habis\nJawaban:  ${result.jawaban}\n\nIngin bermain? tekan button dibawah`, xcaa.user.name, m)
                    delete tebaklirik[m.sender.split('@')[0]]
                    }
                 } else if (args[0] === 'lontong') {
                    if (caklontong.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    xcaa.sendText(m.chat, `*Jawablah Pertanyaan Berikut :*\n${result.soal}*\nWaktu : 60s`, m).then(() => {
                    caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    xcaa.sendButtonText(m.chat, [{ buttonId: 'tebak lontong', buttonText: { displayText: 'Tebak Lontong' }, type: 1 }], `Waktu Habis\nJawaban:  ${result.jawaban}\nDeskripsi : ${result.deskripsi}\n\nIngin bermain? tekan button dibawah`, xcaa.user.name, m)
                    delete caklontong[m.sender.split('@')[0]]
                    }
                  }
                 }
                 break
            case 'kuismath': case 'math': {
                 if (kuismath.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                 let { genMath, modes } = require('./lib/math')
                 if (!text) throw `Mode: ${Object.keys(modes).join(' | ')}\nContoh penggunaan: ${prefix}math medium`
                 let result = await genMath(text.toLowerCase())
                 xcaa.sendText(m.chat, `*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nWaktu: ${(result.waktu / 1000).toFixed(2)} detik`, m).then(() => {
                    kuismath[m.sender.split('@')[0]] = result.jawaban
                 })
                 await sleep(result.waktu)
                 if (kuismath.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    m.reply("Waktu Habis\nJawaban: " + result.jawaban)
                    delete kuismath[m.sender.split('@')[0]]
                 }
                 }
                 break
            case 'delttc': case 'delttt': {
                 this.game = this.game ? this.game : {}
                 try {
                 if (this.game) {
                 delete this.game
                 xcaa.sendText(m.chat, `Berhasil delete session TicTacToe`, m)
                 } else if (!this.game) {
                 m.reply(`Session TicTacToe🎮 tidak ada`)
                 } else throw '?'
                 } catch (e) {
                 m.reply('rusak')
                 }
                 }
                 break
                 case 'suitpvp': case 'suit': {
                 this.suit = this.suit ? this.suit : {}
                 let poin = 10
                 let poin_lose = 10
                 let timeout = 60000
                 if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) m.reply(`Selesaikan suit mu yang sebelumnya`)
                 if (!m.mentionedJid[0]) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @${owner[1]}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
                 if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`
                 let id = 'suit_' + new Date() * 1
                 let caption = `_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${m.mentionedJid[0].split`@`[0]} untuk bermain suit

Silahkan @${m.mentionedJid[0].split`@`[0]} untuk ketik terima/tolak`
                 this.suit[id] = {
                 chat: await xcaa.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
                 id: id,
                 p: m.sender,
                 p2: m.mentionedJid[0],
                 status: 'wait',
                 waktu: setTimeout(() => {
                 if (this.suit[id]) xcaa.sendText(m.chat, `_Waktu suit habis_`, m)
                 delete this.suit[id]
                 }, 60000), poin, poin_lose, timeout
                 }
                 }
                 break
            case 'family100': {
                 if ('family100'+m.chat in _family100) {
                    m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
                    throw false
                 }
                 let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
                 let random = anu[Math.floor(Math.random() * anu.length)]
                 let hasil = `*Jawablah Pertanyaan Berikut :*\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}`.trim()
                 _family100['family100'+m.chat] = {
                    id: 'family100'+m.chat,
                    pesan: await xcaa.sendText(m.chat, hasil, m),
                    ...random,
                    terjawab: Array.from(random.jawaban, () => false),
                    hadiah: 6,
                  }
                 }
                 break
            case 'halah': case 'hilih': case 'huluh': case 'heleh': case 'holoh':
                 if (!m.quoted && !text) throw `Kirim/reply text dengan caption ${prefix + command}`
                 ter = command[1].toLowerCase()
                 tex = m.quoted ? m.quoted.text ? m.quoted.text : q ? q : m.text : q ? q : m.text
                 m.reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
                 break
//=====[ PRIMBON ]=====\\
            case 'nomerhoki': case 'nomorhoki': {
                 if (!Number(text)) throw `Example : ${prefix + command} 6288292024190`
                 let anu = await primbon.nomer_hoki(Number(text))
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nomor HP :* ${anu.message.nomer_hp}\n⭔ *Angka Shuzi :* ${anu.message.angka_shuzi}\n⭔ *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n⭔ *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`, m)
                 }
                 break
            case 'artimimpi': case 'tafsirmimpi': {
                 if (!text) throw `Example : ${prefix + command} belanja`
                 let anu = await primbon.tafsir_mimpi(text)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Mimpi :* ${anu.message.mimpi}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Solusi :* ${anu.message.solusi}`, m)
                 }
                 break
            case 'ramalanjodoh': case 'ramaljodoh': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005, Novia, 16, 11, 2004`
                 let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                 let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'ramalanjodohbali': case 'ramaljodohbali': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005, Novia, 16, 11, 2004`
                 let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                 let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'suamiistri': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005, Novia, 16, 11, 2004`
                 let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                 let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama Suami :* ${anu.message.suami.nama}\n⭔ *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n⭔ *Nama Istri :* ${anu.message.istri.nama}\n⭔ *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'ramalancinta': case 'ramalcinta': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005, Novia, 16, 11, 2004`
                 let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
                 let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'artinama': {
                 if (!text) throw `Example : ${prefix + command} Pinky Ardianta`
                 let anu = await primbon.arti_nama(text)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'kecocokannama': case 'cocoknama': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005`
                 let [nama, tgl, bln, thn] = text.split`,`
                 let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Life Path :* ${anu.message.life_path}\n⭔ *Destiny :* ${anu.message.destiny}\n⭔ *Destiny Desire :* ${anu.message.destiny_desire}\n⭔ *Personality :* ${anu.message.personality}\n⭔ *Persentase :* ${anu.message.persentase_kecocokan}`, m)
                 }
                 break
            case 'kecocokanpasangan': case 'cocokpasangan': case 'pasangan': {
                 if (!text) throw `Example : ${prefix + command} Pinky|Novia`
                 let [nama1, nama2] = text.split`|`
                 let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendImage(m.chat,  anu.message.gambar, `⭔ *Nama Anda :* ${anu.message.nama_anda}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}`, m)
                 }
                 break
            case 'jadianpernikahan': case 'jadiannikah': {
                 if (!text) throw `Example : ${prefix + command} 6, 12, 2020`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Tanggal Pernikahan :* ${anu.message.tanggal}\n⭔ *karakteristik :* ${anu.message.karakteristik}`, m)
                 }
                 break
            case 'sifatusaha': {
                 if (!ext)throw `Example : ${prefix+ command} 28, 12, 2021`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Usaha :* ${anu.message.usaha}`, m)
                 }
                 break
            case 'rejeki': case 'rezeki': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Rezeki :* ${anu.message.rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'pekerjaan': case 'kerja': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Pekerjaan :* ${anu.message.pekerjaan}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'ramalannasib': case 'ramalnasib': case 'nasib': {
                 if (!text) throw `Example : 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.ramalan_nasib(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Angka Akar :* ${anu.message.angka_akar}\n⭔ *Sifat :* ${anu.message.sifat}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`, m)
                 }
                 break
            case 'potensipenyakit': case 'penyakit': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Sektor :* ${anu.message.sektor}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'artitarot': case 'tarot': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendImage(m.chat, anu.message.image, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Simbol Tarot :* ${anu.message.simbol_tarot}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'fengshui': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 1, 2005\n\nNote : ${prefix + command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`
                 let [nama, gender, tahun] = text.split`,`
                 let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tahun_lahir}\n⭔ *Gender :* ${anu.message.jenis_kelamin}\n⭔ *Angka Kua :* ${anu.message.angka_kua}\n⭔ *Kelompok :* ${anu.message.kelompok}\n⭔ *Karakter :* ${anu.message.karakter}\n⭔ *Sektor Baik :* ${anu.message.sektor_baik}\n⭔ *Sektor Buruk :* ${anu.message.sektor_buruk}`, m)
                 }
                 break
            case 'haribaik': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.petung_hari_baik(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Kala Tinantang :* ${anu.message.kala_tinantang}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'harisangar': case 'taliwangke': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'harinaas': case 'harisial': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.primbon_hari_naas(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hari Naas :* ${anu.message.hari_naas}\n⭔ *Info :* ${anu.message.catatan}\n⭔ *Catatan :* ${anu.message.info}`, m)
                 }
                 break
            case 'nagahari': case 'harinaga': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'arahrejeki': case 'arahrezeki': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Rezeki :* ${anu.message.arah_rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'peruntungan': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005, 2022\n\nNote : ${prefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`
                 let [nama, tgl, bln, thn, untuk] = text.split`,`
                 let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'weton': case 'wetonjawa': {
                 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.weton_jawa(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Tanggal :* ${anu.message.tanggal}\n⭔ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⭔ *Watak Hari :* ${anu.message.watak_hari}\n⭔ *Naga Hari :* ${anu.message.naga_hari}\n⭔ *Jam Baik :* ${anu.message.jam_baik}\n⭔ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`, m)
                 }
                 break
            case 'sifat': case 'karakter': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005`
                 let [nama, tgl, bln, thn] = text.split`,`
                 let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Garis Hidup :* ${anu.message.garis_hidup}`, m)
                 }
                 break
            case 'keberuntungan': {
                 if (!text) throw `Example : ${prefix + command} Pinky, 7, 7, 2005`
                 let [nama, tgl, bln, thn] = text.split`,`
                 let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}`, m)
                 }
                 break
            case 'memancing': {
                 if (!text) throw `Example : ${prefix + command} 12, 1, 2022`
                 let [tgl, bln, thn] = text.split`,`
                 let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Tanggal :* ${anu.message.tgl_memancing}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'masasubur': {
                 if (!text) throw `Example : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${prefix + command} hari pertama menstruasi, siklus`
                 let [tgl, bln, thn, siklus] = text.split`,`
                 let anu = await primbon.masa_subur(tgl, bln, thn, siklus)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'zodiak': case 'zodiac': {
                 if (!text) throw `Example : ${prefix+ command} 7 7 2005`
                 let zodiak = [
                    ["capricorn", new Date(1970, 0, 1)],
                    ["aquarius", new Date(1970, 0, 20)],
                    ["pisces", new Date(1970, 1, 19)],
                    ["aries", new Date(1970, 2, 21)],
                    ["taurus", new Date(1970, 3, 21)],
                    ["gemini", new Date(1970, 4, 21)],
                    ["cancer", new Date(1970, 5, 22)],
                    ["leo", new Date(1970, 6, 23)],
                    ["virgo", new Date(1970, 7, 23)],
                    ["libra", new Date(1970, 8, 23)],
                    ["scorpio", new Date(1970, 9, 23)],
                    ["sagittarius", new Date(1970, 10, 22)],
                    ["capricorn", new Date(1970, 11, 22)]
                 ].reverse()

                 function getZodiac(month, day) {
                    let d = new Date(1970, month - 1, day)
                    return zodiak.find(([_,_d]) => d >= _d)[0]
                 }
                 let date = new Date(text)
                 if (date == 'Invalid Date') throw date
                 let d = new Date()
                 let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
                 let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
                 let zodiac = await getZodiac(birth[1], birth[2])                
                 let anu = await primbon.zodiak(zodiac)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Zodiak :* ${anu.message.zodiak}\n⭔ *Nomor :* ${anu.message.nomor_keberuntungan}\n⭔ *Aroma :* ${anu.message.aroma_keberuntungan}\n⭔ *Planet :* ${anu.message.planet_yang_mengitari}\n⭔ *Bunga :* ${anu.message.bunga_keberuntungan}\n⭔ *Warna :* ${anu.message.warna_keberuntungan}\n⭔ *Batu :* ${anu.message.batu_keberuntungan}\n⭔ *Elemen :* ${anu.message.elemen_keberuntungan}\n⭔ *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
                 }
                 break
            case 'shio': {
                 if (!text) throw `Example : ${prefix + command} tikus\n\nNote : For Detail https://primbon.com/shio.htm`
                 let anu = await primbon.shio(text)
                 if (anu.status == false) return m.reply(anu.message)
                 xcaa.sendText(m.chat, `⭔ *Hasil :* ${anu.message}`, m)
                 }
                 break
//=====[ SEARCH ]=====\\
            case 'yts': case 'ytsearch': {
                 if (!text) throw `Example : ${prefix + command} story wa anime`
                 let yts = require("yt-search")
                 let search = await yts(text)
                 let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
                 let no = 1
                 for (let i of search.all) {
                    teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${i.videoId}\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${i.timestamp}\n⭔ Upload At : ${i.ago}\n⭔ Author : ${i.author.name}\n⭔ Url : ${i.url}\n\n─────────────────\n\n`
                 }
                 xcaa.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
                 }
                 break
            case 'play': case 'ytplay': {
                 if (!text) throw `Example : ${prefix + command} story wa anime`
                 let yts = require("yt-search")
                 let search = await yts(text)
                 let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
                 let buttons = [
                    {buttonId: `ytmp3 ${anu.url} 128kbps`, buttonText: {displayText: '♫ Audio'}, type: 1},
                    {buttonId: `ytmp4 ${anu.url} 360p`, buttonText: {displayText: '► Video'}, type: 1}
                 ]
                 let buttonMessage = {
                    image: { url: anu.thumbnail },
                    caption: `
⭔ Title : ${anu.title}
⭔ Ext : Search
⭔ ID : ${anu.videoId}
⭔ Duration : ${anu.timestamp}
⭔ Viewers : ${anu.views}
⭔ Upload At : ${anu.ago}
⭔ Author : ${anu.author.name}
⭔ Channel : ${anu.author.url}
⭔ Description : ${anu.description}
⭔ Url : ${anu.url}`,
                    footer: xcaa.user.name,
                    buttons: buttons,
                    headerType: 4
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
	        case 'ytmp3': case 'ytaudio': {
                 if (!text) throw `Example : ${prefix + command} https://youtube.com/... 128kbps`
		         let { aiovideodl } = require('./lib/scraper')
                 let result = await aiovideodl(isUrl(text)[0])
                 let { url, title, thumbnail, duration, medias } = result
                 let quality = args[1] ? args[1] : '128kbps'                
                 let media = medias.filter(v => v.videoAvailable == false && v.audioAvailable == true && v.quality == quality).map(v => v)
                 if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
                 xcaa.sendImage(m.chat, thumbnail, `⭔ Title : ${title}\n⭔ File Size : ${media[0].formattedSize}\n⭔ Url : ${url}\n⭔ Ext : MP3\n⭔ Resolusi : ${args[1] || '128kbps'}`, m)
                 xcaa.sendMessage(m.chat, { audio: { url: media[0].url }, mimetype: 'audio/mp4', fileName: `${title}.mp3` }, { quoted: m })
                 }
                 break
            case 'ytmp4': case 'ytvideo': {
                 if (!text) throw `Example : ${prefix + command} https://youtube.com/... 360p`
		         let { aiovideodl } = require('./lib/scraper')
                 let result = await aiovideodl(isUrl(text)[0])
                 let { url, title, thumbnail, duration, medias } = result
                 let quality = args[1] ? args[1] : '360p'                
                 let media = medias.filter(v => v.videoAvailable == true && v.audioAvailable == false && v.quality == quality).map(v => v)
                 if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
                 xcaa.sendMessage(m.chat, { video: { url: media[0].url }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `⭔ Title : ${title}\n⭔ File Size : ${media[0].formattedSize}\n⭔ Url : ${url}\n⭔ Ext : MP4\n⭔ Resolusi : ${args[1] || '360p'}` }, { quoted: m })
                 }
                 break
	        case 'getmusic': {
                 if (!text) throw `Example : ${prefix + command} 1`
                 if (!m.quoted) return m.reply('Reply Pesan')
                 if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
                 let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
                 if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
		         let { aiovideodl } = require('./lib/scraper')
                 let result = await aiovideodl(urls[text - 1])
                 let { url, title, thumbnail, duration, medias } = result
                 let quality = args[1] ? args[1] : '128kbps'                
                 let media = medias.filter(v => v.videoAvailable == false && v.audioAvailable == true && v.quality == quality).map(v => v)
                 if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
                 xcaa.sendImage(m.chat, thumbnail, `⭔ Title : ${title}\n⭔ File Size : ${media[0].formattedSize}\n⭔ Url : ${url}\n⭔ Ext : MP3\n⭔ Resolusi : ${args[1] || '128kbps'}`, m)
                 xcaa.sendMessage(m.chat, { audio: { url: media[0].url }, mimetype: 'audio/mp4', fileName: `${title}.mp3` }, { quoted: m })
                 }
                 break
            case 'getvideo': {
                 if (!text) throw `Example : ${prefix + command} 1`
                 if (!m.quoted) return m.reply('Reply Pesan')
                 if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
                 let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
                 if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
		         let { aiovideodl } = require('./lib/scraper')
                 let result = await aiovideodl(urls[text - 1])
                 let { url, title, thumbnail, duration, medias } = result
                 let quality = args[1] ? args[1] : '360p'                
                 let media = medias.filter(v => v.videoAvailable == true && v.audioAvailable == false && v.quality == quality).map(v => v)
                 if (media[0].formattedSize.split('MB')[0] >= 100.00) return m.reply('File Melebihi Batas'+util.format(media))
                 xcaa.sendMessage(m.chat, { video: { url: media[0].url }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `⭔ Title : ${title}\n⭔ File Size : ${media[0].formattedSize}\n⭔ Url : ${url}\n⭔ Ext : MP4\n⭔ Resolusi : ${args[1] || '360p'}` }, { quoted: m })
                 }
                 break
            case 'tiktok': case 'tiktoknowm': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/tiktok', { url: text }, 'apikey'))
                 let buttons = [
                    {buttonId: `tiktokwm ${text}`, buttonText: {displayText: 'With Watermark'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: 'Audio'}, type: 1}
                 ]
                 let buttonMessage = {
                    video: { url: anu.result.nowatermark },
                    caption: `Download From ${text}`,
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 5
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
            case 'tiktokwm': case 'tiktokwatermark': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/tiktok', { url: text }, 'apikey'))
                 let buttons = [
                    {buttonId: `tiktoknowm ${text}`, buttonText: {displayText: 'No Watermark'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: 'Audio'}, type: 1}
                 ]
                 let buttonMessage = {
                    video: { url: anu.result.watermark },
                    caption: `Download From ${text}`,
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 5
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
            case 'tiktokmp3': case 'tiktokaudio': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/tiktok', { url: text }, 'apikey'))
                 let buttons = [
                    {buttonId: `tiktoknowm ${text}`, buttonText: {displayText: 'No Watermark'}, type: 1},
                    {buttonId: `tiktokwm ${text}`, buttonText: {displayText: 'With Watermark'}, type: 1}
                 ]
                 let buttonMessage = {
                    text: `Download From ${text}`,
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 2
                 }
                 let msg = await xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 xcaa.sendMessage(m.chat, { audio: { url: anu.result.audio } }, { quoted: msg })
                 }
                 break
	        case 'igdl': case 'ig': case 'instagram': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/instagram2', { url: text }, 'apikey'))
                 xcaa.sendMessage(m.chat, { video: { url: anu.data[0] }, caption: `Download From ${text}` }, { quoted: m})
                 } 
                 break
            case 'igdltv': case 'igreels': case 'igdl2': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/instagram', { url: text }, 'apikey'))
                 xcaa.sendMessage(m.chat, { video: { url: anu.result.link }, caption: `⭔ Desc : ${anu.result.caption.desc}`}, { quoted: m })
                 }
                 break
	        case 'twitdl': case 'twitter': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/twitter', { url: text }, 'apikey'))
                 let buttons = [
                    {buttonId: `twittermp3 ${text}`, buttonText: {displayText: '► Audio'}, type: 1}
                 ]
                 let buttonMessage = {
                    video: { url: anu.result.HD || anu.result.SD },
                    caption: util.format(anu.result),
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 5
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
            case 'twittermp3': case 'twitteraudio': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/twitter', { url: text }, 'apikey'))
                 let buttons = [
                    {buttonId: `twitter ${text}`, buttonText: {displayText: '► Video'}, type: 1}
                 ]
                 let buttonMessage = {
		         image: { url: anu.result.thumb },
                    caption: util.format(anu.result),
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 4
                 }
                 let msg = await xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 xcaa.sendMessage(m.chat, { audio: { url: anu.result.audio } }, { quoted: msg })
                 }
                 break
	        case 'fbdl': case 'fb': case 'facebook': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/facebook', { url: text }, 'apikey'))
                 xcaa.sendMessage(m.chat, { video: { url: anu.result.url }, caption: `⭔ Title : ${anu.result.title}`}, { quoted: m })
                 }
                 break
	        case 'pindl': case 'pinterestdl': {
                 if (!text) throw 'Masukkan Link!'
                 m.reply(mess.wait)
                 let anu = await fetchJson(api('zenz', '/api/downloader/pinterestdl', { url: text }, 'apikey'))
                 xcaa.sendMessage(m.chat, { video: { url: anu.result }, caption: `Download From ${text}` }, { quoted: m })
                 }
                 break
            case 'pinterest': {
                 m.reply(mess.wait)
		         let { pinterest } = require('./lib/scraper')
                 anu = await pinterest(text)
                 result = anu[Math.floor(Math.random() * anu.length)]
                 xcaa.sendMessage(m.chat, { image: { url: result }, caption: '⭔ Media Url : '+result }, { quoted: m })
                 }
                 break
            case 'google': {
                 if (!text) throw `Example : ${prefix + command} Yuna Taira`
                 let google = require('google-it')
                 google({'query': text}).then(res => {
                 let teks = `Google Search From : ${text}\n\n`
                 for (let g of res) {
                 teks += `⭔ *Title* : ${g.title}\n`
                 teks += `⭔ *Description* : ${g.snippet}\n`
                 teks += `⭔ *Link* : ${g.link}\n\n────────────────────────\n\n`
                 } 
                 m.reply(teks)
                 })
                 }
                 break
            case 'gimage': {
                 if (!text) throw `Example : ${prefix + command} Yuna Taira`
                 let gis = require('g-i-s')
                 gis(text, async (error, result) => {
                 n = result
                 images = n[Math.floor(Math.random() * n.length)].url
                 let buttons = [
                    {buttonId: `gimage ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
                 ]
                 let buttonMessage = {
                    image: { url: images },
                    caption: `*-------「 GIMAGE SEARCH 」-------*
🤠 *Query* : ${text}
🔗 *Media Url* : ${images}`,
                    footer: xcaa.user.name,
                    buttons: buttons,
                    headerType: 4
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 })
                 }
                 break
            case 'wallpaper': {
                 if (!text) throw 'Masukkan Query Title'
		         let { wallpaper } = require('./lib/scraper')
                 anu = await wallpaper(text)
                 result = anu[Math.floor(Math.random() * anu.length)]
		         let buttons = [
                    {buttonId: `wallpaper ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
                 ]
                 let buttonMessage = {
                    image: { url: result.image[0] },
                    caption: `⭔ Title : ${result.title}\n⭔ Category : ${result.type}\n⭔ Detail : ${result.source}\n⭔ Media Url : ${result.image[2] || result.image[1] || result.image[0]}`,
                    footer: xcaa.user.name,
                    buttons: buttons,
                    headerType: 4
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
            case 'wikimedia': {
                 if (!text) throw 'Masukkan Query Title'
		         let { wikimedia } = require('./lib/scraper')
                 anu = await wikimedia(text)
                 result = anu[Math.floor(Math.random() * anu.length)]
                 let buttons = [
                    {buttonId: `wikimedia ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
                 ]
                 let buttonMessage = {
                    image: { url: result.image },
                    caption: `⭔ Title : ${result.title}\n⭔ Source : ${result.source}\n⭔ Media Url : ${result.image}`,
                    footer: xcaa.user.name,
                    buttons: buttons,
                    headerType: 4
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
            case 'quotesanime': case 'quoteanime': {
		         let { quotesAnime } = require('./lib/scraper')
                 let anu = await quotesAnime()
                 result = anu[Math.floor(Math.random() * anu.length)]
                 let buttons = [
                    {buttonId: `quotesanime`, buttonText: {displayText: 'Next'}, type: 1}
                 ]
                 let buttonMessage = {
                    text: `~_${result.quotes}_\n\nBy '${result.karakter}', ${result.anime}\n\n- ${result.up_at}`,
                    footer: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 2
                 }
                 xcaa.sendMessage(m.chat, buttonMessage, { quoted: m })
                 }
                 break
//=====[ GROUPS ]=====\\
            case 'setname': case 'setsubject': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
                 if (!text) throw 'Text ?'
                 await xcaa.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))
                 }
                 break
            case 'setdesc': case 'setdesk': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
                 if (!text) throw 'Text ?'
                 await xcaa.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => m.reply(jsonformat(err)))
                 }
                 break
            case 'setprofile': case 'setpp': {
                 if (!isCreator) throw mess.owner
                 if (!quoted) throw 'Reply Image'
                 if (/image/.test(mime)) throw `balas image dengan caption *${prefix + command}*`
                 let media = await xcaa.downloadAndSaveMediaMessage(quoted)
                 if (!m.isGroup && !isBotAdmins && !isGroupAdmins && !isGroupOwner) {
                 await xcaa.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
		         await fs.unlinkSync(media)
                 } else if (!isCreator) {
                 await xcaa.updateProfilePicture(xcaa.user.id, { url: media }).catch((err) => fs.unlinkSync(media))
		         await fs.unlinkSync(media)
                 }
                 }
                 break
            case 'tagall': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
let teks = `══✪〘 *TAG ALL* 〙✪══
 
 ➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
                 for (let mem of participants) {
                 teks += `⭔ @${mem.id.split('@')[0]}\n`
                 }
                 xcaa.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
                 }
                 break
            case 'hidetag': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
                 xcaa.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
                 }
                 break
            case 'group': case 'grup': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
                 if (args[0] === 'close'){
                    await xcaa.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'open'){
                    await xcaa.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply(jsonformat(err)))
                 } else {
                 let buttons = [
                        { buttonId: 'group open', buttonText: { displayText: 'Open' }, type: 1 },
                        { buttonId: 'group close', buttonText: { displayText: 'Close' }, type: 1 }
                 ]
                 await xcaa.sendButtonText(m.chat, buttons, `Mode Group`, xcaa.user.name, m)
                 }
                 }
                 break
            case 'editinfo': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
                 if (args[0] === 'open'){
                 await xcaa.groupSettingUpdate(m.chat, 'unlocked').then((res) => m.reply(`Sukses Membuka Edit Info Group`)).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'close'){
                 await xcaa.groupSettingUpdate(m.chat, 'locked').then((res) => m.reply(`Sukses Menutup Edit Info Group`)).catch((err) => m.reply(jsonformat(err)))
                 } else {
                 let buttons = [
                        { buttonId: 'editinfo open', buttonText: { displayText: 'Open' }, type: 1 },
                        { buttonId: 'editinfo close', buttonText: { displayText: 'Close' }, type: 1 }
                 ]
                 await xcaa.sendButtonText(m.chat, buttons, `Mode Edit Info`, xcaa.user.name, m)
                 }
                 }
                 break
            case 'linkgroup': case 'linkgc': {
                 if (!m.isGroup) throw mess.group
                 let response = await xcaa.groupInviteCode(m.chat)
                 xcaa.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
                 }
                 break
            case 'ephemeral': {
                 if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
                 if (!text) throw 'Masukkan value enable/disable'
                 if (args[0] === 'enable') {
                    await xcaa.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'disable') {
                    await xcaa.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 }
                 }
                 break
            case 'add': {
		         if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
		         let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
	        case 'promote': {
		         if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
		         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
	        case 'demote': {
		         if (!m.isGroup) throw mess.group
                 if (!isBotAdmins) throw mess.botAdmin
                 if (!isGroupAdmins && !isGroupOwner) throw mess.admin
		         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
            case 'block': {
		         if (!isCreator) throw mess.owner
		         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
            case 'unblock': {
		         if (!isCreator) throw mess.owner
		         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
//=====[ CONVERTER ]=====\\
            case 'sticker': case 's': case 'stickergif': case 'sgif': {
                 if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
                 m.reply(mess.wait)
                 if (/image/.test(mime)) {
                 let media = await quoted.download()
                 let encmedia = await xcaa.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                 await fs.unlinkSync(encmedia)
                 } else if (/video/.test(mime)) {
                 if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
                 let media = await quoted.download()
                 let encmedia = await xcaa.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                 await fs.unlinkSync(encmedia)
                 } else {
                 throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
                 }
                 }
                 break
            case 'ebinary': {
                 if (!m.quoted.text && !text) throw `Kirim/reply text dengan caption ${prefix + command}`
                 let { eBinary } = require('./lib/binary')
                 let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
                 let eb = await eBinary(teks)
                 m.reply(eb)
                 }
                 break
            case 'dbinary': {
                 if (!m.quoted.text && !text) throw `Kirim/reply text dengan caption ${prefix + command}`
                 let { dBinary } = require('./lib/binary')
                 let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
                 let db = await dBinary(teks)
                 m.reply(db)
                 }
                 break
            case 'emojimix': {
	             if (!text) throw `Example : ${prefix + command} 😅+🤔`
		         let [emoji1, emoji2] = text.split`+`
		         let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		         for (let res of anu.results) {
		         let encmedia = await xcaa.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
		         await fs.unlinkSync(encmedia)
		         }
	             }
	             break
            case 'toimage': case 'toimg': {
                 if (!quoted) throw 'Reply Image'
                 if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                 m.reply(mess.wait)
                 let media = await xcaa.downloadAndSaveMediaMessage(quoted)
                 let ran = await getRandom('.png')
                 exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                 fs.unlinkSync(media)
                 if (err) throw err
                 let buffer = fs.readFileSync(ran)
                 xcaa.sendMessage(m.chat, { image: buffer }, { quoted: m })
                 fs.unlinkSync(ran)
                 })
                 }
                 break
	        case 'tomp4': case 'tovideo': {
                 if (!quoted) throw 'Reply Image'
                 if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                 m.reply(mess.wait)
	        	 let { webp2mp4File } = require('./lib/scraper')
                 let media = await xcaa.downloadAndSaveMediaMessage(quoted)
                 let webpToMp4 = await webp2mp4File(media)
                 await xcaa.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                 await fs.unlinkSync(media)
                 }
                 break
            case 'togif': {
                 if (!quoted) throw 'Reply Image'
                 if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                 m.reply(mess.wait)
		         let { webp2mp4File } = require('./lib/scraper')
                 let media = await xcaa.downloadAndSaveMediaMessage(quoted)
                 let webpToMp4 = await webp2mp4File(media)
                 await xcaa.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                 await fs.unlinkSync(media)
                 }
                 break
	        case 'tourl': {
                 m.reply(mess.wait)
		         let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
                 let media = await xcaa.downloadAndSaveMediaMessage(quoted)
                 if (/image/.test(mime)) {
                 let anu = await TelegraPh(media)
                 m.reply(util.format(anu))
                 } else if (!/image/.test(mime)) {
                 let anu = await UploadFileUgu(media)
                 m.reply(util.format(anu))
                 }
                 await fs.unlinkSync(media)
                 }
                 break
            case 'imagenobg': case 'removebg': case 'remove-bg': {
	             if (!quoted) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
	             if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
	             if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
	             let remobg = require('remove.bg')
	             let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU','S258diZhcuFJooAtHTaPEn4T','5LjfCVAp4vVNYiTjq9mXJWHF','aT7ibfUsGSwFyjaPZ9eoJc61','BY63t7Vx2tS68YZFY6AJ4HHF','5Gdq1sSWSeyZzPMHqz7ENfi8','86h6d6u4AXrst4BVMD9dzdGZ','xp8pSDavAgfE5XScqXo9UKHF','dWbCoCb3TacCP93imNEcPxcL']
	             let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]
	             hmm = await './src/remobg-'+getRandom('')
	             localFile = await xcaa.downloadAndSaveMediaMessage(quoted, hmm)
	             outputFile = await './src/hremo-'+getRandom('.png')
	             m.reply(mess.wait)
	             remobg.removeBackgroundFromImageFile({
	             path: localFile,
	             apiKey: apinobg,
	             size: "regular",
	             type: "auto",
	             scale: "100%",
	             outputFile 
	             }).then(async result => {
	             xcaa.sendMessage(m.chat, {image: fs.readFileSync(outputFile), caption: mess.success}, {quoted:m})
	             await fs.unlinkSync(localFile)
	             await fs.unlinkSync(outputFile)
	             })
	             }
	             break
//=====[ DATABASE ]=====\\
            case 'setcmd': {
                 if (!m.quoted) throw 'Reply Pesan!'
                 if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
                 if (!text) throw `Untuk Command Apa?`
                 let hash = m.quoted.fileSha256.toString('base64')
                 if (cmdmedia[hash] && cmdmedia[hash].locked) throw 'You have no permission to change this sticker command'
                 cmdmedia[hash] = {
                    text,
                    mentionedJid: m.mentionedJid,
                    creator: m.sender,
                    at: + new Date,
                    locked: false,
                 }
                 fs.writeFileSync('./database/cmdmedia.json', JSON.stringify(cmdmedia))
                 m.reply(`Done!`)
                 }
                 break
            case 'delcmd': {
                 let hash = m.quoted.fileSha256.toString('base64')
                 if (!hash) throw `Tidak ada hash`
                 if (cmdmedia[hash] && cmdmedia[hash].locked) throw 'You have no permission to delete this sticker command'              
                 delete cmdmedia[hash]
                 fs.writeFileSync('./database/cmdmedia.json', JSON.stringify(cmdmedia))
                 m.reply(`Done!`)
                 }
                 break
            case 'listcmd': {
                 let teks = `
*List Hash*
Info: *bold* hash is Locked
${Object.entries(cmdmedia).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}
`.trim()
                 xcaa.sendText(m.chat, teks, m, { mentions: Object.values(cmdmedia).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], []) })
                 }
                 break
            case 'lockcmd': {
                 if (!isCreator) throw mess.owner
                 if (!m.quoted) throw 'Reply Pesan!'
                 if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
                 let hash = m.quoted.fileSha256.toString('base64')
                 if (!(hash in cmdmedia)) throw 'Hash not found in database'
                 cmdmedia[hash].locked = !/^un/i.test(command)
                 fs.writeFileSync('./database/cmdmedia.json', JSON.stringify(cmdmedia))
                 m.reply('Done!')
                 }
                 break
            case 'addmsg': {
                 if (!m.quoted) throw 'Reply Message Yang Ingin Disave Di Database'
                 if (!text) throw `Example : ${prefix + command} nama file`
                 let msgs = JSON.parse(fs.readFileSync('./database/data.json'))
                 if (text.toLowerCase() in msgs) throw `'${text}' telah terdaftar di list pesan`
                 msgs[text.toLowerCase()] = quoted.fakeObj
                 fs.writeFileSync('./database/data.json', JSON.stringify(msgs))
m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'
    
Akses dengan ${prefix}getmsg ${text}

Lihat list Pesan Dengan ${prefix}listmsg`)
                 }
                 break
            case 'getmsg': {
                 if (!text) throw `Example : ${prefix + command} file name\n\nLihat list pesan dengan ${prefix}listmsg`
                 let msgs = JSON.parse(fs.readFileSync('./database/data.json'))
                 if (!(text.toLowerCase() in msgs)) throw `'${text}' tidak terdaftar di list pesan`
                 xcaa.copyNForward(m.chat, msgs[text.toLowerCase()], true)
                 }
                 break
            case 'listmsg': {
                 let msgs = JSON.parse(fs.readFileSync('./database/data.json'))
	             let seplit = Object.entries(msgs).map(([nama, isi]) => { return { nama, ...isi } })
		         let teks = '「 LIST DATABASE 」\n\n'
		         for (let i of seplit) {
		         teks += `⬡ *Name :* ${i.nama}\n⬡ *Type :* ${Object.keys(i.message)[0]}\n────────────────────────\n\n`
	             }
	             m.reply(teks)
	             }
	             break
            case 'delmsg': case 'deletemsg': {
	             let msgs = JSON.parse(fs.readFileSync('./database/data.json'))
	             if (!(text.toLowerCase() in msgs)) return m.reply(`'${text}' tidak terdaftar didalam list pesan`)
		         delete msgs[text.toLowerCase()]
                 fs.writeFileSync('./database/data.json', JSON.stringify(msgs))
		         m.reply(`Berhasil menghapus '${text}' dari list pesan`)
                 }
	             break
//=====[ OWNER ]=====\\
            case 'public': {
                 if (!isCreator) throw mess.owner
                 xcaa.public = true
                 m.reply('Sukses')
                 }
                 break
            case 'self': {
                 if (!isCreator) throw mess.owner
                 xcaa.public = false
                 m.reply('Sukses')
                 }
                 break
            case 'join': {
                 if (!isCreator) throw mess.owner
                 if (!text) throw 'Masukkan Link Group!'
                 if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                 m.reply(mess.wait)
                 let result = args[0].split('https://chat.whatsapp.com/')[1]
                 await xcaa.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 }
                 break
            case 'leave': {
                 if (!isCreator) throw mess.owner
                 await xcaa.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 }
                 break
            case 'block': {
		         if (!isCreator) throw mess.owner
		         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
            case 'unblock': {
	        	 if (!isCreator) throw mess.owner
		         let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		         await xcaa.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	             }
	             break
            case 'q': case 'quoted': {
                 if (!isCreator) throw mess.owner
		         if (!m.quoted) return m.reply('Reply Pesannya!!')
		         let wokwol = await xcaa.serializeM(await m.getQuotedObj())
	       	     if (!wokwol.quoted) return m.reply('Pesan Yang anda reply tidak mengandung reply')
		         await wokwol.quoted.copyNForward(m.chat, true)
                 }
	             break
            case 'chat': {
                 if (!isCreator) throw mess.owner
                 if (!q) throw 'Option : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete'
                 if (args[0] === 'mute') {
                    xcaa.chatModify({ mute: 'Infinity' }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'unmute') {
                    xcaa.chatModify({ mute: null }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'archive') {
                    xcaa.chatModify({  archive: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'unarchive') {
                    xcaa.chatModify({ archive: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'read') {
                    xcaa.chatModify({ markRead: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'unread') {
                    xcaa.chatModify({ markRead: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 } else if (args[0] === 'delete') {
                    xcaa.chatModify({ clear: { message: { id: m.quoted.id, fromMe: true }} }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                 }
                 }
                 break
            case 'bcgc': case 'bcgroup': {
                 if (!isCreator) throw mess.owner
                 if (!text) throw `Text mana?\n\nExample : ${prefix + command} XieCaa`
                 let getGroups = await xcaa.groupFetchAllParticipating()
                 let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                 let anu = groups.map(v => v.id)
                 m.reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
                 for (let i of anu) {
                 await sleep(1500)
                 let btn = [{
                                urlButton: {
                                    displayText: 'Source Code',
                                    url: 'https://github.com/XC-XieCaa'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Owner',
                                    phoneNumber: '+62 838-1822-1226'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Status Bot',
                                    id: 'ping'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: 'owner'
                                }  
                            }, {
                                quickReplyButton: {
                                    displayText: 'Script',
                                    id: 'sc'
                                }
                            }]
                 fxsxgans = fs.readFileSync('./src/foto1.jpg')
                 let txt = `「 Broadcast Bot 」\n\n${text}`
                 xcaa.send5ButImg(i, txt, xcaa.user.name, fxsxgans, btn)
                 }
                 m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
                 }
                 break
            case 'bc': case 'broadcast': case 'bcall': {
                 if (!isCreator) throw mess.owner
                 if (!text) throw `Text mana?\n\nExample : ${prefix + command} XieCaa`
                 let anu = await store.chats.all().map(v => v.id)
                 m.reply(`Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${anu.length * 1.5} detik`)
		         for (let yoi of anu) {
		         await sleep(1500)
		         let btn = [{
                                urlButton: {
                                    displayText: 'Source Code',
                                    url: 'https://github.com/XC-XieCa'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Owner',
                                    phoneNumber: '+62 838-1822-1226'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Status Bot',
                                    id: 'ping'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: 'owner'
                                }  
                            }, {
                                quickReplyButton: {
                                    displayText: 'Script',
                                    id: 'sc'
                                }
                            }]
                 fxsxgans = fs.readFileSync('./src/foto1.jpg')
                 let txt = `「 Broadcast Bot 」\n\n${text}`
                 xcaa.send5ButImg(yoi, txt, xcaa.user.name, fxsxgans, btn)
                 }
                 m.reply('Sukses Broadcast')
                 }
                 break
            default:
                 if (budy.startsWith('=>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        m = String(err)
                        await m.reply(m)
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return m.reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }
			
		        if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
                    this.anonymous = this.anonymous ? this.anonymous : {}
                    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
                    if (room) {
                        if (/^.*(next|leave|start)/.test(m.text)) return
                        if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
                        let other = [room.a, room.b].find(user => user !== m.sender)
                        m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                            contextInfo: {
                                ...m.msg.contextInfo,
                                forwardingScore: 0,
                                isForwarded: true,
                                participant: other
                            }
                        } : {})
                    }
                    return !0
                }
			
		        if (isCmd && budy.toLowerCase() != undefined) {
		            if (m.chat.endsWith('broadcast')) return
		            if (m.isBaileys) return
		            let msgs = JSON.parse(fs.readFileSync('./database/data.json'))
		                if (!(budy.toLowerCase() in msgs)) return
		                xcaa.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
		            }
                }
        

    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
