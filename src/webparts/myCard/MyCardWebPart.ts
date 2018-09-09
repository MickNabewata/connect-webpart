import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'MyCardWebPartStrings';
import MyCard from './components/MyCard';
import { IMyCardProps } from './components/IMyCardProps';
import { MyWebPartBase, IMyWebPartBaseProps } from '../MyWebPartBase';
import ConnectHelper from '../../app/ConnectHelper';

/** カード表示Webパーツプロパティ */
export interface IMyCardWebPartProps extends IMyWebPartBaseProps {
}

/** カード表示Webパーツ */
export default class MyCardWebPart extends MyWebPartBase<IMyCardWebPartProps> {

  /** 接続元Webパーツから送信された値 */
  private _flushedValue : string;

  public render(): void {
    const element : React.ReactElement<IMyCardProps> = React.createElement(
      MyCard,
      {
        title: this.properties.title,
        text: this._flushedValue
      }
    );

    ReactDom.render(element, this.domElement);

    // 自分自身を接続可能なWebパーツとして保存
    ConnectHelper.saveWebpart(this);
  }

  /** Webパーツのタイトルを返却 */
  public getTitle() : string {
    return this.properties.title;
  }

  /** 接続元Webパーツから値を受け付ける */
  public flushValue(value : string) {
    this._flushedValue = value;
    this.render();
  }

  protected onDispose(): void {

    // 接続可能なWebパーツとして保管されている自身を削除
    ConnectHelper.removeWebpart(this);

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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
