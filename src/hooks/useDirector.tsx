import { useEffect, useRef, useState } from "react"
import { invoke } from '@tauri-apps/api/tauri'

const isObjEqual = (object1: any, object2: any) => {
  object1.date = ""
  object2.date = ""
  const keys1 = JSON.stringify(object1);
  const keys2 = JSON.stringify(object2);

  if (keys1 != keys2) {
    return false;
  }
  return true;
}
const handleSendRpc = async (appInfo: any) => {
  await invoke('update_activity', {
    activityPayload: {
      details: appInfo.details,
      state: appInfo.state,
      largeImage: appInfo.largeImageKey,
      largeText: appInfo.largeImageText,
      smallImage: appInfo.smallImageKey,
      smallText: appInfo.smallImageText,
      startTimestamp: appInfo.startTimestamp
    }
  })
  return true
}
const handleUpdateClientId = async (id: any) => {
  await invoke('update_activity_client_id', {
    clientId: id ? id : '1118418570855067688'
  })
  return true
}
const filter = async(processes: any) => {
  const uniqueNames: any = {"fancy-drpc": true};
  const filteredProcesses = processes.filter((process: any) => {
    const name = process.name.split('.')[0]
    if (!uniqueNames[name]){
      uniqueNames[name] = true;
      return true;
    }
    return false;
  });

  const prettified = filteredProcesses.map((item: {id: number, name: string, foreground: boolean}) => ({
    foreground: item.foreground,
    id: item.id,
    name: item.name.split('.')[0]
  }))
  return prettified
}
const checkApps = async(registeredApps: [string], processList: any) => {
  let newArr: any = []
  processList?.forEach((item: any) => {
    if(registeredApps.includes(item.name)){
      const appInfo = localStorage.getItem(item.name)
      const ifExists = appInfo ? JSON.parse(appInfo) : {}
      newArr.push({...ifExists, date: Math.floor(Date.now()), name: item.name})
    }
  })
  return newArr
}
const mostPreferredApp = async(activeApps: any) => {
  let preferredApp = {
    priority: 0,
    index: 0
  }
  activeApps.forEach((app: any, index: number) => {
    if(Number(app.priority) > Number(preferredApp.priority)){
      preferredApp = {priority: app.priority, index: index}
    }
  })
  return activeApps[preferredApp.index]
}

export const useDirector = (settings: {clientId: string, updateRate: string}, registeredApps: any) => {
  // STATES
  const selectedApp = useRef<any>()
  const prevID = useRef<string>()

  // INITIALIZERS
  useEffect(()=>{
    if(!settings || !registeredApps){return}
    setupRPC() 
  }, [settings, registeredApps])

  // PRIVATE FUNCTIONS
  const getProcesses = async() => await filter(await invoke('get_processes'))
  const getActiveApps = async(processList: any) => await checkApps(registeredApps, processList)

  const sendRPC = async(newPreffered: any) => {
    console.log("Sent new rpc!")
    if(newPreffered.clientId != prevID.current){
      console.log(newPreffered)
      console.log("NEW ID DETECTED")
      prevID.current = newPreffered.clientId
      await handleUpdateClientId(newPreffered?.clientId ? newPreffered.clientId : settings.clientId)
    }
    await handleSendRpc(newPreffered)
  }

  const setupRPC = async() => {
    newTimer()
    const processList = await getProcesses()
    const runningApps = await getActiveApps(processList)
    if(!runningApps){return}
    const newPreffered = await mostPreferredApp(runningApps)
    console.log(runningApps)
    if(!newPreffered){return}
    if(!selectedApp.current || selectedApp.current.name != newPreffered.name || !isObjEqual(newPreffered, selectedApp.current)){
      selectedApp.current = newPreffered
      sendRPC(newPreffered)
    }
  }

  const newTimer = () => (
    setTimeout(()=>setupRPC(), Number(settings.updateRate)*1000)
  )

  return {}
}