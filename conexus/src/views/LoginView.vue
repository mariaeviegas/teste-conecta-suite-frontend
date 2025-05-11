<script setup></script>

<template>
    <div class="login">
        <div class="login__description">
            <div>
                <v-btn density="comfortable" icon="mdi-arrow-left"></v-btn>
            </div>
            <div class="login__description__container">
                <div class="login__description__text">
                    <h1 class="text-h5 font-weight-bold mb-2">Bem-Vindo</h1>
                    <p class="text-subtitle-2">
                        Realize login para gerenciar seu plano e aproveitar a solução mais eficiente para a sua
                        empresa.
                    </p>
                </div>
                <div class="login__description__logo">
                    <div class="d-flex flex-row pa-4">
                        <h1 style="color: white; font-size: 28px; font-weight: bold;">co</h1>
                        <h1 style="color: #EC7616; font-size: 28px; font-weight: bold;">nexus</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="login__form">
            <div>
                <v-card class="mx-auto pa-12 pb-8" elevation="8" width="600" rounded="lg">
                    <div class="mb-8 text-center text-h6 text-uppercase font-weight-bold text-color-custom">Login</div>
                    <div class="text-subtitle-2 text-medium-emphasis">Conta</div>

                    <v-text-field density="comfortable" placeholder="Insira seu e-mail" prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

                    <div class="text-subtitle-2 text-medium-emphasis d-flex align-center justify-space-between">Senha</div>

                    <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'" density="comfortable" placeholder="Insira sua senha"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="visible = !visible"
                    >
                    
                    </v-text-field>

                    <v-btn class="mb-8" color="orange" size="large" block>
                        Entrar
                    </v-btn>

                    <v-card-text class="text-center">
                        <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                            Cadastre-se <v-icon icon="mdi-chevron-right"></v-icon>
                        </a>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<style>
.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}

.login__description {
    width: 40%;
    background: linear-gradient(to bottom, #0D2845, #123C76);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
}

.login__description__container {
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.login__description__text {
    width: 80%;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

}

.login__form {
    width: 60%;
    background-color: #F6F3EC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.text-color-custom {
    color: #0D2845;
}
</style>