<template>
    <div>
    <form class="ui form">
        <div class="field">
            <label>Email</label>
            <input type="text" name="email" v-model="user.email" placeholder="Email">
        </div>
        <div class="field">
            <label>Password</label>
            <input type="text" name="password" v-model="user.password" placeholder="Password">
        </div>
        <div class="field">
            <div class="ui checkbox">
                <input type="checkbox" :value="isKeepLogin" tabindex="0" class="hidden">
                <label>Keep me logged in</label>
            </div>
        </div>
        <button class="ui button" type="submit" @click="login">Login</button>
        <button class="ui button" type="submit">Sign in</button>
    </form>
    </div>
</template>
<script>
  export default {
    name: 'loginPage',
    data () {
      return {
        msg: 'login',
        user: {email: '', password: ''},
        isKeepLogin: false,
        validateRules: {
          fields: {
            email: {
              identifier: 'email',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your email!'
              }]
            },
            password: {
              identifier: 'password',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your password!'
              }]
            }
          }
        }
      }
    },
    computed: {
      getUser () {
        return this.user
      }
    },
    methods: {
      login (e) {
        e.preventDefault()
        console.log(this.getUser)
        alert('login')
      },
      validateUser () {
        alert('validate User!')
      },
      validateEmail () {
        alert('validate email')
      },
      requestLogin () {
        alert('request login')
      },
      showLoginStatus () {
        alert('show login status')
      }
    }
  }
</script>
