declare interface IMyTextBoxWebPartStrings {
  PropertyPaneTitle: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  ConnectToFieldLabel: string;
}

declare module 'MyTextBoxWebPartStrings' {
  const strings: IMyTextBoxWebPartStrings;
  export = strings;
}
