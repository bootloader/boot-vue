import axios from "@app-pushapp/@fake-db/axios";
import { defineStore } from "pinia";

export const useInvoiceStore = defineStore("InvoiceStore", {
  actions: {
    // 👉 Fetch all Invoices
    fetchInvoices(params) {
      return axios.get("apps/invoices", { params });
    },

    // 👉 Fetch single invoice
    fetchInvoice(id) {
      return axios.get(`/apps/invoices/${id}`);
    },

    // 👉 Fetch Clients
    fetchClients() {
      return axios.get("/apps/invoice/clients");
    },

    // 👉 Delete Invoice
    deleteInvoice(id) {
      return axios.delete(`/apps/invoices/${id}`);
    },
  },
});
