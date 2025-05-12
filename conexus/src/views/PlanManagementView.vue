<script setup>
import Navbar from '../components/Navbar.vue'
import PlanDetailsCard from '../components/PlanDetailsCard.vue';

import { ref, computed } from 'vue'

const modo = ref('mensal')

const planosBase = [
    {
        name: 'Basic',
        description: 'Ideal para freelancers, MEIs.',
        mensal: 0,
        anual: 0,
        setup: 149,
        isActualPlan: true,
        isAdditional: true
    },
    {
        name: 'Essential',
        description: 'Ideal para pequenas equipes...',
        mensal: 49,
        anual: 499,
        setup: 149,
        isActualPlan: false,
        isAdditional: true
    },
    {
        name: 'Professional',
        description: 'Para equipes que assinam muitos documentos.',
        mensal: 99,
        anual: 999,
        setup: 149,
        isActualPlan: false,
        isAdditional: true
    },
    {
        name: 'Enterprise',
        description: 'Plano personalizado para grandes empresas.',
        mensal: 199,
        anual: 1999,
        setup: 149,
        isActualPlan: false,
        isAdditional: true
    }
]

const planosComPreco = computed(() => {
    return planosBase.map(p => ({
        planName: p.name,
        planDescription: p.description,
        planPrice: modo.value === 'mensal' ? p.mensal : p.anual,
        type: modo.value,
        setupPrice: p.setup,
        isActualPlan: p.isActualPlan,
        isAdditional: p.isAdditional
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
                    <PlanDetailsCard v-bind="plano" />
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