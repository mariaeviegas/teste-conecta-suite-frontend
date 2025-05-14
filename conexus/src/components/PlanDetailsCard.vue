<script setup>
import PlansResources from './PlansResources.vue'

defineProps ({
    planName: {
        type: String,
        required: true
    },
    planDescription: {
        type: String,
        required: true
    },
    planPrice: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isActualPlan: {
        type: Boolean,
        required: true
    },
    hasSetup: {
        type: Boolean,
        required: true
    },
    setupPrice: {
        type: Number,
        required: true
    }
})

const formatPrice = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>

<template>
    <v-card :color="isActualPlan ? 'deep-blue' : 'white'" class="rounded-xl pa-4" style="height: 100%;" elevation="4">
        <v-card-item>
            <div>
                <div :class="isActualPlan ? 'text-h6 font-weight-bold text-custom-actual' : 'text-h6 font-weight-bold text-custom'">{{ planName }}</div>
                <div :class="isActualPlan ? 'text-subtitle-2 font-weight-regular text-custom-actual' : 'text-subtitle-2 font-weight-regular text-custom'">{{ planDescription }}</div>

                <div class="d-flex flex-row align-center mt-8">
                    <div :class="isActualPlan ? 'text-h6 font-weight-bold text-custom-actual me-1' : 'text-h6 font-weight-bold text-custom me-1'">R$ {{ formatPrice(planPrice) }}</div>
                    <div :class="isActualPlan ? 'text-caption font-weight-regular text-custom-actual' : 'text-caption font-weight-regular text-custom'">/{{ type }}</div>
                </div>
            </div>

            <PlansResources :plano="planName" class="mt-8" :isActualPlan="isActualPlan"/>

            <div class="mt-8 d-flex align-center" v-if="hasSetup">
                <v-icon class="me-2" color="orange">mdi-check-circle</v-icon>
                <div class="font-weight-bold text-subtitle-2 text-custom-check">Adicional de setup contratado</div>
            </div>
            <div v-else-if="planName != 'Enterprise'" class="font-weight-bold text-center text-custom-check text-subtitle-2 mt-8" style="width: 80%; margin: auto;">Setup inicial personalizado está disponível à parte por R$ {{ formatPrice(setupPrice) }}</div>
            <div v-else class="font-weight-bold text-center text-custom-check text-subtitle-2 mt-8" style="width: 80%; margin: auto;">Setup inicial personalizado está incluso no plano</div>

            <v-btn v-if="!isActualPlan" size="large" rounded="xl" color="orange" block class="mt-8" @click="$emit('select')">Selecionar plano</v-btn>
            <v-btn v-else size="large" rounded="xl" color="white" block class="mt-8" variant="outlined" disabled>Plano atual</v-btn>
        </v-card-item>
    </v-card>
</template>

<style>
.text-custom {
    color: #0D2845;
}
.text-custom-check {
    color: #ec7616;
}
.text-custom-actual {
    color: #fff;
}
</style>