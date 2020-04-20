/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Language, } from "@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher";
import { RouterHistory, } from "@stencil/router";
import { Question, } from "./global/questions";
export namespace Components {
    interface AppRoot {
    }
    interface ConnectTranslations {
        "changedLanguageHandler": (language: Language) => Promise<void>;
    }
    interface IaAnswersTable {
        "answers": any;
    }
    interface IaCallToAction {
        "type": "OPEN_SOURCE" | "WIDGET";
    }
    interface IaDataPrivacy {
        "history": RouterHistory;
    }
    interface IaDisclaimer {
    }
    interface IaFaq {
        "history": RouterHistory;
    }
    interface IaImprint {
        "history": RouterHistory;
    }
    interface IaInputMultipleChoice {
        "question": Question;
    }
    interface IaInputPostalCode {
        "question": Question;
    }
    interface IaInputRadio {
        "currentSelection": any;
        "question": Question;
    }
    interface IaLegal {
        "history": RouterHistory;
    }
    interface IaLogoBih {
    }
    interface IaLogoBmg {
    }
    interface IaLogoBzga {
    }
    interface IaLogoCharite {
    }
    interface IaLogoComponent {
        "classes"?: string;
    }
    interface IaLogoD4l {
    }
    interface IaLogoHeader {
    }
    interface IaLogoOpenSource {
    }
    interface IaLogoRki {
    }
    interface IaLogoWidget {
    }
    interface IaNavigationHeader {
        "classes": string;
        "handleClick": EventListener;
        "hasBackButton": boolean;
        "headline": string;
    }
    interface IaQrCode {
        "answers": any;
        "resultCase": number;
    }
    interface IaQuestionnaire {
        "history": RouterHistory;
    }
    interface IaRecommendation {
        "resultCase": number;
    }
    interface IaStart {
    }
    interface IaSummary {
        "history": RouterHistory;
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLConnectTranslationsElement extends Components.ConnectTranslations, HTMLStencilElement {
    }
    var HTMLConnectTranslationsElement: {
        prototype: HTMLConnectTranslationsElement;
        new (): HTMLConnectTranslationsElement;
    };
    interface HTMLIaAnswersTableElement extends Components.IaAnswersTable, HTMLStencilElement {
    }
    var HTMLIaAnswersTableElement: {
        prototype: HTMLIaAnswersTableElement;
        new (): HTMLIaAnswersTableElement;
    };
    interface HTMLIaCallToActionElement extends Components.IaCallToAction, HTMLStencilElement {
    }
    var HTMLIaCallToActionElement: {
        prototype: HTMLIaCallToActionElement;
        new (): HTMLIaCallToActionElement;
    };
    interface HTMLIaDataPrivacyElement extends Components.IaDataPrivacy, HTMLStencilElement {
    }
    var HTMLIaDataPrivacyElement: {
        prototype: HTMLIaDataPrivacyElement;
        new (): HTMLIaDataPrivacyElement;
    };
    interface HTMLIaDisclaimerElement extends Components.IaDisclaimer, HTMLStencilElement {
    }
    var HTMLIaDisclaimerElement: {
        prototype: HTMLIaDisclaimerElement;
        new (): HTMLIaDisclaimerElement;
    };
    interface HTMLIaFaqElement extends Components.IaFaq, HTMLStencilElement {
    }
    var HTMLIaFaqElement: {
        prototype: HTMLIaFaqElement;
        new (): HTMLIaFaqElement;
    };
    interface HTMLIaImprintElement extends Components.IaImprint, HTMLStencilElement {
    }
    var HTMLIaImprintElement: {
        prototype: HTMLIaImprintElement;
        new (): HTMLIaImprintElement;
    };
    interface HTMLIaInputMultipleChoiceElement extends Components.IaInputMultipleChoice, HTMLStencilElement {
    }
    var HTMLIaInputMultipleChoiceElement: {
        prototype: HTMLIaInputMultipleChoiceElement;
        new (): HTMLIaInputMultipleChoiceElement;
    };
    interface HTMLIaInputPostalCodeElement extends Components.IaInputPostalCode, HTMLStencilElement {
    }
    var HTMLIaInputPostalCodeElement: {
        prototype: HTMLIaInputPostalCodeElement;
        new (): HTMLIaInputPostalCodeElement;
    };
    interface HTMLIaInputRadioElement extends Components.IaInputRadio, HTMLStencilElement {
    }
    var HTMLIaInputRadioElement: {
        prototype: HTMLIaInputRadioElement;
        new (): HTMLIaInputRadioElement;
    };
    interface HTMLIaLegalElement extends Components.IaLegal, HTMLStencilElement {
    }
    var HTMLIaLegalElement: {
        prototype: HTMLIaLegalElement;
        new (): HTMLIaLegalElement;
    };
    interface HTMLIaLogoBihElement extends Components.IaLogoBih, HTMLStencilElement {
    }
    var HTMLIaLogoBihElement: {
        prototype: HTMLIaLogoBihElement;
        new (): HTMLIaLogoBihElement;
    };
    interface HTMLIaLogoBmgElement extends Components.IaLogoBmg, HTMLStencilElement {
    }
    var HTMLIaLogoBmgElement: {
        prototype: HTMLIaLogoBmgElement;
        new (): HTMLIaLogoBmgElement;
    };
    interface HTMLIaLogoBzgaElement extends Components.IaLogoBzga, HTMLStencilElement {
    }
    var HTMLIaLogoBzgaElement: {
        prototype: HTMLIaLogoBzgaElement;
        new (): HTMLIaLogoBzgaElement;
    };
    interface HTMLIaLogoChariteElement extends Components.IaLogoCharite, HTMLStencilElement {
    }
    var HTMLIaLogoChariteElement: {
        prototype: HTMLIaLogoChariteElement;
        new (): HTMLIaLogoChariteElement;
    };
    interface HTMLIaLogoComponentElement extends Components.IaLogoComponent, HTMLStencilElement {
    }
    var HTMLIaLogoComponentElement: {
        prototype: HTMLIaLogoComponentElement;
        new (): HTMLIaLogoComponentElement;
    };
    interface HTMLIaLogoD4lElement extends Components.IaLogoD4l, HTMLStencilElement {
    }
    var HTMLIaLogoD4lElement: {
        prototype: HTMLIaLogoD4lElement;
        new (): HTMLIaLogoD4lElement;
    };
    interface HTMLIaLogoHeaderElement extends Components.IaLogoHeader, HTMLStencilElement {
    }
    var HTMLIaLogoHeaderElement: {
        prototype: HTMLIaLogoHeaderElement;
        new (): HTMLIaLogoHeaderElement;
    };
    interface HTMLIaLogoOpenSourceElement extends Components.IaLogoOpenSource, HTMLStencilElement {
    }
    var HTMLIaLogoOpenSourceElement: {
        prototype: HTMLIaLogoOpenSourceElement;
        new (): HTMLIaLogoOpenSourceElement;
    };
    interface HTMLIaLogoRkiElement extends Components.IaLogoRki, HTMLStencilElement {
    }
    var HTMLIaLogoRkiElement: {
        prototype: HTMLIaLogoRkiElement;
        new (): HTMLIaLogoRkiElement;
    };
    interface HTMLIaLogoWidgetElement extends Components.IaLogoWidget, HTMLStencilElement {
    }
    var HTMLIaLogoWidgetElement: {
        prototype: HTMLIaLogoWidgetElement;
        new (): HTMLIaLogoWidgetElement;
    };
    interface HTMLIaNavigationHeaderElement extends Components.IaNavigationHeader, HTMLStencilElement {
    }
    var HTMLIaNavigationHeaderElement: {
        prototype: HTMLIaNavigationHeaderElement;
        new (): HTMLIaNavigationHeaderElement;
    };
    interface HTMLIaQrCodeElement extends Components.IaQrCode, HTMLStencilElement {
    }
    var HTMLIaQrCodeElement: {
        prototype: HTMLIaQrCodeElement;
        new (): HTMLIaQrCodeElement;
    };
    interface HTMLIaQuestionnaireElement extends Components.IaQuestionnaire, HTMLStencilElement {
    }
    var HTMLIaQuestionnaireElement: {
        prototype: HTMLIaQuestionnaireElement;
        new (): HTMLIaQuestionnaireElement;
    };
    interface HTMLIaRecommendationElement extends Components.IaRecommendation, HTMLStencilElement {
    }
    var HTMLIaRecommendationElement: {
        prototype: HTMLIaRecommendationElement;
        new (): HTMLIaRecommendationElement;
    };
    interface HTMLIaStartElement extends Components.IaStart, HTMLStencilElement {
    }
    var HTMLIaStartElement: {
        prototype: HTMLIaStartElement;
        new (): HTMLIaStartElement;
    };
    interface HTMLIaSummaryElement extends Components.IaSummary, HTMLStencilElement {
    }
    var HTMLIaSummaryElement: {
        prototype: HTMLIaSummaryElement;
        new (): HTMLIaSummaryElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "connect-translations": HTMLConnectTranslationsElement;
        "ia-answers-table": HTMLIaAnswersTableElement;
        "ia-call-to-action": HTMLIaCallToActionElement;
        "ia-data-privacy": HTMLIaDataPrivacyElement;
        "ia-disclaimer": HTMLIaDisclaimerElement;
        "ia-faq": HTMLIaFaqElement;
        "ia-imprint": HTMLIaImprintElement;
        "ia-input-multiple-choice": HTMLIaInputMultipleChoiceElement;
        "ia-input-postal-code": HTMLIaInputPostalCodeElement;
        "ia-input-radio": HTMLIaInputRadioElement;
        "ia-legal": HTMLIaLegalElement;
        "ia-logo-bih": HTMLIaLogoBihElement;
        "ia-logo-bmg": HTMLIaLogoBmgElement;
        "ia-logo-bzga": HTMLIaLogoBzgaElement;
        "ia-logo-charite": HTMLIaLogoChariteElement;
        "ia-logo-component": HTMLIaLogoComponentElement;
        "ia-logo-d4l": HTMLIaLogoD4lElement;
        "ia-logo-header": HTMLIaLogoHeaderElement;
        "ia-logo-open-source": HTMLIaLogoOpenSourceElement;
        "ia-logo-rki": HTMLIaLogoRkiElement;
        "ia-logo-widget": HTMLIaLogoWidgetElement;
        "ia-navigation-header": HTMLIaNavigationHeaderElement;
        "ia-qr-code": HTMLIaQrCodeElement;
        "ia-questionnaire": HTMLIaQuestionnaireElement;
        "ia-recommendation": HTMLIaRecommendationElement;
        "ia-start": HTMLIaStartElement;
        "ia-summary": HTMLIaSummaryElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface ConnectTranslations {
        "onChangedLanguage"?: (event: CustomEvent<any>) => void;
    }
    interface IaAnswersTable {
        "answers"?: any;
    }
    interface IaCallToAction {
        "type"?: "OPEN_SOURCE" | "WIDGET";
    }
    interface IaDataPrivacy {
        "history"?: RouterHistory;
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaDisclaimer {
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaFaq {
        "history"?: RouterHistory;
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaImprint {
        "history"?: RouterHistory;
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaInputMultipleChoice {
        "onUpdateFormData"?: (event: CustomEvent<any>) => void;
        "question"?: Question;
    }
    interface IaInputPostalCode {
        "onUpdateFormData"?: (event: CustomEvent<any>) => void;
        "question"?: Question;
    }
    interface IaInputRadio {
        "currentSelection"?: any;
        "onUpdateFormData"?: (event: CustomEvent<any>) => void;
        "question"?: Question;
    }
    interface IaLegal {
        "history"?: RouterHistory;
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaLogoBih {
    }
    interface IaLogoBmg {
    }
    interface IaLogoBzga {
    }
    interface IaLogoCharite {
    }
    interface IaLogoComponent {
        "classes"?: string;
    }
    interface IaLogoD4l {
    }
    interface IaLogoHeader {
    }
    interface IaLogoOpenSource {
    }
    interface IaLogoRki {
    }
    interface IaLogoWidget {
    }
    interface IaNavigationHeader {
        "classes"?: string;
        "handleClick"?: EventListener;
        "hasBackButton"?: boolean;
        "headline"?: string;
    }
    interface IaQrCode {
        "answers"?: any;
        "resultCase"?: number;
    }
    interface IaQuestionnaire {
        "history"?: RouterHistory;
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaRecommendation {
        "resultCase"?: number;
    }
    interface IaStart {
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IaSummary {
        "history"?: RouterHistory;
        "onShowLogoHeader"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "connect-translations": ConnectTranslations;
        "ia-answers-table": IaAnswersTable;
        "ia-call-to-action": IaCallToAction;
        "ia-data-privacy": IaDataPrivacy;
        "ia-disclaimer": IaDisclaimer;
        "ia-faq": IaFaq;
        "ia-imprint": IaImprint;
        "ia-input-multiple-choice": IaInputMultipleChoice;
        "ia-input-postal-code": IaInputPostalCode;
        "ia-input-radio": IaInputRadio;
        "ia-legal": IaLegal;
        "ia-logo-bih": IaLogoBih;
        "ia-logo-bmg": IaLogoBmg;
        "ia-logo-bzga": IaLogoBzga;
        "ia-logo-charite": IaLogoCharite;
        "ia-logo-component": IaLogoComponent;
        "ia-logo-d4l": IaLogoD4l;
        "ia-logo-header": IaLogoHeader;
        "ia-logo-open-source": IaLogoOpenSource;
        "ia-logo-rki": IaLogoRki;
        "ia-logo-widget": IaLogoWidget;
        "ia-navigation-header": IaNavigationHeader;
        "ia-qr-code": IaQrCode;
        "ia-questionnaire": IaQuestionnaire;
        "ia-recommendation": IaRecommendation;
        "ia-start": IaStart;
        "ia-summary": IaSummary;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "connect-translations": LocalJSX.ConnectTranslations & JSXBase.HTMLAttributes<HTMLConnectTranslationsElement>;
            "ia-answers-table": LocalJSX.IaAnswersTable & JSXBase.HTMLAttributes<HTMLIaAnswersTableElement>;
            "ia-call-to-action": LocalJSX.IaCallToAction & JSXBase.HTMLAttributes<HTMLIaCallToActionElement>;
            "ia-data-privacy": LocalJSX.IaDataPrivacy & JSXBase.HTMLAttributes<HTMLIaDataPrivacyElement>;
            "ia-disclaimer": LocalJSX.IaDisclaimer & JSXBase.HTMLAttributes<HTMLIaDisclaimerElement>;
            "ia-faq": LocalJSX.IaFaq & JSXBase.HTMLAttributes<HTMLIaFaqElement>;
            "ia-imprint": LocalJSX.IaImprint & JSXBase.HTMLAttributes<HTMLIaImprintElement>;
            "ia-input-multiple-choice": LocalJSX.IaInputMultipleChoice & JSXBase.HTMLAttributes<HTMLIaInputMultipleChoiceElement>;
            "ia-input-postal-code": LocalJSX.IaInputPostalCode & JSXBase.HTMLAttributes<HTMLIaInputPostalCodeElement>;
            "ia-input-radio": LocalJSX.IaInputRadio & JSXBase.HTMLAttributes<HTMLIaInputRadioElement>;
            "ia-legal": LocalJSX.IaLegal & JSXBase.HTMLAttributes<HTMLIaLegalElement>;
            "ia-logo-bih": LocalJSX.IaLogoBih & JSXBase.HTMLAttributes<HTMLIaLogoBihElement>;
            "ia-logo-bmg": LocalJSX.IaLogoBmg & JSXBase.HTMLAttributes<HTMLIaLogoBmgElement>;
            "ia-logo-bzga": LocalJSX.IaLogoBzga & JSXBase.HTMLAttributes<HTMLIaLogoBzgaElement>;
            "ia-logo-charite": LocalJSX.IaLogoCharite & JSXBase.HTMLAttributes<HTMLIaLogoChariteElement>;
            "ia-logo-component": LocalJSX.IaLogoComponent & JSXBase.HTMLAttributes<HTMLIaLogoComponentElement>;
            "ia-logo-d4l": LocalJSX.IaLogoD4l & JSXBase.HTMLAttributes<HTMLIaLogoD4lElement>;
            "ia-logo-header": LocalJSX.IaLogoHeader & JSXBase.HTMLAttributes<HTMLIaLogoHeaderElement>;
            "ia-logo-open-source": LocalJSX.IaLogoOpenSource & JSXBase.HTMLAttributes<HTMLIaLogoOpenSourceElement>;
            "ia-logo-rki": LocalJSX.IaLogoRki & JSXBase.HTMLAttributes<HTMLIaLogoRkiElement>;
            "ia-logo-widget": LocalJSX.IaLogoWidget & JSXBase.HTMLAttributes<HTMLIaLogoWidgetElement>;
            "ia-navigation-header": LocalJSX.IaNavigationHeader & JSXBase.HTMLAttributes<HTMLIaNavigationHeaderElement>;
            "ia-qr-code": LocalJSX.IaQrCode & JSXBase.HTMLAttributes<HTMLIaQrCodeElement>;
            "ia-questionnaire": LocalJSX.IaQuestionnaire & JSXBase.HTMLAttributes<HTMLIaQuestionnaireElement>;
            "ia-recommendation": LocalJSX.IaRecommendation & JSXBase.HTMLAttributes<HTMLIaRecommendationElement>;
            "ia-start": LocalJSX.IaStart & JSXBase.HTMLAttributes<HTMLIaStartElement>;
            "ia-summary": LocalJSX.IaSummary & JSXBase.HTMLAttributes<HTMLIaSummaryElement>;
        }
    }
}
