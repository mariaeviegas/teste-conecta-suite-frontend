<script setup>
import Navbar from '../components/Navbar.vue'
import PlanDetailsCard from '../components/PlanDetailsCard.vue';
import PlanModal from '../components/PlanModal.vue';
import SetupModal from '../components/SetupModal.vue';
import { ref, computed, onMounted } from 'vue'
import api from '../plugins/axios.js';

const showDialog = ref(false)
const planoSelecionado = ref(null)
const abrirModal = (plano) => {
  planoSelecionado.value = plano
  showDialog.value = true
}

const showSetupModal = ref(false)
const abrirSetupModal = () => {
  planoSelecionado.value = null
  showSetupModal.value = true
}

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
  return plans.value.map(p => {
    const mensal = p.monthlyPrice
    const anual = p.yearlyPrice
    const desconto = (1 - (anual / (mensal * 12))) * 100

    return {
      planName: p.label,
      planDescription: p.description,
      planPrice: modo.value === 'mensal' ? mensal : anual,
      type: modo.value,
      setupPrice: p.setupPrice,
      discount: modo.value === 'anual' ? desconto : null,
      isActualPlan: p.label === actualPlanName,
      hasSetup: hasSetup
    }
  })
})

const actualPlanDetails = computed(() => {
    if (!plans.value.length) return null

    const found = plans.value.find(p => p.label === actualPlanName)
    return found || plans.value.find(p => p.label === 'Basic')
})

const setupPrice = computed(() => {
  return actualPlanDetails.value?.setupPrice || 0
})

const formatPrice = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>

<template>
    <div class="planManagementContainer">
        <div class="planManagementContainer__navbar">
            <Navbar />
        </div>
        <div class="planManagementContainer__content">
            <v-card color="deep-blue" class="rounded-xl pa-8" style="width: 95%;" elevation="4">
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

            <v-card v-if="!hasSetup" class="d-flex justify-space-between align-center pa-6 rounded-xl" style="width: 95%;" elevation="4">
                <div class="text-subtitle-2 font-weight-bold text-custom" prepend-icon="mdi mdi-check-circle">Configuração de setup disponível por R$ {{ formatPrice(setupPrice) }}</div>
                <v-btn prepend-icon="mdi mdi-plus-circle" color="orange" @click="abrirSetupModal()">
                    Contratar
                </v-btn>
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
          
            <v-row style="width: 100%;">
                <v-col v-for="(plano, index) in planosComPreco" :key="index" cols="12" sm="6" md="6" lg="6">
                    <PlanDetailsCard v-bind="plano" @select="abrirModal(plano)"/>
                </v-col>
            </v-row>

             <PlanModal :open="showDialog" :plano="planoSelecionado" @close="showDialog = false" />
             <SetupModal :open="showSetupModal" :setupPrice="setupPrice"  @close="showSetupModal = false" @updatePlans="getPlans()"/>
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