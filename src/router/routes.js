import LoginView from '@/views/login.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    redirect: {name: 'login'},
  },
];
