<script setup>
import Navbar from '../components/Navbar.vue'
import PlanDetailsCard from '../components/PlanDetailsCard.vue';
import { ref, computed, onMounted } from 'vue'
import api from '../plugins/axios.js';

const modo = ref('mensal')
const plans = ref([])
const userData = JSON.parse(localStorage.getItem('user')) || {}
const actualPlanName = userData.actualPlan
const hasSetup = userData.hasSetup


const getPlans = () => {
    api.get(`/plans`)
    .then((response) => {
        plans.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })
}

onMounted(() => {
    getPlans()
})

const planosComPreco = computed(() => {
    return plans.value.map(p => ({
        planName: p.label,
        planDescription: p.description,
        planPrice: modo.value === 'mensal' ? p.monthlyPrice : p.yearlyPrice,
        type: modo.value,
        setupPrice: p.setupPrice,
        isActualPlan: p.label === actualPlanName,
        hasSetup: hasSetup
    }))
})
</script>

<template>
    <div class="planManagementContainer">
        <div class="planManagementContainer__navbar">
            <Navbar />
        </div>
        <div class="planManagementContainer__content">
            <v-card color="deep-blue" class="rounded-xl pa-8" style="width: 95%;">
                <v-card-item>
                    <div>
                        <div class="text-h6 text-center font-weight-bold">
                            Gerencie sua assinatura com flexibilidade.
                        </div>
                        <div class="mt-2 text-center font-weight-regular">
                            Faça upgrade ou downgrade de plano quando precisar, de forma simples & rápida.
                        </div>
                    </div>
                </v-card-item>

                <v-card-actions class="justify-center mt-6">
                    <v-btn variant="outlined">
                        Saiba mais
                    </v-btn>
                </v-card-actions>
            </v-card>

            <div class="d-flex justify-space-between align-center" style="width: 95%;">
                <div class="text-h6 font-weight-bold text-custom" prepend-icon="mdi mdi-check-circle">Planos disponíveis
                </div>
                <v-btn-toggle v-model="modo" mandatory class="my-6 rounded-xl" group density="compact"
                    color="deep-blue">
                    <v-btn value="mensal">Mensal</v-btn>
                    <v-btn value="anual">Anual</v-btn>
                </v-btn-toggle>
            </div>
          
            <v-row dense style="width: 95%;">
                <v-col v-for="(plano, index) in planosComPreco" :key="index" cols="12" sm="6" md="6" lg="6">
                    <PlanDetailsCard v-bind="plano"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style>
.planManagementContainer {
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: #F6F3EC;
}

.planManagementContainer__navbar {
    width: auto;
}

.planManagementContainer__content {
    width: 90%;
    min-height: 100vh;
    margin-left: 20%;
    padding: 48px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
}

.text-custom {
    color: #0D2845;
}
</style>