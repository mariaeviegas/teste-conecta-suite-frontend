<script setup></script>

<template>
    <v-card color="white" class="rounded-xl pa-4">
        <v-card-item>
            <div>
                <div class="text-h6 font-weight-bold text-custom" color="deep-blue">Básico</div>
                <div class="mt-1 font-weight-regular text-custom" color="deep-blue">
                    Ideal para pequenas equipes que buscam formalizar documentos com praticidade.
                </div>
                <div class="text-h6 mt-8 font-weight-bold text-custom">Gratuito</div>
            </div>

            <div class="mt-8 d-flex align-center" style="gap: 2px;">
                <v-icon class="me-2" color="orange">mdi-check-circle</v-icon>
                <div class="font-weight-regular text-custom-check">Texto com ícone</div>
            </div>
            <div class="mt-4 d-flex align-center" style="gap: 2px;">
                <v-icon class="me-2" color="orange">mdi-check-circle</v-icon>
                <div class="font-weight-regular text-custom-check">Texto com ícone</div>
            </div>

            <v-btn size="large" rounded="xl" color="orange" block class="mt-8">Selecionar plano</v-btn>
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
</style>