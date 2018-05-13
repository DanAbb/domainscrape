<template>
  <div class="login-wrapper">
    <div class="input-container">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email">
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password">
    </div>
    <div class="input-container">
      <input type="submit" value="Submit" @click="submit()">
    </div>
    <div class="sign-up">
      <p>No Account? <a href="/signup">signup here</a></p>
    </div>
  </div>
</template>

<script>
import { api } from 'services/api'
import CookieStorage from 'services/cookie.storage.js'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      const data = {
        email: this.email,
        password: this.password
      }

      try {
        const login = await api('post', 'Login/ManualLogin', data)

        if (!login) {
          return
        }

        CookieStorage.setUserId(login.data.user._id)
        CookieStorage.setAuthToken(login.data.authToken)
        CookieStorage.setRefreshToken(login.data.refreshToken)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  .login-wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
  }

  .input-container {
    margin: 10px;
    width: 340px;

    input {
      width: 100%;
      height: 50px;
      font-size: 20px;
    }
  }

  .sign-up {
    width: 340px;
    text-align: right;
  }
</style>
