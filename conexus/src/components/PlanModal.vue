<script setup>
import { defineProps, ref, computed } from 'vue'
import PlansResources from './PlansResources.vue'

const props = defineProps({
  open: Boolean,
  plano: Object
})

const step = ref(1)
const setupCheck = ref(false)
const paymentMethod = ref(null)

const nextStep = () => step.value++
const previousStep = () => step.value--

// Dados do plano atual
const userData = JSON.parse(localStorage.getItem('user')) || {}
const hasSetup = userData.hasSetup
const actualPlanName = userData.actualPlan || 'Sem plano ativo'
const actualPlanMonthlyPrice = userData.monthlyPrice || 0
const actualPlanYearlyPrice = userData.yearlyPrice || 0

// Dados do plano selecionado
const planName = computed(() => props.plano?.planName || '')
const planPrice = computed(() => props.plano?.planPrice || 0)
const type = computed(() => props.plano?.type || '')
const setupPrice = computed(() =>
  !hasSetup && setupCheck.value ? props.plano?.setupPrice || 0 : 0
)

const planDifference = computed(() =>
  type.value == 'mensal' ? 
    planPrice.value > actualPlanMonthlyPrice ? planPrice.value - actualPlanMonthlyPrice : 0
    :
    planPrice.value > actualPlanYearlyPrice ? planPrice.value - actualPlanYearlyPrice : 0
)

const total = computed(() => planDifference.value + setupPrice.value)

const formatPrice = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>

<template>
  <v-dialog max-width="700" v-model="props.open">
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
            :items="['Pix', 'Crédito', 'Boleto']"
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
            <div class="text-subtitle-2 font-weight-regular text-custom">R$ {{ type == 'mensal' ? formatPrice(actualPlanMonthlyPrice) : formatPrice(actualPlanYearlyPrice) }}</div>
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
            <v-btn variant="plain" @click="previousStep" :disabled="step === 1">Voltar</v-btn>
            <v-btn v-if="step < 2" style="background-color: #ec7616; color: white;" @click="nextStep">
              Próximo
            </v-btn>
            <v-btn
              v-if="step === 2"
              :disabled="!paymentMethod"
              style="background-color: #ec7616; color: white;"
              @click="confirmarPlano"
            >
              Confirmar Plano
            </v-btn>
          </v-card-actions>
        </template>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
