<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from '../plugins/axios.js';
import Swal from "sweetalert2";

const router = useRouter();

const name = ref('')
const email = ref('')
const password = ref('')
const visible = ref(false)

const register = () => {
   
    const data = {
      name: name.value,
      email: email.value,
      password: password.value
    };

    api.post(`/user`, data)
    .then(() => {
      Swal.fire({
        title: "Empresa cadastrada",
        text: "Sua empresa foi cadastrada com sucesso! Realize o login.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: 'swal-custom-confirm'
        }
      }).then(() => {
        router.push('/');
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Ocorreu algum erro",
        text: "Empresa não cadastrada. Tente novamente!",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: 'swal-custom-confirm'
        }
      }).then(() => {
        location.reload();
      });
    })
}
</script>
<template>
    <div class="register">
        <div class="register__form">
            <div>
                <v-card class="pl-12 pr-12 pt-8 pb-8" elevation="8" width="600" rounded="lg">
                    <div class="mb-8 text-center text-h6 text-uppercase font-weight-bold text-color-custom">Cadastro
                    </div>
                    <div class="text-subtitle-2 text-medium-emphasis">Empresa</div>
                    <v-text-field density="comfortable" placeholder="Insira o nome da empresa"
                        prepend-inner-icon="mdi mdi-domain" variant="outlined" v-model="name"></v-text-field>

                    <div class="text-subtitle-2 text-medium-emphasis">Conta</div>
                    <v-text-field density="comfortable" placeholder="Insira seu e-mail"
                        prepend-inner-icon="mdi-email-outline" variant="outlined" v-model="email"></v-text-field>

                    <div class="text-subtitle-2 text-medium-emphasis d-flex align-center justify-space-between">Senha</div>
                    <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="comfortable" placeholder="Insira sua senha"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="visible = !visible" v-model="password"></v-text-field>

                    <v-btn class="mb-8" color="orange" size="large" block @click="register()">
                        Cadastrar
                    </v-btn>

                    <v-card-text class="text-center">
                        <a class="text-blue text-decoration-none" rel="noopener noreferrer" @click="router.push('/')">
                            Entrar <v-icon icon="mdi-chevron-right"></v-icon>
                        </a>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        <div class="register__description">

            <div class="register__description__container">
                <div class="register__description__text">
                    <h1 class="text-h5 font-weight-bold mb-2">Bem-Vindo</h1>
                    <p class="text-subtitle-2">
                        Realize cadastro para gerenciar seu plano e aproveitar a solução mais eficiente para a sua
                        empresa.
                    </p>
                </div>
                <div class="register__description__logo">
                    <div class="d-flex flex-row pa-4">
                        <h1 style="color: white; font-size: 28px; font-weight: bold;">co</h1>
                        <h1 style="color: #EC7616; font-size: 28px; font-weight: bold;">nexus</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.register {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}

.register__description {
    width: 40%;
    background: linear-gradient(to bottom, #0D2845, #123C76);
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 16px;
}

.register__description__container {
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.register__description__text {
    width: 80%;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

}

.register__form {
    width: 60%;
    background-color: #F6F3EC;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.text-color-custom {
    color: #0D2845;
}
</style>