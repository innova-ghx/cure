<script setup>
import { onMounted, ref, computed } from 'vue';
import useAuthStore from '@/stores/auth.js';
import ButtonComponent from '@/components/button.vue';
import TextFieldComponent from '@/components/text-field.vue';
import { useRouter } from 'vue-router';

defineOptions({ name: 'receptionist-dashboard-view' });

const authStore = useAuthStore();
const router = useRouter();

// Mock patient data
const patients = ref([
  { 
    id: 1, 
    name: 'John Doe', 
    dateOfBirth: '1990-05-15',
    phoneNumber: '+1234567890',
    status: 'Active',
    lastVisit: '2024-03-15',
  },
  { 
    id: 2, 
    name: 'Jane Wilson', 
    dateOfBirth: '1985-08-22',
    phoneNumber: '+1234567891',
    status: 'Inactive',
    lastVisit: '2024-02-28',
  },
]);

// New patient form
const newPatient = ref({
  name: '',
  dateOfBirth: '',
  phoneNumber: '',
});

const formErrors = ref({});
const showNewPatientForm = ref(false);

// Search functionality
const searchQuery = ref('');
const filteredPatients = computed(() => {
  return patients.value.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    patient.phoneNumber.includes(searchQuery.value)
  );
});

const handleLogout = async () => {
  try {
    const { redirect } = await authStore.logout();
    router.push(redirect);
  } catch (error) {
    console.error(error);
  }
};

const togglePatientStatus = (patientId) => {
  const patient = patients.value.find(p => p.id === patientId);
  if (patient) {
    patient.status = patient.status === 'Active' ? 'Inactive' : 'Active';
  }
};

const handleCreatePatient = () => {
  // Basic validation
  formErrors.value = {};
  if (!newPatient.value.name) formErrors.value.name = 'Name is required';
  if (!newPatient.value.dateOfBirth) formErrors.value.dateOfBirth = 'Date of birth is required';
  if (!newPatient.value.phoneNumber) formErrors.value.phoneNumber = 'Phone number is required';

  if (Object.keys(formErrors.value).length === 0) {
    patients.value.push({
      id: patients.value.length + 1,
      ...newPatient.value,
      status: 'Active',
      lastVisit: new Date().toISOString().split('T')[0],
    });
    
    // Reset form
    newPatient.value = {
      name: '',
      dateOfBirth: '',
      phoneNumber: '',
    };
    showNewPatientForm.value = false;
  }
};

// Authentication guard
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <div class="receptionist-dashboard">
    <header class="receptionist-dashboard__header">
      <div class="receptionist-dashboard__header__logo">
        <img src="/logo.svg" alt="InnovaCure" class="receptionist-dashboard__header__logo-image">
        <span class="receptionist-dashboard__header__logo-text">InnovaCure</span>
      </div>
      <div class="receptionist-dashboard__header__user">
        <span class="receptionist-dashboard__header__user-name">{{ authStore.user?.name }}</span>
        <button-component
          class="receptionist-dashboard__header__logout"
          @click="handleLogout"
        >
          Logout
        </button-component>
      </div>
    </header>

    <main class="receptionist-dashboard__main">
      <div class="receptionist-dashboard__controls">
        <h1 class="receptionist-dashboard__title">Patient Management</h1>
        <div class="receptionist-dashboard__actions">
          <text-field-component
            v-model="searchQuery"
            placeholder="Search patients..."
            class="receptionist-dashboard__search"
          />
          <button-component
            @click="showNewPatientForm = true"
          >
            New Patient
          </button-component>
        </div>
      </div>
      
      <!-- New Patient Form -->
      <div v-if="showNewPatientForm" class="receptionist-dashboard__new-patient">
        <h2 class="receptionist-dashboard__new-patient__title">Create New Patient</h2>
        <form @submit.prevent="handleCreatePatient" class="receptionist-dashboard__new-patient__form">
          <text-field-component
            v-model="newPatient.name"
            label="Full Name *"
            :error="formErrors.name"
          />
          <text-field-component
            v-model="newPatient.dateOfBirth"
            label="Date of Birth *"
            type="date"
            :error="formErrors.dateOfBirth"
          />
          <text-field-component
            v-model="newPatient.phoneNumber"
            label="Phone Number *"
            :error="formErrors.phoneNumber"
          />
          <div class="receptionist-dashboard__new-patient__actions">
            <button-component
              type="button"
              variant="tonal"
              @click="showNewPatientForm = false"
            >
              Cancel
            </button-component>
            <button-component type="submit">
              Create Patient
            </button-component>
          </div>
        </form>
      </div>

      <!-- Patient List -->
      <div class="receptionist-dashboard__patients">
        <div 
          v-for="patient in filteredPatients" 
          :key="patient.id"
          class="receptionist-dashboard__patient"
        >
          <div class="receptionist-dashboard__patient__info">
            <div class="receptionist-dashboard__patient__name">{{ patient.name }}</div>
            <div class="receptionist-dashboard__patient__details">
              <span>DOB: {{ patient.dateOfBirth }}</span>
              <span>Phone: {{ patient.phoneNumber }}</span>
              <span>Last Visit: {{ patient.lastVisit }}</span>
            </div>
          </div>
          <div class="receptionist-dashboard__patient__actions">
            <div 
              class="receptionist-dashboard__patient__status"
              :class="`receptionist-dashboard__patient__status--${patient.status.toLowerCase()}`"
            >
              {{ patient.status }}
            </div>
            <button-component
              size="small"
              :variant="patient.status === 'Active' ? 'tonal' : 'normal'"
              @click="togglePatientStatus(patient.id)"
            >
              {{ patient.status === 'Active' ? 'Deactivate' : 'Activate' }}
            </button-component>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.receptionist-dashboard {
  min-height: 100dvh;
  background-color: rgb(var(--color-background));
}

.receptionist-dashboard__header {
  background-color: rgb(var(--color-surface));
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.receptionist-dashboard__header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.receptionist-dashboard__header__logo-image {
  height: 2rem;
}

.receptionist-dashboard__header__logo-text {
  color: rgb(var(--color-primary));
  font-weight: bold;
  font-size: 1.25rem;
}

.receptionist-dashboard__header__user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.receptionist-dashboard__main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.receptionist-dashboard__title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 500;
}

.receptionist-dashboard__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.receptionist-dashboard__actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.receptionist-dashboard__search {
  width: 20rem;
}

.receptionist-dashboard__new-patient {
  background-color: rgb(var(--color-surface));
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.receptionist-dashboard__new-patient__title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.receptionist-dashboard__new-patient__form {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
}

.receptionist-dashboard__new-patient__actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.receptionist-dashboard__patients {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.receptionist-dashboard__patient {
  background-color: rgb(var(--color-surface));
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.receptionist-dashboard__patient__name {
  font-weight: 500;
  font-size: 1.125rem;
}

.receptionist-dashboard__patient__details {
  display: flex;
  gap: 1.5rem;
  color: rgb(var(--color-text-light));
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.receptionist-dashboard__patient__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.receptionist-dashboard__patient__status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.receptionist-dashboard__patient__status--active {
  background-color: rgba(var(--color-success), 0.1);
  color: rgb(var(--color-success));
}

.receptionist-dashboard__patient__status--inactive {
  background-color: rgba(var(--color-error), 0.1);
  color: rgb(var(--color-error));
}
</style> 