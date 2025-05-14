<script setup>
import { defineProps, ref, defineEmits, watch } from 'vue'
import api from '../plugins/axios.js';
import Swal from "sweetalert2";

const props = defineProps({
  open: Boolean,
  setupPrice: Number
})

const userData = JSON.parse(localStorage.getItem('user')) || {}
const id = userData.id

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

const formatPrice = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const confirmSetup = async () => {
  const data = {
    totalAmount: props.setupPrice,
    paymentMethod: paymentMethod.value
  }

  try {
    await api.patch(`/user/setup/${id}`, data)

    emit('close')

    Swal.fire({
    title: "Serviço contratado",
    text: `O serviço de configuração do setup inicial foi contratado com sucesso!`,
    icon: "success",
    confirmButtonText: "OK",
    })
    
    const updatedUserData = {
      ...userData,
      hasSetup: true
    }
    localStorage.setItem('user', JSON.stringify(updatedUserData))

    setTimeout(() => {
      location.reload()
    }, 3000)

  } catch (error) {
    emit('close')

    Swal.fire({
      title: "Ocorreu algum erro",
      text: `Ocorreu um erro ao contratar o serviço de configuração do setup. Tente novamente!`,
      icon: "error",
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
      <v-stepper v-model="step" :items="['Informações do serviço', 'Pagamento']">
        <template v-slot:item.1>
           <v-card
                class="mx-auto my-8"
                max-width="600"
                color="deep-blue"
            >
                <v-card-item>
                    <v-card-title>
                        Como funciona?
                    </v-card-title>
                </v-card-item>

                <v-card-text>
                    O Setup Inicial é um serviço opcional, cobrado uma única vez, que garante a configuração completa e personalizada da sua conta de acordo com o plano contratado.
                    Ao contratar o setup, nossa equipe realiza toda a parametrização necessária para que você possa começar a usar a plataforma de forma rápida, prática e sem complicações.
                </v-card-text>
            </v-card>
        </template>

        <template v-slot:item.2>
          <div class="text-subtitle-2 font-weight-bold text-custom mb-2">
            Setup inicial
          </div>
          <v-checkbox
            v-model="setupCheck"
            density="compact"
            color="orange"
            :label="`Contratar adicional por R$ ${formatPrice(setupPrice || 0)}`"
            hide-details
          />
         
          <div class="text-subtitle-2 font-weight-bold text-custom mb-2 mt-8">Método de pagamento</div>
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
      
          <div class="d-flex justify-space-between align-center mt-2">
            <div class="text-h6 font-weight-bold text-custom" style="color: #ec7616;">
              Total
            </div>
            <div class="text-h6 font-weight-bold text-custom" style="color: #ec7616;">
              R$ {{ formatPrice(setupPrice || 0) }}
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
              :disabled="!paymentMethod || !setupCheck"
              style="background-color: #ec7616; color: white;"
              @click="confirmSetup"
            >
              Contratar serviço
            </v-btn>
          </v-card-actions>
        </template>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>
