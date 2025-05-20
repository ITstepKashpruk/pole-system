<template>
  <div>
    <h2>Login by Phone</h2>
    <input v-model="phone" placeholder="+380931112233" />
    <button @click="sendCode">Send Code</button>

    <div v-if="confirm">
      <input v-model="code" placeholder="Enter code" />
      <button @click="verifyCode">Verify</button>
    </div>

    <div id="recaptcha-container"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { app } from '../firebaseConfig' // 👈 Ми імпортуємо саме app
const auth = getAuth(app) // 👈 Створюємо тут (не через окремий імпорт)

const phone = ref('')
const code = ref('')
const confirm = ref(null)

const sendCode = async () => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved:', response)
        }
      }, auth)
      await window.recaptchaVerifier.render()
    }

    const result = await signInWithPhoneNumber(auth, phone.value, window.recaptchaVerifier)
    confirm.value = result
    alert('Код надіслано')
  } catch (err) {
    console.error('sendCode помилка:', err)
    alert('Помилка: ' + err.message)
  }
}

const verifyCode = async () => {
  try {
    const userCred = await confirm.value.confirm(code.value)
    alert('Вхід успішний: ' + userCred.user.phoneNumber)
  } catch (err) {
    alert('Невірний код')
  }
}
</script>
