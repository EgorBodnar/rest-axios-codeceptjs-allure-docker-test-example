/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    // eslint-disable-next-line no-use-before-define
    I: I;
    current: any;
  }

  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
