import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';
import * as strings from 'MyTextBoxWebPartStrings';
import MyTextBox from './components/MyTextBox';
import { IMyTextBoxProps } from './components/IMyTextBoxProps';
import { MyWebPartBase, IMyWebPartBaseProps } from '../MyWebPartBase';
import ConnectHelper from '../../app/ConnectHelper';

/** テキストボックス表示Webパーツプロパティ */
export interface IMyTextBoxWebPartProps extends IMyWebPartBaseProps {
  /** 接続先WebパーツのインスタンスID */
  connectTo : string;
}

/** テキストボックス表示Webパーツ */
export default class MyTextBoxWebPart extends MyWebPartBase<IMyTextBoxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMyTextBoxProps > = React.createElement(
      MyTextBox,
      {
        title: this.properties.title,
        connectTo : this.properties.connectTo
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** Webパーツのタイトルを返却 */
  public getTitle() : string {
    return this.properties.title;
  }

  /** 接続元Webパーツから値を受け付ける */
  public flushValue() {
    
  }

  /** 保管されているWebパーツの一覧を取得し、ドロップダウンの選択肢を作成 */
  private getSavedWebparts() : IPropertyPaneDropdownOption[]
  {
    let options : IPropertyPaneDropdownOption[] = [];

    let savedWebparts = ConnectHelper.getWebpartTitles(this);
    if(savedWebparts && savedWebparts.length > 0)
    {
      savedWebparts.forEach((val) => {
        options.push({ key : val.instanceId, text : val.title });
      });
    }

    return options;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneTitle
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneDropdown('connectTo', {
                  label : strings.ConnectToFieldLabel,
                  options : this.getSavedWebparts()
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
