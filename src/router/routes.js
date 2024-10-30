import LoginView from '@/views/login.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('@/views/password-reset.vue'),
  },
  {
    path: '/',
    redirect: {name: 'login'},
  },
];
