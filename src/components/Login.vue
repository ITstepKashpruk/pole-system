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
import { auth } from '../firebaseConfig'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const phone = ref('')
const code = ref('')
const confirm = ref(null)

let recaptchaVerifier = null

const sendCode = async () => {
  try {
    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA resolved')
          }
        },
        auth
      )
      await recaptchaVerifier.render()
    }

    const result = await signInWithPhoneNumber(auth, phone.value, recaptchaVerifier)
    confirm.value = result
    alert('Код надіслано (або готовий у тестовому режимі)')
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
    console.error(err)
    alert('Невірний код')
  }
}
</script>
