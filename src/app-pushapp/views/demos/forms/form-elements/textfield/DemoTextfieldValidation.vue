<script setup>
import {
  emailValidator,
  requiredValidator,
} from "@app-pushapp/@core/utils/validators";

const email = ref("");
</script>

<template>
  <VForm>
    <AppTextField
      v-model="email"
      :rules="[requiredValidator, emailValidator]"
      label="E-mail"
    />
  </VForm>
</template>
