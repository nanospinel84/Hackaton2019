<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="btn-wrapper text-center">
                        <h1>Registro</h1>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="usuario"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.USER_NAME">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.EMAIL">
                        </base-input>

                         <base-input class="input-group-alternative"
                                    placeholder="Empresa"
                                    type="Text"
                                    addon-left-icon="ni ni-building"
                                    v-model="model.COMPANY">
                        </base-input>
                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.PASSWORD">
                        </base-input>
                        <div class="text-center">
                            <base-button @click="register" type="primary" class="my-4">Crear Cuenta</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <!--
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                -->
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios';
  export default {
    name: 'register',
    data() {
      return {
        model: {
          USER_NAME: '',
          EMAIL: '',
          COMPANY: '',
          PASSWORD:''
        }
      }
    },
     methods: {
    register: function() {  
        axios
            .post('http://localhost:3000/user',
                this.model
            )
            .then(response => {
                console.log(response)
                if(response.data.status == '200'){
                    alert("Registro exitoso")
                    this.$router.push('Login')
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
