import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as aplhaSpaces,
  email,
  min_value,
  max_value,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";
export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("aplha_spaces", aplhaSpaces);
    defineRule("email", email);
    defineRule("min_value", min_value);
    defineRule("max_value", max_value);
    defineRule("password_missmatched", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.Tield} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical character`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}`,
          country_excluded:
            "Due to restrictions, we do not accept users from this location.",
          password_missmatched: "The passwords don't match.",
          tos: "You must accept the Terms of Service.",
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `This field ${ctx.field} is invalid`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
