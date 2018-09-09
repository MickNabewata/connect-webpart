declare interface IMyCardWebPartStrings {
  PropertyPaneTitle: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
}

declare module 'MyCardWebPartStrings' {
  const strings: IMyCardWebPartStrings;
  export = strings;
}
