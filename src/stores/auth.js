import { defineStore } from 'pinia';
import { timeout } from '@/utilities/timer';

export default defineStore('auth', () => {
  async function login(form, signal = null) {
    await timeout(3500);
  }

  return {login};
});
