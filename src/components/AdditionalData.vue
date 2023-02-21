<template>
  <v-form ref="form3" v-model="formValid" lazy-validation>
    <v-layout class="pt-2">
      <v-autocomplete
        v-model="innerForm.orgFullName"
        label="To'liq nomlanishi"
        placeholder="To'liq nomlanishi"
        hide-no-data
        hide-selected
        outlined
        append-icon=""
        :loading="isOrgLoading"
        :items="organizations"
        :search-input.sync="searchOrgFull"
        prepend-inner-icon="mdi-factory"
        clearable
        loader-height="4"
        dense
        :rules="rules.requiredRule"
        return-object
        item-text="name"
        item-value="id"
      ></v-autocomplete>
    </v-layout>
    <v-layout>
      <v-text-field
        v-model="innerForm.phone"
        prepend-inner-icon="mdi-phone"
        label="Telefon"
        outlined
        dense
        :rules="rules.checkPhone"
        class="mr-2"
      ></v-text-field>
    
      <v-text-field
        v-model="innerForm.economist"
        prepend-inner-icon="mdi-cash-register"
        label="Iqtisodchi"
        outlined
        dense
        :rules="rules.checkAccounter"
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-select
        v-model="innerForm.managementType"
        :items="orgManagementTypes"
        class="mr-2"
        label="Boshqaruv shakli"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-office-building"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
      <v-select
        v-model="innerForm.ownerOrg"
        :items="ownerOrganizations"
        label="Yuqori turuvchi tashkilot"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-domain"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
    </v-layout>
    <v-layout>
      <v-file-input
        v-model="innerForm.documents"
        color="deep-purple accent-4"
        counter
        label="Ta'sis hujjati"
        placeholder="Fayl tanlash uchun bosing"
        prepend-inner-icon="mdi-paperclip"
        prepend-outer-icon=""
        outlined
        :show-size="1000"
        class="form-document"
        :rules="rules.requiredRule"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
    </v-layout>
    <v-layout>
      <v-text-field
        v-model.number="innerForm.coefficient"
        prepend-inner-icon="mdi-percent-box"
        label="Koiffitsiyent"
        outlined
        dense
        :rules="rules.numberField"
      ></v-text-field>
    </v-layout>
    <v-btn color="primary mr-2" @click="sendBack(4)">Keyingi</v-btn>
    <v-btn text @click="sendBack(2)">Orqaga</v-btn>
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
    organizations: [],
    isOrgLoading: false,
    searchOrgFull: null,
    orgManagementTypes: [
      {
        id: 1,
        name: "Boshqaruv turi 1",
      },
      {
        id: 2,
        name: "Boshqaruv turi 2",
      },
      {
        id: 3,
        name: "Boshqaruv turi 3",
      },
    ],
    ownerOrganizations: [
      {
        id: 1,
        name: "Tashkilot 1",
      },
      {
        id: 2,
        name: "Tashkilot 2",
      },
      {
        id: 3,
        name: "Tashkilot 3",
      },
      {
        id: 4,
        name: "Tashkilot 4",
      },
    ]
  }),
  created() {
    this.innerForm = { ...this.form };
  },
  methods: {
    sendBack(step) {
      this.$emit("next", {
        step,
        form: this.$refs.form3,
        data: this.innerForm,
      });
    },
  },
  watch: {
    searchOrgFull(e) {
      console.log(e);
      if (this.organizations.length > 0) return;
      if (this.isOrgLoading) return;

      this.isOrgLoading = true;

      const apiData = [
        {
          id: 1,
          name: "Tashkilot 1",
        },
        {
          id: 2,
          name: "Tashkilot 2",
        },
        {
          id: 3,
          name: "Tashkilot 3",
        },
        {
          id: 4,
          name: "Tashkilot 4",
        },
      ];
      setTimeout(() => {
        this.organizations = apiData;
        this.isOrgLoading = false;
      }, 2000);
    },
  },
};
</script>
<style>
.form-document .v-input__prepend-outer {
    display: none !important;
}
</style>