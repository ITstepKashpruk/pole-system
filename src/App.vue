<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './components/Login.vue'
import { ref, onMounted } from 'vue'
import { db } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuth } from './composables/useAuth'

import { useAuthStore } from './stores/authStore'
import AdminPanel from './components/AdminPanel.vue'
import TrainerPanel from './components/TrainerPanel.vue'
import ClientPanel from './components/ClientPanel.vue'

const authStore = useAuthStore()

const { watchAuth } = useAuth()
watchAuth()

const items = ref([])

onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'test'))
  items.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})
</script>


<template>
  <div>
    <h1>Pole System</h1>
    <Login v-if="!authStore.user" />
    <p v-if="!authStore.role">Вхід...</p>
<p v-if="authStore.user">Телефон: {{ authStore.user.phoneNumber }}</p>
<p v-if="authStore.role">Роль: {{ authStore.role }}</p>
    <AdminPanel v-else-if="authStore.role === 'admin'" />
    <TrainerPanel v-else-if="authStore.role === 'trainer'" />
    <ClientPanel v-else />
  </div>
</template>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
