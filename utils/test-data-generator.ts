// // utils/test-data-generator.ts
// import { faker } from '@faker-js/faker';

// export class TestDataGenerator {
//   /**
//    * Generate user data
//    */
//   static generateUser(overrides: Partial<any> = {}): any {
//     const firstName = overrides.firstName || faker.person.firstName();
//     const lastName = overrides.lastName || faker.person.lastName();

//     return {
//       firstName,
//       lastName,
//       username: overrides.username || faker.internet.userName({ firstName, lastName }),
//       email: overrides.email || faker.internet.email({ firstName, lastName }),
//       password: overrides.password || faker.internet.password({ length: 10 }),
//       phone: overrides.phone || faker.phone.number(),
//       address: {
//         street: overrides.street || faker.location.streetAddress(),
//         city: overrides.city || faker.location.city(),
//         state: overrides.state || faker.location.state(),
//         zipCode: overrides.zipCode || faker.location.zipCode(),
//         country: overrides.country || faker.location.country()
//       }
//     };
//   }

//   /**
//    * Generate payment data
//    */
//   static generatePaymentInfo(overrides: Partial<any> = {}): any {
//     return {
//       cardType: overrides.cardType || faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express']),
//       cardNumber: overrides.cardNumber || faker.finance.creditCardNumber(),
//       cardName: overrides.cardName || faker.person.fullName(),
//       expiryDate: overrides.expiryDate || faker.date.future().toISOString().split('T')[0],
//       cvv: overrides.cvv || faker.finance.creditCardCVV()
//     };
//   }

//   /**
//    * Generate product data
//    */
//   static generateProduct(overrides: Partial<any> = {}): any {
//     return {
//       id: overrides.id || faker.string.uuid(),
//       name: overrides.name || faker.commerce.productName(),
//       description: overrides.description || faker.commerce.productDescription(),
//       price: overrides.price || parseFloat(faker.commerce.price()),
//       category: overrides.category || faker.commerce.department(),
//       quantity: overrides.quantity || faker.number.int({ min: 1, max: 100 })
//     };
//   }

//   /**
//    * Generate multiple products
//    */
//   static generateProducts(count: number, overrides: Partial<any> = {}): any[] {
//     const products = [];
//     for (let i = 0; i < count; i++) {
//       products.push(this.generateProduct(overrides));
//     }
//     return products;
//   }

//   /**
//    * Generate form data for specific forms
//    */
//   static generateFormData(formType: 'checkout' | 'registration' | 'contact', overrides: Partial<any> = {}): any {
//     switch (formType) {
//       case 'checkout':
//         return {
//           firstName: overrides.firstName || faker.person.firstName(),
//           lastName: overrides.lastName || faker.person.lastName(),
//           address: overrides.address || faker.location.streetAddress(),
//           city: overrides.city || faker.location.city(),
//           zipCode: overrides.zipCode || faker.location.zipCode(),
//           email: overrides.email || faker.internet.email(),
//           phone: overrides.phone || faker.phone.number()
//         };

//       case 'registration':
//         return {
//           username: overrides.username || faker.internet.userName(),
//           email: overrides.email || faker.internet.email(),
//           password: overrides.password || faker.internet.password(),
//           confirmPassword: overrides.confirmPassword || overrides.password || faker.internet.password(),
//           acceptTerms: overrides.acceptTerms !== undefined ? overrides.acceptTerms : true
//         };

//       case 'contact':
//         return {
//           name: overrides.name || faker.person.fullName(),
//           email: overrides.email || faker.internet.email(),
//           subject: overrides.subject || faker.lorem.sentence(),
//           message: overrides.message || faker.lorem.paragraph()
//         };

//       default:
//         return {};
//     }
//   }
// }

// utils/test-data-generator.ts
import { faker } from "@faker-js/faker";

export class TestDataGenerator {
  /**
   * Generate user data
   */
  static generateUser(overrides: Partial<any> = {}): any {
    const firstName = overrides.firstName || faker.person.firstName();
    const lastName = overrides.lastName || faker.person.lastName();

    return {
      firstName,
      lastName,
      username:
        overrides.username || faker.internet.userName({ firstName, lastName }),
      email: overrides.email || faker.internet.email({ firstName, lastName }),
      password: overrides.password || faker.internet.password({ length: 10 }),
      phone: overrides.phone || faker.phone.number(),
      address: {
        street: overrides.street || faker.location.streetAddress(),
        city: overrides.city || faker.location.city(),
        state: overrides.state || faker.location.state(),
        zipCode: overrides.zipCode || faker.location.zipCode(),
        country: overrides.country || faker.location.country(),
      },
    };
  }

  /**
   * Generate payment data
   */
  static generatePaymentInfo(overrides: Partial<any> = {}): any {
    return {
      cardType:
        overrides.cardType ||
        faker.helpers.arrayElement(["Visa", "Mastercard", "American Express"]),
      cardNumber: overrides.cardNumber || faker.finance.creditCardNumber(),
      cardName: overrides.cardName || faker.person.fullName(),
      expiryDate:
        overrides.expiryDate || faker.date.future().toISOString().split("T")[0],
      cvv: overrides.cvv || faker.finance.creditCardCVV(),
    };
  }

  /**
   * Generate product data
   */
  static generateProduct(overrides: Partial<any> = {}): any {
    return {
      id: overrides.id || faker.string.uuid(),
      name: overrides.name || faker.commerce.productName(),
      description: overrides.description || faker.commerce.productDescription(),
      price: overrides.price || parseFloat(faker.commerce.price()),
      category: overrides.category || faker.commerce.department(),
      quantity: overrides.quantity || faker.number.int({ min: 1, max: 100 }),
    };
  }

  /**
   * Generate multiple products
   */
  static generateProducts(count: number, overrides: Partial<any> = {}): any[] {
    const products = [];
    for (let i = 0; i < count; i++) {
      products.push(this.generateProduct(overrides));
    }
    return products;
  }

  /**
   * Generate form data for specific forms
   */
  static generateFormData(
    formType: "checkout" | "registration" | "contact",
    overrides: Partial<any> = {}
  ): any {
    switch (formType) {
      case "checkout":
        return {
          firstName: overrides.firstName || faker.person.firstName(),
          lastName: overrides.lastName || faker.person.lastName(),
          address: overrides.address || faker.location.streetAddress(),
          city: overrides.city || faker.location.city(),
          zipCode: overrides.zipCode || faker.location.zipCode(),
          email: overrides.email || faker.internet.email(),
          phone: overrides.phone || faker.phone.number(),
        };

      case "registration":
        return {
          username: overrides.username || faker.internet.userName(),
          email: overrides.email || faker.internet.email(),
          password: overrides.password || faker.internet.password(),
          confirmPassword:
            overrides.confirmPassword ||
            overrides.password ||
            faker.internet.password(),
          acceptTerms:
            overrides.acceptTerms !== undefined ? overrides.acceptTerms : true,
        };

      case "contact":
        return {
          name: overrides.name || faker.person.fullName(),
          email: overrides.email || faker.internet.email(),
          subject: overrides.subject || faker.lorem.sentence(),
          message: overrides.message || faker.lorem.paragraph(),
        };

      default:
        return {};
    }
  }
}
