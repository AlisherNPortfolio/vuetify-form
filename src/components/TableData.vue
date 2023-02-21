<template>
  <v-form ref="form2" v-model="formValid" lazy-validation>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="name"
    >
      <template v-slot:footer>
        <v-row no-gutters class="mb-2 mt-2">
          <v-col align-self="end" md="2">
            <v-btn
              class="mx-2"
              color="success"
              outlined
              small
              dark
              @click="toggleModal"
            >
              <v-icon>mdi-plus</v-icon> Qo'shish
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <v-btn color="primary mr-2" @click="sendBack(4)">Jo'natish</v-btn>
    <v-btn text @click="sendBack(2)">Orqaga</v-btn>
    <v-overlay :value="openModal" class="modal">
      <v-btn icon @click="openModal = false" style="display: flex;">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card class="mx-auto" outlined>
        <v-card-title>Yangi ma'lumot qo'shish</v-card-title>
        <v-row>
            <v-col col="12">
                <v-layout>
                <v-text-field
                    v-model="tableForm.bankAccount"
                    label="Hisob raqami"
                    outlined
                    dense
                ></v-text-field>
                </v-layout>
                <v-layout>
                    <v-text-field
                        v-model="tableForm.bankAccountName"
                        label="Hisob raqami nomi"
                        outlined
                        dense
                    ></v-text-field>
                    </v-layout>
                    <v-layout>
                        <v-select
                            :items="tableData.banks"
                            label="Bank"
                            placeholder="Bank tanlang"
                            outlined
                            dense
                            item-text="name"
                            item-value="id"
                        ></v-select>
                    </v-layout>
                    <v-layout>
                        <v-select
                            v-model="tableForm.status"
                            :items="tableData.statuses"
                            label="Holati"
                            outlined
                            dense
                            item-text="name"
                            item-value="id"
                        ></v-select>
                    </v-layout>
                    <v-layout>
                        <v-switch
                            v-model="tableData.isOrdinary"
                            class="mr-2 mt-0"
                            label="Odatiy"
                            color="orange darken-3"
                            value="orange darken-3"
                            hide-details
                            dense
                        ></v-switch>
                    </v-layout>
            </v-col>
        </v-row>
        <v-card-actions>
          <v-btn text @click="addItem">Saqlash</v-btn>
          <v-btn text @click="toggleModal">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-form>
</template>
    <script>
export default {
  name: "GeneralData",
  props: {
    form: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    formValid: false,
    innerForm: null,
    tableData: {
      banks: [
        {
          id: 1,
          name: "Ipoteka Bank",
        },
        {
          id: 2,
          name: "Kapital Bank",
        },
        {
          id: 3,
          name: "TBC Bank",
        },
      ],
      statuses: [
        {
          id: true,
          name: "Aktiv",
        },
        {
          id: false,
          name: "Aktiv emas",
        },
      ],
    },
    headers: [
      {
        text: "Hisob raqami",
        align: "start",
        sortable: false,
        value: "bankAccount",
      },
      {
        text: "Hisob raqam nomi",
        value: "bankAccountName",
        align: "start",
        sortable: false,
      },
      {
        text: "Bank",
        value: "bankName",
        align: "start",
        sortable: false,
      },
      {
        text: "Odatiy",
        value: "isOrdinary",
        align: "start",
        sortable: false,
      },
      {
        text: "Holati",
        value: "status",
        align: "start",
        sortable: false,
      },
      {
        text: "Amallar",
        value: "actions",
        align: "start",
        sortable: false,
      },
    ],
    items: [],
    tableForm: {
      bankAccount: null,
      bankAccountName: null,
      bankName: null,
      isOrdinary: false,
      status: null,
    },
    cleanTableForm: {},
    openModal: false,
  }),
  created() {
    this.innerForm = { ...this.form };
    this.cleanTableForm = {...this.tableForm}
  },
  methods: {
    addItem() {
      this.items.push(this.tableForm);
      this.toggleModal();
    },
    toggleModal() {
      this.openModal = !this.openModal;
      this.tableForm = {...this.cleanTableForm}
    },
    sendBack(step) {
      this.$emit("next", {
        step,
        form: this.$refs.form2,
        data: this.innerForm,
      });
    },
  },
};
</script>
<style>
.modal .v-overlay__content {
    width: 25%;
}

.modal .v-card {
    padding: 10px 15px;
}
</style>