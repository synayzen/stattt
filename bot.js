const Discord = require ( "discord.js" );
const client = new Discord.Client ();
const logs = require ( "discord-logs" );
const ayarlar = require('./ayarlar.json');
const db = require ( "quick.db" );
var moment = require ( "moment" );
require ( "moment-duration-format" );
logs ( client );

let pub = "799724046895415347"; //  PUBLİC KATAGORİ ID
let kayıt = "799724043569856513"   // KAYIT KATAGORİ ID
let terapi = "799724046635237416"  // TERAPİ kATAGORİ ID
let sorun = "799724047747121173"   // SORUN ÇÖZME KATAGORİ ID
let vk = "837821980807397397"   // VAMPİR KÖYLÜ ATAGORİ ID
let dc = "800656089611108362"  // DOĞRULUK CESARETİL KATAGORİ ID
let game = "799724049193238588"  // OYUN KATAGORİ ID
let priv = "800472874690674738"    // PRİVATE KATAGORİ ID
let alone = "827479448068685864"   // ALONE kATAGORİ ID




//---------------------------------- BOTU SESLİ SOKMA ----------------------------------------\\


client.on("ready", () => {
  client.channels.cache.get("801730967910875188").join();
});

//---------------------------------- BOTU SESLİ SOKMA ----------------------------------------\\


//------------------------------ BOT YAYINDA OYNUYOR ------------------------------------\\

const Discord1 = require('discord.js');
const client2 = new Discord.Client();
client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
console.log("Streamstatus AKIYORR")

client.user.setActivity(`Synayzen lvar 💕 Assassin's Creed Family`, {
type: "STREAMING",
url: "https://www.twitch.tv/synayzen"})
    .then(presence => console.log(`HAZIR KAPTAN ASSASSİNS!  ${presence.game ? presence.game.none : '🛠'}`))
    .catch(console.error);
});


//------------------------------ BOT YAYINDA OYNUYOR ------------------------------------\\


//---------------------------------------------------------------------------------------\\

client.on ( "voiceChannelJoin" , ( member , channel ) => {
    if ( member.user.bot ) return
    const json = {
        "channel" : channel.id ,
        "start" : new Date ().getTime ()
    };
    db.set ( `1data:${ member.user.id }:${ channel.id }` , json );
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\


client.on ( "voiceChannelLeave" , ( member , channel ) => {
    if ( member.user.bot ) return
    if (!member.roles.cache.has ("800108734968758293")) return     // Yetkili Rol ID ( KOMUTU KULLANABİLCEK )
    let data = db.fetch ( `1data:${ member.user.id }:${ channel.id }` );
    if ( data ) {
        let total = db.fetch ( `1total:${ member.user.id }:${ channel.id }` ) || {
            "total" : 0
        };

        const json = {
            "channel" : data.channel ,
            "total" : Number ( total.total ) + (
                new Date ().getTime () - Number ( data.start )
            )
        };
        db.set ( `1total:${ member.user.id }:${ channel.id }` , json );
        db.delete ( `1data:${ member.user.id }:${ channel.id }` );
        db.add ( `2channel:${ channel.id }` , new Date ().getTime () - Number ( data.start ) )
        if ( channel.parentID === pub ) {
            db.add (
                `1public:${ member.user.id }` ,
                new Date ().getTime () - Number ( data.start )
            );
        }
        else if ( channel.parentID == priv ) {
            db.add ( `1private:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == alone ) {
            db.add ( `1alone:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == game ) {
            db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == vk ) {
            db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == dc ) {
            db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == kayıt ) {
            db.add ( `1kayıt:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == sorun ) {
            db.add ( `1mod:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( channel.parentID == terapi ) {
            db.add ( `1mod:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
    }
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on ( "voiceChannelSwitch" , ( member , oldChannel , newChannel ) => {
    if ( member.user.bot ) return
    let data = db.fetch ( `1data:${ member.user.id }:${ oldChannel.id }` );
    if ( data ) {
        let mainData = db.fetch ( `1total:${ member.user.id }:${ data.channel }` ) || {
            "total" : 0
        };
        const json = {
            "channel" : data.channel ,
            "total" :
                Number ( mainData.total ) + (
                new Date ().getTime () - Number ( data.start )
                                          )
        };
        db.set ( `1total:${ member.user.id }:${ oldChannel.id }` , json );
        db.add ( `2channel:${ oldChannel.id }` , new Date ().getTime () - Number ( data.start ) )
        const json2 = {
            "channel" : newChannel.id ,
            "start" : new Date ().getTime ()
        };
        db.set ( `1data:${ member.user.id }:${ newChannel.id }` , json2 );
        if ( oldChannel.parentID === pub ) {
            db.add (
                `1public:${ member.user.id }` ,
                new Date ().getTime () - Number ( data.start )
            );
        }
        else if ( oldChannel.parentID == priv ) {
            db.add ( `1private:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == alone ) {
            db.add ( `1alone:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == game ) {
            db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == vk ) {
            db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == dc ) {
            db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == kayıt ) {
            db.add ( `1kayıt:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == sorun ) {
            db.add ( `1mod:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( oldChannel.parentID == terapi ) {
            db.add ( `1mod:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
        }
    }
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\




//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on ( "message" , async message => {
    if ( message.author.bot ) return;
    let member = message.guild.members.cache.get ( message.author.id )
    var totall = (
                     await db.fetch (
                         `messageCount:${ message.author.id }:${ message.channel.id }`
                     )
                 ) || { "count" : 0 };
    db.set ( `messageCount:${ message.author.id }:${ message.channel.id }` , {
        "channel" : message.channel.id ,
        "count" : totall.count + 1
    } );
    db.add ( `totalMessage:${ message.author.id }` , 1 );
    db.add ( `3mesajKanal:${ message.channel.id }` , 1 )
    var st = message.member.voice;
    var data = await db.fetch ( `1data:${ message.author.id }:${ st.channelID }` );
    if ( data ) {
        var total = (
                        await db.fetch (
                            `1total:${ message.author.id }:${ data.channel }`
                        )
                    ) || { "total" : 0 };
        const json = {
            "channel" : data.channel ,
            "total" : Number ( total.total ) + (
                Date.now () - Number ( data.start )
            )
        };
        db.set ( `1total:${ message.author.id }:${ data.channel }` , json );
        db.delete ( `1data:${ message.author.id }:${ st.channelID }` );
        const json2 = {
            "channel" : st.channelID ,
            "start" : Date.now ()
        };
        db.set ( `1data:${ message.author.id }:${ st.channelID }` , json2 );
        db.add ( `2channel:${ st.channelID }` , new Date ().getTime () - Number ( data.start ) )
        if ( st.channel.parentID === pub ) {
            db.add (
                `1public:${ message.author.id }` ,
                new Date ().getTime () - Number ( data.start )
            );
        }
        else if ( st.channel.parentID == priv ) {
            db.add ( `1private:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == alone ) {
            db.add ( `1alone:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == game ) {
            db.add ( `1game:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == vk ) {
            db.add ( `1game:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == dc ) {
            db.add ( `1game:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == kayıt ) {
            db.add ( `1kayıt:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == sorun ) {
            db.add ( `1mod:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
        else if ( st.channel.parentID == terapi ) {
            db.add ( `1mod:${ message.author.id }` , new Date ().getTime () - Number ( data.start ) )
        }
    }
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\



//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on ( "message" , async msg => {
    if ( msg.content.startsWith ( ".stat" ) || msg.content.startsWith ( ".me" ) ) {
        if ( msg.author.bot ) return;

        var user = msg.mentions.users.first ();
        user = user ? user : msg.author;

        let member = msg.guild.members.cache.get ( user.id )
        let st = member.voice
        var data1 = await db.fetch ( `1data1:${ user.id }:${ st.channelID }` );
        if ( data1 ) {
            var total = (
                            await db.fetch (
                                `1total:${ user.id }:${ data1.channel }`
                            )
                        ) || { "total" : 0 };
            const json = {
                "channel" : data1.channel ,
                "total" : Number ( total.total ) + (
                    Date.now () - Number ( data1.start )
                )
            };
            db.set ( `1total:${ user.id }:${ data1.channel }` , json );
            db.delete ( `1data:${ user.id }:${ st.channelID }` );
            const json2 = {
                "channel" : st.channelID ,
                "start" : Date.now ()
            };
            db.set ( `1data:${ user.id }:${ st.channelID }` , json2 );
            if ( st.channel.parentID === pub ) {
                db.add (
                    `1public:${ user.id }` ,
                    new Date ().getTime () - Number ( data1.start )
                );
            }
            else if ( st.channel.parentID == priv ) {
                db.add ( `1private:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == alone ) {
                db.add ( `1alone:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == game ) {
                db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == vk ) {
                db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == dc ) {
                db.add ( `1game:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == kayıt ) {
                db.add ( `1kayıt:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == sorun ) {
                db.add ( `1mod:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
            else if ( st.channel.parentID == terapi ) {
                db.add ( `1mod:${ member.user.id }` , new Date ().getTime () - Number ( data.start ) )
            }
        }
        let data = await db
            .all ()
            .filter ( x => x.ID.startsWith ( `1total:${ user.id }` ) )
            .sort ( function ( a , b ) {
                return JSON.parse ( b.data ).total - JSON.parse ( a.data ).total;
            } );

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

        let ses = await db.fetch ( `1public:${ user.id }` ) || 0
        let priv1 = await db.fetch ( `1private:${ user.id }` ) || 0
        let kayıt1 = await db.fetch ( `1kayıt:${ user.id }` ) || 0
        let game1 = await db.fetch ( `1game:${ user.id }` ) || 0
        let alone1 = await db.fetch ( `1alone:${ user.id }` ) || 0
        let mod1 = await db.fetch ( `1mod:${ user.id }` ) || 0
        let format = moment.duration ( ses ).format ( "h [saat] m [dakika.]" );
        let toplamPriv = moment.duration ( priv1 ).format ( "h [saat] m [dakika.]" );
        let toplamKayıt = moment.duration ( kayıt1 ).format ( "h [saat] m [dakika.]" );
        let toplamGame = moment.duration ( game1 ).format ( "h [saat] m [dakika.]" );
        let toplamAlone = moment.duration ( alone1 ).format ( "h [saat] m [dakika.]" );
        let toplamMod = moment.duration ( mod1 ).format ( "h [saat] m [dakika.]" );
        let sayi = data.length;
        var isimler = [];
        data.length = 10;
        var i = 0;
        let arr = [];
        for ( i in data ) {
            arr.push ( Number ( JSON.parse ( data[ i ].data ).total ) );
            isimler.push (
                `<#${ JSON.parse ( data[ i ].data ).channel }>: \`${ moment
                    .duration ( Number ( JSON.parse ( data[ i ].data ).total ) )
                    .format ( "h [saat] m [dakika.]" ) }\``
            );
        }
        var textDatas = db
            .all ()
            .filter ( x => x.ID.startsWith ( `messageCount:${ user.id }` ) )
            .sort ( function ( a , b ) {
                return JSON.parse ( b.data ).count - JSON.parse ( a.data ).count;
            } );
        var textTotal = (
                            await db.fetch ( `totalMessage:${ user.id }` )
                        ) || 0;
        textDatas.length = 5;
        var liste = "";
        var i = 0;
        for ( i in textDatas ) {
            liste += `<#${ JSON.parse ( textDatas[ i ].data ).channel }>: \`${
                JSON.parse ( textDatas[ i ].data ).count
            }\` \n`;
        }

        let data2 = await db
            .all ()
            .filter ( x => x.ID.startsWith ( `1total:${ user.id }` ) )
            .sort ( function ( a , b ) {
                return JSON.parse ( b.data ).total - JSON.parse ( a.data ).total;
            } );
        let uw = 0
        let array = []
        for ( uw in data2 ) {
            array.push ( Number ( JSON.parse ( data2[ uw ].data ).total ) );
        }
        let toplam = moment
            .duration ( array.reduce ( ( a , b ) => a + b , 0 ) )
            .format ( "h [saat] m [dakika.]" );
        let üye = msg.guild.members.cache.get ( user.id );

        const embed = new Discord.MessageEmbed ()

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

            .setAuthor ( user.tag , user.avatarURL ( { "dynamic" : true } ) )
            .setFooter(' ⚔  𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲 ❤️ Stat')
            .setColor ( "YELLOW" )
            .setThumbnail ( user.avatarURL ( { "dynamic" : true } ) )
            .setColor ( "YELLOW" ).setDescription ( `${ üye } (${
                üye.roles.highest
            }) Kişisinin Sunucudaki istatistikleri
───────────────
**➥ Sesli Sohbet Bilgileri:**
• Toplam: \`${ toplam }\`
• Public Odalar: \`${ format }\`
• Kayıt Odaları: \`${ toplamKayıt }\`
• Sorun Çözme & Terapi: \`${ toplamMod }\`
• Secret Odalar: \`${ toplamPriv }\`
• Alone Odalar: \`${ toplamAlone }\`
• Oyun & Eğlence Odaları: \`${ toplamGame }\`
───────────────
**➥ Kanal Bilgileri:** (\`Toplam ${ sayi } kanalda durmuş\`)
${ isimler.join ( "\n" ) }
───────────────
**➥ Mesaj Bilgileri:** (\`Toplam: ${ textTotal }\`)
${ liste }
    ` );
        msg.channel.send ( embed );
    }
} );

//-----------------------------------------------------------------------------------------------------------------------------------\\



//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on ( "message" , async msj => {
    let member = msj.guild.members.cache.get ( msj.author.id )
    if ( ! msj.content.startsWith ( ".top" ) ) {
        return;
    }
    let data = await db
        .all ()
        .filter ( x => x.ID.startsWith ( `1total` ) )
        .sort ( function ( a , b ) {
            return JSON.parse ( b.data ).total - JSON.parse ( a.data ).total;
        } );
    var liste = []
    var i = 0;
    for ( i in data ) {
        liste.push ( {
                         "kullanıcı" : data[ i ].ID.split ( ":" )[ 1 ] ,
                         "sure" : JSON.parse ( data[ i ].data ).total
                     } )

    }
    var result = []
    liste.reduce ( function ( res , value ) {
        if ( ! res[ value.kullanıcı ] ) {
            res[ value.kullanıcı ] = { "kullanıcı" : value.kullanıcı , "sure" : 0 };
            result.push ( res[ value.kullanıcı ] )
        }
        res[ value.kullanıcı ].sure += value.sure;
        return res;
    } , {} );
    db.set ( `%tamam${ msj.guild.id }` , result )
    let sos = await db.fetch ( `%tamam${ msj.guild.id }` )
    let uu = sos.sort ( function ( a , b ) {
        return b.sure - a.sure
    } )
    let tiki = 0
    uu.length = 5
    let arrays = []
    let num = 1
    for ( tiki in uu ) {
        arrays.push ( `\`${ num++ }.\` - <@${ uu[ tiki ].kullanıcı }> - \`${ moment.duration ( Number ( uu[ tiki ].sure ) ).format ( "h [saat] m [dakika]" ) }\`` )
    }
    let mesaj = db.all ().filter ( x => x.ID.startsWith ( `totalMessage` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    mesaj.length = 5
    let bak = 0
    let sayı = 1
    let aruuy = []
    for ( bak in mesaj ) {
        aruuy.push ( `\`${ sayı++ }.\` - <@${ mesaj[ bak ].ID.split ( ":" )[ 1 ] }> - \`${ mesaj[ bak ].data }\`` )
    }
    let kanal = db.all ().filter ( x => x.ID.startsWith ( `2channel` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    let cems = 0
    kanal.length = 5
    let nams = 1
    let arooy = []
    for ( cems in kanal ) {
        arooy.push ( `\`${ nams++ }.\` - <#${ kanal[ cems ].ID.split ( ":" )[ 1 ] }> - \`${ moment.duration ( Number ( kanal[ cems ].data ) ).format ( "h [saat] m [dakika]" ) }\` ` )
    }
    let mesajKanal = db.all ().filter ( x => x.ID.startsWith ( `3mesajKanal` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    mesajKanal.length = 5
    let toki = 0
    let number = 1
    let arvy = []
    for ( toki in mesajKanal ) {
        arvy.push ( `\`${ number++ }.\` - <#${ mesajKanal[ toki ].ID.split ( ":" )[ 1 ] }> - \`${ mesajKanal[ toki ].data }\`` )
    }
    let publics = db.all ().filter ( x => x.ID.startsWith ( `1public` ) ).sort ( function ( a , b ) {
        return b.data - a.data
    } )
    publics.length = 5
    let tokix = 0
    let numberx = 1
    let arvey = []
    for ( tokix in publics ) {
        arvey.push ( `\`${ numberx++ }.\` - <@${ publics[ tokix ].ID.split ( ":" )[ 1 ] }> - \`${ moment.duration ( Number ( publics[ tokix ].data ) ).format ( "h [saat] m [dakika]" ) }\`` )
    }

//-----------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------------------------------------------------------------------------------------------------------------------\\

    const toplam = new Discord.MessageEmbed ()
        .setAuthor ( msj.guild.name , "" )
        .setThumbnail ( "" )
        .setColor ( "YELLOW" )
        .setFooter ( msj.author.tag , msj.author.avatarURL ( { "dynamic" : true } ) )
        .setDescription ( `
        
⚔ 𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲  • Sunucunun Ses Bilgisi

__Top 5 En Aktif Ses Kanalı__
${ arooy.join ( "\n" ) }

__Top 5 En Aktif Mesaj Kanalı__
${ arvy.join ( "\n" ) }

__Top 5 Seste En Aktif Üyeler__
${ arrays.join ( "\n" ) }

__ Top 5 Mesaj Kanallarında En Aktif Üyeler__
${ aruuy.join ( "\n" ) }

__Top 5 Public Kanallarda En Aktif Üyeler__
${ arvey.join ( "\n" ) }

         ` )
    msj.channel.send ( toplam )
    console.log ( publics )
} )

//-----------------------------------------------------------------------------------------------------------------------------------\\





//-------------------------------------- TOKEN KANALI -----------------------------\\

                       client.login(process.env.TOKEN);

//-------------------------------------- TOKEN KANALI -----------------------------\\
