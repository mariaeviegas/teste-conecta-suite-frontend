<script setup>
import { defineProps, ref, computed, defineEmits, watch } from 'vue'
import PlansResources from './PlansResources.vue'
import api from '../plugins/axios.js';
import Swal from "sweetalert2";

const props = defineProps({
  open: Boolean,
  plano: Object
})

const emit = defineEmits(['close'])
const localOpen = ref(props.open)

const step = ref(1)
const setupCheck = ref(false)
const paymentMethod = ref(null)

const nextStep = () => step.value++
const previousStep = () => step.value--

watch(() => props.open, (val) => {
  localOpen.value = val
})

// Dados do plano atual
const userData = JSON.parse(localStorage.getItem('user')) || {}
const id = userData.id
const hasSetup = userData.hasSetup
const actualPlanName = userData.actualPlan || 'Sem plano ativo'
const actualPlanMonthlyPrice = userData.monthlyPrice || 0
const actualPlanYearlyPrice = userData.yearlyPrice || 0


const actualPlanPrice = computed(() =>
  type.value === 'mensal' ? actualPlanMonthlyPrice : actualPlanYearlyPrice
)

// Dados do plano selecionado
const planName = computed(() => props.plano?.planName || '')
const planPrice = computed(() => props.plano?.planPrice || 0)
const type = computed(() => props.plano?.type || '')
const setupPrice = computed(() =>
  !hasSetup && setupCheck.value ? props.plano?.setupPrice || 0 : 0
)

const planDifference = computed(() =>
  Math.max(0, planPrice.value - actualPlanPrice.value)
)

const total = computed(() => planDifference.value + setupPrice.value)

const formatPrice = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const isUpgrade = computed(() => planPrice.value > actualPlanPrice.value)
const isDowngrade = computed(() => planPrice.value < actualPlanPrice.value)
const isNewPlan = actualPlanName === 'Sem plano ativo'

const confirmPlan = async () => {
  const data = {
    plan: planName.value.toUpperCase(),
    paymentMethod: paymentMethod.value
  }

  const endpoint = isNewPlan
  ? `/contract/${id}`
  : isUpgrade.value
    ? `/plans/upgrade/${id}`
    : `/plans/downgrade/${id}`

  try {
    const response = await api.post(endpoint, data)

    emit('close')

    if (isNewPlan) {
      Swal.fire({
        title: "Compra realizada",
        text: `O plano ${planName.value} foi contratado com sucesso. Aproveite os benefícios!`,
        icon: "success",
        confirmButtonText: "OK",
      })
    } else {
      Swal.fire({
        title: "Plano alterado",
        text: `Seu plano foi alterado para ${planName.value} com sucesso. Aproveite os benefícios!`,
        icon: "success",
        confirmButtonText: "OK",
      })
    }
    
    const updatedUserData = {
      ...userData,
      actualPlan: response.data.newPlan,
      monthlyPrice: response.data.planMonthlyPrice,
      yearlyPrice: response.data.planYearlyPrice
    }
    localStorage.setItem('user', JSON.stringify(updatedUserData))

    setTimeout(() => {
      location.reload()
    }, 3000)

  } catch (error) {
    emit('close')

    Swal.fire({
      title: "Ocorreu algum erro",
      text: `Ocorreu um erro ao contratar o plano ${planName.value}. Tente novamente!`,
      icon: "success",
      confirmButtonText: "OK",
    })  
    
    setTimeout(() => {
      location.reload()
    }, 3000)
  }
  
}
</script>

<template>
  <v-dialog max-width="700"  v-model="localOpen"
  @update:modelValue="(val) => { if (!val) emit('close') }">
    <v-card class="d-flex flex-column">
      <v-stepper v-model="step" :items="['Revisão de dados do plano', 'Pagamento']">
        <template v-slot:item.1>
          <div class="text-h6 font-weight-bold text-custom mb-4">{{ planName }}</div>

          <div class="text-subtitle-2 font-weight-bold text-custom mb-2">
            Recursos disponíveis
          </div>
          <v-card flat class="mb-8">
            <PlansResources :plano="planName" modal="true" />
          </v-card>

          <div class="text-subtitle-2 font-weight-bold text-custom mb-2">
            Adicional ao plano - Setup inicial
          </div>
          <v-checkbox
            v-if="!hasSetup"
            v-model="setupCheck"
            density="compact"
            color="orange"
            :label="`Contratar adicional por R$ ${formatPrice(props.plano?.setupPrice || 0)}`"
            hide-details
          />
          <div class="d-flex align-center" v-else>
            <v-icon class="me-2" color="orange">mdi-check-circle</v-icon>
            <div class="font-weight-bold text-subtitle-2 text-custom-check">Adicional de setup contratado</div>
          </div>
        </template>

        <template v-slot:item.2>
          <div class="text-subtitle-2 font-weight-bold text-custom mb-2">Método de pagamento</div>
          <v-autocomplete
            v-model="paymentMethod"
            :items="[
              { title: 'Pix', value: 'PIX' },
              { title: 'Cartão de Crédito', value: 'CREDIT_CARD' },
              { title: 'Boleto', value: 'BOLETO' }
            ]"
            item-title="title"
            item-value="value"
            placeholder="Selecione um método"
            density="comfortable"
            variant="outlined"
            required
          />

          <div class="text-subtitle-2 font-weight-bold text-custom mt-4">Valor da contratação</div>
          <div class="d-flex justify-space-between align-center mt-2" >
            <div class="text-subtitle-2 font-weight-regular text-custom">Tipo de contratação</div>
            <div class="text-subtitle-2 font-weight-regular text-custom">{{ type }}</div>
          </div>
          <div class="d-flex justify-space-between align-center">
            <div class="text-subtitle-2 font-weight-regular text-custom">Plano selecionado: {{ planName }}</div>
            <div class="text-subtitle-2 font-weight-regular text-custom">R$ {{ formatPrice(planPrice) }}</div>
          </div>
          <div class="d-flex justify-space-between align-center">
            <div class="text-subtitle-2 font-weight-regular text-custom">Plano atual: {{ actualPlanName }}</div>
            <div class="text-subtitle-2 font-weight-regular text-custom">R$ {{ formatPrice(actualPlanPrice) }}</div>
          </div>
          <div class="d-flex justify-space-between align-center">
            <div class="text-subtitle-2 font-weight-regular text-custom">Diferença a pagar</div>
            <div class="text-subtitle-2 font-weight-regular text-custom">R$ {{ formatPrice(planDifference) }}</div>
          </div>
          <div class="d-flex justify-space-between align-center">
            <div class="text-subtitle-2 font-weight-regular text-custom">Adicional do setup</div>
            <div class="text-subtitle-2 font-weight-regular text-custom">R$ {{ formatPrice(setupPrice) }}</div>
          </div>
          <div class="d-flex justify-space-between align-center mt-2">
            <div class="text-h6 font-weight-bold text-custom" style="color: #ec7616;">
              Total
            </div>
            <div class="text-h6 font-weight-bold text-custom" style="color: #ec7616;">
              R$ {{ formatPrice(total) }}
            </div>
          </div>
        </template>

        <template v-slot:actions>
          <v-card-actions class="justify-end mt-4">
            <v-btn v-if="step < 2" variant="plain" @click="emit('close')">Fechar</v-btn>
            <v-btn v-else variant="plain" @click="previousStep()">Voltar</v-btn>
            <v-btn v-if="step < 2" style="background-color: #ec7616; color: white;" @click="nextStep">
              Próximo
            </v-btn>
            <v-btn
              v-if="step === 2"
              :disabled="!paymentMethod"
              style="background-color: #ec7616; color: white;"
              @click="confirmPlan"
            >
              Confirmar Plano
            </v-btn>
          </v-card-actions>
        </template>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
