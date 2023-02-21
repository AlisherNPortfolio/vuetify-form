<template>
  <v-form ref="form1" v-model="formValid" lazy-validation>
    <v-layout class="pt-2">
      <v-autocomplete
        v-model="innerForm.inn"
        label="INN"
        placeholder="INN qidirishni boshlash"
        class="search-field"
        hide-no-data
        hide-selected
        outlined
        append-icon=""
        :loading="isInnLoading"
        :items="inns"
        :search-input.sync="searchInn"
        prepend-inner-icon="mdi-text-box-search"
        clearable
        loader-height="4"
        dense
        :rules="rules.requiredRule"
      ></v-autocomplete>
    </v-layout>
    <v-layout>
      <v-text-field
        v-model="innerForm.director"
        prepend-inner-icon="mdi-account-circle"
        label="Direktor"
        outlined
        dense
        :rules="rules.requiredRule"
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-select
        v-model="innerForm.regionId"
        :items="regions"
        class="mr-2"
        label="Hudud"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-hospital-marker"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
    </v-layout>
    <v-layout>
      <v-text-field
        v-model="innerForm.address"
        prepend-inner-icon="mdi-city"
        label="Manzil"
        outlined
        dense
        :rules="rules.requiredRule"
      ></v-text-field>
    </v-layout>
    <v-layout>
      <v-select
        v-model="innerForm.orgType"
        class="mr-2"
        :items="orgTypes"
        label="Tashkilot turi"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-home-city"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
      <v-select
        v-model="innerForm.eduOrgType"
        :items="eduOrgTypes"
        label="Sport ta'lim muassasasi turi"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-basketball"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
    </v-layout>
    <v-layout>
      <v-menu
        ref="menu"
        v-model="formDatePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="innerForm.establishedDate"
            label="Tashkil qilingan sana"
            prepend-inner-icon="mdi-calendar"
            readonly
            outlined
            dense
            v-bind="attrs"
            v-on="on"
            :rules="rules.requiredRule"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="innerForm.establishedDate"
          @input="formDatePicker = false"
          :allowed-dates="allowedDates"
        >
        </v-date-picker>
      </v-menu>
    </v-layout>
    <v-layout>
      <v-select
        v-model="innerForm.studentGroup"
        :items="studentGroups"
        class="mr-2"
        label="O'quvchilar (tarbiyalanuvchilar) kontingentiga qarab muassasa guruhi"
        outlined
        item-text="name"
        item-value="id"
        prepend-inner-icon="mdi-account-group"
        clearable
        dense
        :rules="rules.requiredRule"
      ></v-select>
    </v-layout>
    <v-layout class="mb-2">
      <v-switch
        v-model="innerForm.isRepaired"
        label="Yangi ta'mirlangan"
        color="success"
        value="success"
        hide-details
        prepend-icon="mdi-wrench"
        class="ml-4 mb-4"
      ></v-switch>
    </v-layout>
    <v-btn color="primary mr-2" @click="sendBack">Keyingi</v-btn>
    <v-btn text>Cancel</v-btn>
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
    formLoading: false,
    innerForm: null,
    inns: [],
    regions: [
      {
        id: 1,
        name: "Andijon",
      },
      {
        id: 2,
        name: "Buxoro",
      },
      {
        id: 3,
        name: "Farg'ona",
      },
      {
        id: 4,
        name: "Namangan",
      },
      {
        id: 5,
        name: "Navoiy",
      },
      {
        id: 6,
        name: "Qashqadaryo",
      },
      {
        id: 7,
        name: "Qoraqalpog'iston Respublikasi",
      },
      {
        id: 8,
        name: "Samarqand",
      },
      {
        id: 9,
        name: "Sirdaryo",
      },
      {
        id: 10,
        name: "Surxondaryo",
      },
      {
        id: 12,
        name: "Xorazm",
      },
      {
        id: 13,
        name: "Toshkent viloyati",
      },
      {
        id: 14,
        name: "Toshkent shahri",
      },
    ],
    orgTypes: [
      {
        id: 1,
        name: "YaTT",
      },
      {
        id: 2,
        name: "MChJ",
      },
      {
        id: 3,
        name: "OAJ",
      },
    ],
    eduOrgTypes: [
      {
        id: 1,
        name: "Futbol",
      },
      {
        id: 2,
        name: "Volleybol",
      },
      {
        id: 3,
        name: "Tennis",
      },
    ],
    studentGroups: [
      {
        id: 1,
        name: "1-Guruh",
      },
      {
        id: 2,
        name: "2-Guruh",
      },
      {
        id: 3,
        name: "3-Guruh",
      },
    ],
    formDatePicker: false,
    isInnLoading: false,
    searchInn: null,
  }),
  created() {
    this.innerForm = {
      ...this.form,
    };
  },
  methods: {
    allowedDates(val) {
      return new Date(val).getTime() < new Date().getTime();
    },
    sendBack() {
      this.$emit("next", {
        step: 2,
        form: this.$refs.form1,
        data: this.innerForm,
      });
    },
  },
  watch: {
    searchInn(e) {
      console.log(e);
      if (this.inns.length > 0) return;
      if (this.isInnLoading) return;

      this.isInnLoading = true;

      const apiData = [
        "12223232121234",
        "32983238521258",
        "87564698465488",
        "74145787424475",
        "96456785457282",
        "74747546786576",
        "36345434552527",
        "75842882842442",
        "69523244575754",
        "35225252525252",
      ];
      setTimeout(() => {
        this.inns = apiData;

        this.isInnLoading = false;
      }, 3000);
    },
  },
};
</script>
