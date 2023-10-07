// import { useRef } from "react"
// const DiscordRPC = require('discord-rpc')

// export const useDiscord = () => {
//   console.log("CALLED")
//   const RPC = new DiscordRPC.Client({transport: 'ipc'})
//   const init = useRef({ClientBotID: ""})

//   const initialize = (clientId: string) => {
//     console.log("Init called")
//     init.current.ClientBotID = clientId
//     DiscordRPC.register(clientId)
//   }

//   const setAcivity = () => {
//     console.log("Set activity called")
//     if(!RPC){return}
//     RPC.setActivity({
//       details: "details",
//       state: "state",
//       largeImageKey: 'discord',
//       largeImageText: 'discord',
//       smallImageKey: 'discord',
//       smallImageText: 'discord',
//       instance: false
//     })
//   }

//   const launch = () => {
//     console.log("Launch called")
//     RPC.login(init.current.ClientBotID).catch((err: any) => console.log(err))
//   }

//   return {initialize, setAcivity, launch}
// }


// export const Discord = () => {
//     const clientId = process.env.CLIENT_ID
//     const DiscordRPC = require('discord-rpc')
//     const RPC = new DiscordRPC.Client({transport: 'ipc'})
//     console.log("CALLED")
//     DiscordRPC.register(clientId)
  
//     async function setActivity() {
//       if(!RPC){return}
//       RPC.setActivity({
//         details: 'details',
//         state: 'state',
//         // startTimestamp: Date.now()
//         largeImageKey: 'discord',
//         largeImageText: 'discord',
//         smallImageKey: 'discord',
//         smallImageText: 'discord',
//         instance: false,
//         // buttons: [
//         //   {
//         //     label: '',
//         //     url: ''
//         //   }
//         // ]
//       })
//     }
  
//     RPC.on('ready', async() => {
//       setActivity()
//       setInterval(()=>{
//         setActivity()
//       }, 20000)
//     })
    
//     RPC.login({clientId}).catch((err: any) => console.log(err))
// }