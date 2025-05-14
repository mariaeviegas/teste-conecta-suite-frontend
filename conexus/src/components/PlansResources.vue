<script setup>
import { computed } from 'vue'

const { plano, modal, isActualPlan } = defineProps({
    plano: {
        type: String,
        required: true
    },
    modal: {
        type: Boolean,
        default: false
    },
    isActualPlan: {
        type: Boolean,
        default: false
    }
})

const Basic = [
    { text: 'Até 5 documentos por mês', icon: 'mdi-check-circle' },
    { text: '1 modelo de contrato reutilizável', icon: 'mdi-check-circle' },
    { text: 'Armazenamento por 30  dias', icon: 'mdi-check-circle' },
    { text: 'Suporte via FAQ', icon: 'mdi-check-circle' },
    { text: 'Integração com google drive e microsoft 365', icon: 'mdi mdi-close-circle' },
    { text: 'Notificações automáticas  via e-mail', icon: 'mdi mdi-close-circle' },
    { text: 'Dashboard de acompanhamento', icon: 'mdi mdi-close-circle' },
    { text: 'Personalização visual dos documentos', icon: 'mdi mdi-close-circle' },
    { text: 'Autenticação em duas etapas', icon: 'mdi mdi-close-circle' },
    { text: 'Fluxo com múltiplos signatários', icon: 'mdi mdi-close-circle' },
]

const Essential = [
    { text: 'Até 50 documentos por mês', icon: 'mdi-check-circle' },
    { text: '1 modelo de contrato reutilizável', icon: 'mdi-check-circle' },
    { text: 'Armazenamento ilimitado', icon: 'mdi-check-circle' },
    { text: 'Suporte via e-mail', icon: 'mdi-check-circle' },
    { text: 'Integração com google drive e microsoft 365', icon: 'mdi-check-circle' },
    { text: 'Notificações automáticas  via e-mail', icon: 'mdi-check-circle' },
    { text: 'Dashboard de acompanhamento', icon: 'mdi mdi-close-circle' },
    { text: 'Personalização visual dos documentos', icon: 'mdi mdi-close-circle' },
    { text: 'Autenticação em duas etapas', icon: 'mdi mdi-close-circle' },
    { text: 'Fluxo com múltiplos signatários', icon: 'mdi mdi-close-circle' },
]

const Professional = [
    { text: 'Até 500 documentos por mês', icon: 'mdi-check-circle' },
    { text: '10 modelo de contrato reutilizável', icon: 'mdi-check-circle' },
    { text: 'Armazenamento ilimitado', icon: 'mdi-check-circle' },
    { text: 'Suporte via e-mail', icon: 'mdi-check-circle' },
    { text: 'Integração com google drive e microsoft 365', icon: 'mdi-check-circle' },
    { text: 'Notificações automáticas  via e-mail', icon: 'mdi-check-circle' },
    { text: 'Dashboard de acompanhamento', icon: 'mdi-check-circle' },
    { text: 'Personalização visual dos documentos', icon: 'mdi-check-circle' },
    { text: 'Autenticação em duas etapas', icon: 'mdi mdi-close-circle' },
    { text: 'Fluxo com múltiplos signatários', icon: 'mdi mdi-close-circle' },
]

const Enterprise = [
    { text: 'Documentos ilimitados por mês', icon: 'mdi-check-circle' },
    { text: 'Modelos reutilizáveis ilimitados', icon: 'mdi-check-circle' },
    { text: 'Armazenamento ilimitado', icon: 'mdi-check-circle' },
    { text: 'Suporte prioritário', icon: 'mdi-check-circle' },
    { text: 'Integração com google drive e microsoft 365', icon: 'mdi-check-circle' },
    { text: 'Notificações automáticas  via e-mail', icon: 'mdi-check-circle' },
    { text: 'Dashboard de acompanhamento', icon: 'mdi-check-circle' },
    { text: 'Personalização visual dos documentos', icon: 'mdi-check-circle' },
    { text: 'Autenticação em duas etapas', icon: 'mdi-check-circle' },
    { text: 'Fluxo com múltiplos signatários', icon: 'mdi-check-circle' },
]

const planosMap = {
    Basic,
    Essential,
    Professional,
    Enterprise
}

const items = computed(() => planosMap[plano] || [])
const colunas = computed(() => {
    return modal
        ? [items.value.slice(0, 5), items.value.slice(5, 10)] 
        : [items.value]
})
</script>

<template>
    <v-card class="mx-auto pa-4 rounded-xl" :style="isActualPlan ? 'border: 1px solid #fff;' : 'border: 1px solid #0d2845;'" :color="isActualPlan ? 'deep-blue' : 'white'">
        <v-row :dense="modal">
            <v-col v-for="(coluna, colunaIndex) in colunas" :key="colunaIndex" :cols="modal ? 6 : 12">
                <div v-for="(item, i) in coluna" :key="i" class="d-flex align-center mb-2" v-if="isActualPlan">
                    <v-icon :icon="item.icon" :color="item.icon.includes('check') ? 'orange' : 'white'"
                        class="me-2" />
                    <span :class="item.icon.includes('check') ? 'font-weight-bold' : 'font-weight-regular'"
                        :style="item.icon.includes('check') ? 'color: #ec7616' : 'color:#fff'">
                        {{ item.text }}
                    </span>
                </div>
                <div v-for="(item, i) in coluna" :key="j" class="d-flex align-center mb-2" v-else>
                    <v-icon :icon="item.icon" :color="item.icon.includes('check') ? 'blue' : 'deep-blue'"
                        class="me-2" />
                    <span :class="item.icon.includes('check') ? 'font-weight-bold' : 'font-weight-regular'"
                        :style="item.icon.includes('check') ? 'color: #1E62BF' : 'color:#0d2845'">
                        {{ item.text }}
                    </span>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>