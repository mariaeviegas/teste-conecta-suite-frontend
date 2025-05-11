<script setup>
import Navbar from '../components/Navbar.vue'
import PlanOverviewCard from '../components/PlanOverviewCard.vue'
</script>

<template>
    <div class="planManagementContainer">
        <div class="planManagementContainer__navbar">
            <Navbar />
        </div>
        <div class="planManagementContainer__content">
            <v-card color="deep-blue" class="rounded-xl pa-12" style="width: 95%;">
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
                    <v-btn variant="outlined" color="orange">
                        Saiba mais
                    </v-btn>
                </v-card-actions>
            </v-card>

            <div class="d-flex justify-space-between align-center" style="width: 95%;">
                <div class="text-h6 font-weight-bold text-custom" prepend-icon="mdi mdi-check-circle">Planos disponíveis
                </div>
                <v-btn variant="outlined" size="large" color="blue">Ver detalhes</v-btn>
            </div>

            <v-row dense style="width: 95%;">
                <v-col cols="12" sm="6" md="6" lg="3">
                    <PlanOverviewCard />
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="3">
                    <PlanOverviewCard />
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="3">
                    <PlanOverviewCard />
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="3">
                    <PlanOverviewCard />
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
    margin-left: 15%;
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