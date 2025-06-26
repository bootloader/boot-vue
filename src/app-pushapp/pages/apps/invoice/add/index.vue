<script setup>
import InvoiceEditable from "@app-pushapp/views/apps/invoice/InvoiceEditable.vue";

const invoiceData = ref({
  invoice: {
    id: 5037,
    issuedDate: "",
    service: "",
    total: 0,
    avatar: "",
    invoiceStatus: "",
    dueDate: "",
    balance: 0,
    client: {
      address: "",
      company: "",
      companyEmail: "",
      contact: "",
      country: "",
      name: "",
    },
  },
  paymentDetails: {
    totalDue: "$12,110.55",
    bankName: "American Bank",
    country: "United States",
    iban: "ETD95476213874685",
    swiftCode: "BR91905",
  },
  purchasedProducts: [
    {
      title: "",
      cost: 0,
      qty: 0,
      description: "",
    },
  ],
  note: "",
  paymentMethod: "",
  salesperson: "",
  thanksNote: "",
});

const paymentTerms = ref(true);
const clientNotes = ref(false);
const paymentStub = ref(false);
const selectedPaymentMethod = ref("Bank Account");

const paymentMethods = ["Bank Account", "PayPal", "UPI Transfer"];
</script>

<template>
  <VRow>
    <!-- 👉 InvoiceEditable -->
    <VCol cols="12" md="9">
      <InvoiceEditable :data="invoiceData" />
    </VCol>

    <!-- 👉 Right Column: Invoice Action -->
    <VCol cols="12" md="3">
      <VCard class="mb-8">
        <VCardText>
          <!-- 👉 Send Invoice -->
          <VBtn block prepend-icon="tabler-send" class="mb-2">
            Send Invoice
          </VBtn>

          <!-- 👉 Preview -->
          <VBtn
            block
            color="default"
            variant="tonal"
            class="mb-2"
            :to="{ name: 'apps-invoice-preview-id', params: { id: '5036' } }"
          >
            Preview
          </VBtn>

          <!-- 👉 Save -->
          <VBtn block color="default" variant="tonal"> Save </VBtn>
        </VCardText>
      </VCard>

      <!-- 👉 Select payment method -->
      <AppSelect
        v-model="selectedPaymentMethod"
        :items="paymentMethods"
        label="Accept Payment Via"
        class="mb-6"
      />

      <!-- 👉 Payment Terms -->
      <div class="d-flex align-center justify-space-between mb-2">
        <VLabel for="payment-terms"> Payment Terms </VLabel>
        <div>
          <VSwitch id="payment-terms" v-model="paymentTerms" />
        </div>
      </div>

      <!-- 👉  Client Notes -->
      <div class="d-flex align-center justify-space-between mb-2">
        <VLabel for="client-notes"> Client Notes </VLabel>
        <div>
          <VSwitch id="client-notes" v-model="clientNotes" />
        </div>
      </div>

      <!-- 👉  Payment Stub -->
      <div class="d-flex align-center justify-space-between">
        <VLabel for="payment-stub"> Payment Stub </VLabel>
        <div>
          <VSwitch id="payment-stub" v-model="paymentStub" />
        </div>
      </div>
    </VCol>
  </VRow>
</template>
