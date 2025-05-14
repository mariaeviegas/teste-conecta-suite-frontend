<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const logout = () => {
    Swal.fire({
        title: "Confirmar saída",
        text: "Deseja sair de sua conta?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sair",
        customClass: {
            confirmButton: 'swal-custom-confirm',
            cancelButton: 'swal-custom-cancel'
        }
    }).then((result) => {

        if (result.value == true) {
            localStorage.clear();
            router.push('/')
        }
    });
}
</script>

<template>
    <v-navigation-drawer color="deep-blue" stateless class="pt-4 pb-4">
        <v-container class="d-flex flex-column fill-height justify-space-between pa-0">

            <div class="d-flex flex-row pa-4">
                <h1 style="color: white; font-size: 28px; font-weight: bold;">co</h1>
                <h1 style="color: #EC7616; font-size: 28px; font-weight: bold;">nexus</h1>
            </div>

            <v-list>
                <v-btn prepend-icon="mdi mdi-account-circle" color="blue" elevation="0">
                    Meu plano
                </v-btn>
            </v-list>

            <div class="pa-2" style="width: 80%;">
                <v-btn block color="orange" @click="logout()">
                    Sair
                </v-btn>
            </div>
        </v-container>
    </v-navigation-drawer>
</template>