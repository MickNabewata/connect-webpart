import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

export interface IMyWebPartBaseProps {
  title: string;
}

/** Webパーツ基底クラス */
export abstract class MyWebPartBase<T extends IMyWebPartBaseProps> extends BaseClientSideWebPart<T> {

  /** Webパーツのタイトルを返却するメソッドの実装を義務付ける */
  public abstract getTitle() : string;

  /** 接続元Webパーツから値を受け付けるためのメソッドの実装を義務付ける */
  public abstract flushValue(value : string) : void;
}
