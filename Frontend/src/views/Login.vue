<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Login</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="usuario"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.USER_NAME">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.PASSWORD">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Recordarme</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button @click="login" type="primary" class="my-4">Login</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Olvido Contraseña?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Registrate</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios';
  export default {
    name: 'login',
    data() {
      return {
        model: {
          USER_NAME: '',
          PASSWORD: ''
        }
      }
    },
         methods: {
    login: function() {
        axios
            .post('http://localhost:3000/login',
                this.model
            )
            .then(response => {
                console.log(response)
                if(response.data.status == 200){
                    this.$router.push('Dashboard')
                }else{
                    alert("no se pudo realizar el registro")
                }
            })
            .catch(error => {
            alert(error)
            })
    }
  }
  }
</script>
<style>
</style>
