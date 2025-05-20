<script setup>
import { ref } from 'vue'
import { app } from '../firebaseConfig'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const phone = ref('')
const code = ref('')
const confirmResult = ref(null)
const auth = getAuth(app)

const sendCode = async () => {
  try {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved', response)
          },
        },
        auth
      )

      await window.recaptchaVerifier.render()
    }

    const result = await signInWithPhoneNumber(auth, phone.value, window.recaptchaVerifier)
    confirmResult.value = result
    alert('Код надіслано!')
  } catch (error) {
    console.error('sendCode помилка:', error)
    alert('Помилка: ' + error.message)
  }
}
</script>

<template>
  <div>
    <h2>Login by Phone</h2>
    <input v-model="phone" placeholder="+380..." />
    <button @click="sendCode">Send Code</button>
    <div id="recaptcha-container"></div>
  </div>
</template>
