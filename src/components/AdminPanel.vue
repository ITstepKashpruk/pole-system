<template>
  <div>
    <h2>🛠 Admin Panel</h2>
    <table>
      <thead>
        <tr>
          <th>Телефон</th>
          <th>Імʼя</th>
          <th>Роль</th>
          <th>Активний</th>
          <th>Оновити</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.phone }}</td>
          <td>
            <input v-model="user.fullName" placeholder="Імʼя" />
          </td>
          <td>
            <select v-model="user.role">
              <option value="client">client</option>
              <option value="trainer">trainer</option>
              <option value="admin">admin</option>
            </select>
          </td>
          <td>
            <input type="checkbox" v-model="user.active" />
          </td>
          <td>
            <button @click="updateUser(user)">💾</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const users = ref([])

onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'users'))
  users.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})

const updateUser = async (user) => {
  const userRef = doc(db, 'users', user.id)
  await updateDoc(userRef, {
    fullName: user.fullName || '',
    role: user.role,
    active: user.active
  })
  alert(`Оновлено: ${user.phone}`)
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 8px 12px;
  border: 1px solid #ccc;
}
input, select {
  padding: 4px;
}
</style>
