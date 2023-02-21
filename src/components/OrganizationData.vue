<template>
  <v-form ref="form2" v-model="formValid" lazy-validation>
    <v-layout class="pt-2">
      <v-autocomplete
        v-model="innerForm.inn"
        label="Qisqa nomlanishi"
        placeholder="Qisqa nomlanishi"
        hide-no-data
        hide-selected
        outlined
        append-icon=""
        :loading="isOrgLoading"
        :items="organizations"
        :search-input.sync="searchOrganization"
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
        v-model="innerForm.indx"
        prepend-inner-icon="mdi-mailbox"
        label="Indeks"
        outlined
        dense
        :rules="rules.checkIndex"
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-text-field
        v-model="innerForm.accounter"
        prepend-inner-icon="mdi-cash-register"
        label="Hisobchi"
        outlined
        dense
        :rules="rules.checkAccounter"
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-select
        v-model="innerForm.orgLegalType"
        :items="orgLegalTypes"
        class="mr-2"
        label="Muassasa tashkiliy huquqiy shakli"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-office-building-cog"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
      <v-select
        v-model="innerForm.ifut"
        :items="ifutList"
        label="IFUT"
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
      <v-text-field
        v-model="innerForm.website"
        prepend-inner-icon="mdi-web"
        label="Vebsayt"
        outlined
        dense
        :rules="rules.checkWebsite"
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-select
        v-model="innerForm.status"
        :items="statuses"
        class="mr-2"
        label="Holati"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-domain"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
      <v-text-field
        v-model="innerForm.power"
        prepend-inner-icon="mdi-size-xxl"
        class="v-select"
        label="Quvvati"
        outlined
        dense
        :rules="rules.requiredRule"
      ></v-text-field>
    </v-layout>
    <v-btn color="primary mr-2" @click="sendBack(3)">Keyingi</v-btn>
    <v-btn text @click="sendBack(1)">Orqaga</v-btn>
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
    searchOrganization: null,
    orgLegalTypes: [
      {
        id: 1,
        name: "Tijorat tashkiloti",
      },
      {
        id: 2,
        name: "Unitar korxona",
      },
      {
        id: 3,
        name: "Notijorat tashkilot",
      },
    ],
    ifutList: [
      {
        id: 1,
        name: "Oziq-ovqat mahsulotlari ishlab chiqarish",
      },
      {
        id: 2,
        name: "Ichimlik ishlab chiqarish",
      },
      {
        id: 3,
        name: "Kiyim ishlab chiqarish",
      },
      {
        id: 4,
        name: "To'qimachilik mahsulotlari ishlab chiqarish",
      },
    ],
    statuses: [
      {
        id: 1,
        name: "A'lo",
      },
      {
        id: 2,
        name: "O'rtacha",
      },
      {
        id: 3,
        name: "Yomon",
      },
    ],
  }),
  created() {
    this.innerForm = { ...this.form };
  },
  methods: {
    sendBack(step) {
      this.$emit("next", {
        step,
        form: this.$refs.form2,
        data: this.innerForm,
      });
    },
  },
  watch: {
    searchOrganization(e) {
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