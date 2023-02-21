<template>
<v-container>
    <v-row class="mb-6" justify="center" no-gutters>
        <v-col cols="12" lg="5" md="7">
            <v-stepper v-model="formStep" vertical>
                <v-stepper-step step="1" v-bind:complete="formStep > 1">
                    Umumiy
                    <small>Umumiy ma'lumotlar</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card class="mb-12" flat>
                        <general-data
                          :form="form"
                          :rules="rules"
                          @next="nextStep"
                        ></general-data>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step step="2" v-bind:complete="formStep > 2">
                  Tashkilot
                  <small>Tashkilot ma'lumotlari</small>
                </v-stepper-step>
                <v-stepper-content step="2">

                    <organization-data
                      :form="form"
                      :rules="rules"
                      @next="nextStep"
                    ></organization-data>
                </v-stepper-content>
                <v-stepper-step step="3" v-bind:complete="formStep > 3">
                  Qo'shimcha
                  <small>Qo'shimcha ma'lumotlar</small>
                </v-stepper-step>
                <v-stepper-content step="3">
                  <additional-data
                    :form="form"
                    :rules="rules"
                    @next="nextStep"
                  ></additional-data>
                </v-stepper-content>
                <v-stepper-step step="4">View setup instructions</v-stepper-step>
                <v-stepper-content step="4">
                  <table-data :form="form" :rules="rules" @next="nextStep"></table-data>
                </v-stepper-content>
            </v-stepper>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import GeneralData from '@/components/GeneralData';
import OrganizationData from '@/components/OrganizationData';
import AdditionalData from '@/components/AdditionalData';
import TableData from '@/components/TableData';

export default {
  components: { GeneralData, OrganizationData, AdditionalData, TableData },
    name: 'AppForm',
    comments: {
      GeneralData
    },
    data: (vm) => ({
        formStep: 1,
        formLoading: false,
        form: {
          inn: null,
          regionId: null,
          address: null,
          director: null,
          orgType: null,
          establishedDate: null,
          studentGroup: null,
          isRepaired: false,
          accounter: null,
          orgLegalType: null,
          ifut: null,
          website: null,
          status: null,
          power: null,
          orgFullName: null,
          phone: null,
          economist: null,
          managementType: null,
          ownerOrg: null,
          documents: null,
          coefficient: null
        },
        rules: {
          requiredRule: [(v) => !!v || "Bu maydonni to'ldirish majburiy"],
          checkIndex: [(v) => (!!v && String(v).length == 6) || "Indeks qiymati uzunligi xato"],
          checkAccounter: [(v) => vm.checkMinMaxLen(v, 2, 20)],
          checkWebsite: [(v) => vm.checkWebsite(v)],
          checkPhone: [(v) => vm.checkPhone(v)],
          numberField: [(v) => (!!v && typeof v == 'number') || "Maydon faqat son qabul qiladi"]
        }
    }),
    methods: {
      nextStep(e) {
        if (e.form.validate()) {
          this.formLoading = true;
          setTimeout(() => {
            this.formLoading = false;
            this.formStep = e.step;
            this.form = {...this.form, ...e.data};
            e.form.reset();
          }, 1000)
        }
      },
      checkMinMaxLen(val, minLen, maxLen) {
        return (!!val && String(val).length >= minLen && String(val).length <= maxLen) ||
              `Maydon qiymati uzunligi ${minLen} va ${maxLen} oralig'ida bo'lishi kerak`;
      },
      checkWebsite(val) {
        const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

        return (!!val && !!val.match(new RegExp(reg))) || "Websayt kiritmadingiz";
      },
      checkPhone(val) {
        const reg = /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/
        return (!!val && !!val.match(new RegExp(reg))) || "Telefon nomeri xato kiritilgan";
      }
    }
}
</script>

<style scoped>
.search-btn {
    height: 39px !important;
    background-color: rgb(24, 103, 192) !important;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
</style>
<style>
.v-icon.v-icon {
  font-size: 26px!important;
}

.v-icon.mdi-close {
  font-size: 24px!important;
}
</style>