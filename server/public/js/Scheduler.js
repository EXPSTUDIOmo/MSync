/*
   SWR EXPERIMENTALSTUDIO 03/2023
   Maurice Oeser

   Scheduler - handles high precision firing of events by spinning before an event.
   setTimeout / setInterval are too inaccurate
*/

const spinTime = 25;

let isRunning = false;
let events = [];
let SCHEDULER_TIMEOUT;
let nextEvent;
let nextEventTime;
let elapsedTime = 0;
let lastSyncTime = 0;
let START_TIME = 0;
let eventIndex = 0;

function start()
{
    if(events.length > 0 && !isRunning)
    {
        eventIndex = 0;
        isRunning = true;
        scheduleNextEvent();
    }       
}

function stop()
{
    clearTimeout(SCHEDULER_TIMEOUT);
    isRunning = false;
}

function scheduleNextEvent()
{
    if(!isRunning || eventIndex >= events.length)
    {
        postMessage({id: "done"});
        return;
    }
      

    nextEvent = events[eventIndex];
    eventIndex++;

    if(nextEvent == undefined)
    {
        isRunning = false;
        postMessage({id: "done"});
        return;
    }


    let now = Date.now();
    let timeSinceLastSync = now - lastSyncTime;
    let timeUntilEvent = Math.round(nextEvent.time - (elapsedTime + timeSinceLastSync));
    
    nextEventTime = now + timeUntilEvent;


    if(timeUntilEvent < 0)
    {
        scheduleNextEvent();
    }

    else if(timeUntilEvent <= spinTime)
    {
        waitForEvent();
    }

    else
    {
        SCHEDULER_TIMEOUT = setTimeout(waitForEvent, timeUntilEvent - spinTime);
    }

}

function waitForEvent()
{
    while(Date.now() < nextEventTime)
    {
        // we wait
    }

    triggerEvent();
}



function triggerEvent()
{
    postMessage({id: 'event', data: nextEvent.data});
   
    scheduleNextEvent();
}


function sync(serverTime, atTimePoint)
{
    elapsedTime = serverTime;
    lastSyncTime = atTimePoint;

    if(elapsedTime > 0)
        start();
    else
        stop();
}




onmessage = (event) => {

    switch(event.data.id)
    {
        case 'sync': 
            sync(event.data.elapsedTime, event.data.timePoint);
            break;
        
        case 'starttime':
            START_TIME = event.data.data; 
            break;

        case 'stop':
            clearTimeout(SCHEDULER_TIMEOUT);
            isRunning = false;
            break;

        case 'addevent':
            events.push(event.data.event);
            break;

        default:
            break;
    }
  };
