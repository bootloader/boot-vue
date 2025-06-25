import { createI18n } from "vue-i18n";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

import ar from "@vee-validate/i18n/dist/locale/ar.json";
import en from "@vee-validate/i18n/dist/locale/en.json";

const i18nConfig = {
  legacy: false, // use Composition API mode
  locale: "en",
  fallbackLocale: "en",
  messages: {
    ar: {
      fields: {
        email: "البريد الاليكتروني",
        password: "كلمة السر",
      },
      validation: ar.messages,
    },
    en: {
      fields: {
        email: "E-mail",
        name: "Name",
        phone: "Phone",
        company: "Company Name",
        country: "Country",
        role: "Role",
        password: "Password",
      },
      validation: en.messages,
      errors: {
        NotNull: "The {_field_} is required",
        ValidPhone: "Enter valid {_field_} eg +91 XXXXX XXXXX",
        ValidPhonesPerLine:
          "Enter valid mobile number eg 91XXXXXXXXXX per line",
        ValidEmail: "Enter valid email address eg you@company.com",
        ValidURL:
          "Enter valid URL address eg https://company.com/some/path/to_file",
        Pattern: "Enter valid {_field_}",
        LessVariable: "Insufficent number of variables in {_field_}",
        ExtraVariable: "More than allowed variables in {_field_}",
        InvalidVariable: "Invalid variables in {_field_}",
        InvalidVariableSeq: "Invalid variables sequence in {_field_}",
        PositionVariable: "Invalid position of variables in {_field_}",
      },
    },
  },
};

const i18n = createI18n(i18nConfig);

// Configure vee-validate to use i18n translation
configure({
  generateMessage: localize({
    en,
    ar,
  }),
  validateOnInput: true,
});

export { i18n };

/*

Composition API>>
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t } = useI18n()
    return {
      label: t('fields.email'),
    }
  },
}


Template>>
<p>{{ $t('fields.password') }}</p>


In any .js file >>
import { i18n } from '@common/services/i18n'

const message = i18n.global.t('greeting', { name: 'Vijay' })
console.log(message) // "Hello Vijay"

*/
