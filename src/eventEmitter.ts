/* This object works similarly to Redux or rxjs subject observer
  - Events: store concurrent events
  - Dispatch: use in remote component, fire an action (Event) 
  - Subscribe: push an event to events array, use this on component that needs to listen to other components
  - Unsubscribe: remove listener (put this in useEffect cleanup)
*/

export enum Events {
  OPEN_CREATE_POST_FORM = 'OPEN_CREATE_POST_FORM',
  OPEN_CREATE_COMMUNITY_DRAWER = 'OPEN_CREATE_COMMUNITY_DRAWER',
  OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL',
  OPEN_PREMIUM_DRAWER = 'OPEN_PREMIUM_DRAWER'
}

type EventCallback = (data: unknown) => void

export const eventEmitter = {
  events: {} as Record<string, EventCallback[]>,

  dispatch(event: Events, data: unknown) {
    if (this.events[event]) this.events[event].forEach((callback) => callback(data))
  },

  subscribe(event: Events, callback: (_: unknown) => void) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(callback)
  },

  unsubscribe(event: Events) {
    if (this.events[event]) delete this.events[event]
  }
}
