import log from 'loglevel';

log.setLevel('trace')

export default defineNuxtPlugin(() => {

  return {
    provide: {
      log,
    }
  }
});