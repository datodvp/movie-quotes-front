import { configure } from 'vee-validate'
// import { localize, setLocale } from "@vee-validate/i18n";
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

// // If we dont need to write custom messages we would simply configure it like this
// configure({
//   generateMessage: localize({
//     en,
//     ka,
//   }),
// });

// If we want to write Custom Error Messages then we have to overwrite some properties like this:
configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: 'This field is required',
        email: 'This input is not in email format',
        min: '{field} must have at least 0:{min} symbols',
        max: '{field} must have maximum 0:{max} symbols',
        confirmed: 'password confirmation must be exact',
        latin: '{field} must have lower latin characters and numbers.'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        min: '{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
        max: '{field} უნდა შეიცავდეს მაქსიმუმ 0:{max} სიმბოლოს',
        confirmed: 'ველი უნდა მეორდებოდეს ზუსტად',
        latin: '{field} უნდა შეიცავდეს დაბალი რეგისტრის სიმბოლოებს და რიცხვებს.'
      },
      names: {
        password: 'პაროლი',
        username: 'მომხმარებლის სახელი',
        email: 'მეილი'
      }
    }
  })
})

// setLocale("ka"); // with this function we can change the locale
