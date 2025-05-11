<script setup>
import { computed } from 'vue'

const { plano } = defineProps({
    plano: String
})

const basic = [
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

const essential = [
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

const professional = [
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

const enterprise = [
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
    basic,
    essential,
    professional,
    enterprise
}

const items = computed(() => planosMap[plano] || [])
const colunas = computed(() => [
    items.value.slice(0, 5),
    items.value.slice(5, 10)
])
</script>

<template>
    <v-card class="mx-auto pa-8 rounded-xl" style="border: 1px solid #0d2845;" >
        <v-row>
            <v-col cols="6" v-for="(coluna, colunaIndex) in colunas" :key="colunaIndex">
                <div v-for="(item, i) in coluna" :key="i" class="d-flex align-center mb-2">
                    <v-icon :icon="item.icon" :color="item.icon.includes('check') ? 'blue' : 'deep-blue'" class="me-2" />
                    <span :class="item.icon.includes('check') ? 'font-weight-bold' : 'font-weight-regular'"
                        :style="item.icon.includes('check') ? 'color: #1E62BF' : 'color:#0d2845'">
                        {{ item.text }}
                    </span>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>