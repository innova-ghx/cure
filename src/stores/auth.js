import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  async function login(credentials, signal) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock credentials check
    if (credentials.username === 'receptionist' && credentials.password === 'password123') {
      user.value = {
        id: 1,
        username: credentials.username,
        role: 'receptionist',
        name: 'Jane Smith'
      };
      isAuthenticated.value = true;
      
      return { redirect: '/receptionist-dashboard' };
    }
    
    throw new Error('Invalid credentials. Try username: receptionist, password: password123');
  }

  async function logout() {
    await new Promise(resolve => setTimeout(resolve, 500));
    user.value = null;
    isAuthenticated.value = false;
    return { redirect: '/login' };
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
});

export default useAuthStore;
