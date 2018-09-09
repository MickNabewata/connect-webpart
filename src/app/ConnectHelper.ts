import { MyWebPartBase, IMyWebPartBaseProps } from '../webparts/MyWebPartBase';

/** Webパーツ接続ヘルパクラス */
export default class ConnectHelper
{
    /** 指定のキーを除いて接続可能なWebパーツのタイトルとインスタンスIDをすべて取得します。 */
    public static getWebpartTitles<T extends IMyWebPartBaseProps>(except? : MyWebPartBase<T>) : WebPartInfo[]
    {
        let webPartsInfo : WebPartInfo[] = [];

        let savedWebparts : SavedWebpart[] = this.getFromGlobal();
        if(savedWebparts && savedWebparts.length > 0)
        {
            savedWebparts.forEach((val) => {
                if(val)
                {
                    if(val.instanceId != except.instanceId)
                    {
                        webPartsInfo.push({ instanceId : val.instanceId, title : val.webPart.getTitle() });
                    }
                }
            });
        }

        return webPartsInfo;
    }

    /** インスタンスIDをキーに接続可能なWebパーツを1つ取得します。 */
    public static getWebpartInstance(instanceId : string) : MyWebPartBase<IMyWebPartBaseProps>
    {
        let webPart : MyWebPartBase<IMyWebPartBaseProps> = undefined;

        let savedWebparts : SavedWebpart[] = this.getFromGlobal();
        if(savedWebparts && savedWebparts.length > 0)
        {
            let webParts = savedWebparts.filter(val => val.instanceId == instanceId);
            if(webParts && webParts.length > 0)
            {
                webPart = webParts[0].webPart;
            }
        }

        return webPart;
    }

    /** Webパーツを他のWebパーツから接続できるように保存します。 */
    public static saveWebpart<T extends IMyWebPartBaseProps>(webPart : MyWebPartBase<T>)
    {
        let savedWebparts : SavedWebpart[] = ConnectHelper.getFromGlobal();
        if(savedWebparts && savedWebparts.length > 0)
        {
            let exists = savedWebparts.some((val, idx) => {
                if(val.instanceId == webPart.instanceId)
                {
                    savedWebparts[idx] = { instanceId : webPart.instanceId, webPart : webPart };
                    exists = true;
                    return true;
                }
            });
            if(exists == false)
            {
                savedWebparts.push({ instanceId : webPart.instanceId, webPart : webPart });
            }
        }
        else
        {
            savedWebparts = [{ instanceId : webPart.instanceId, webPart : webPart }];
        }

        ConnectHelper.saveToGlobal(savedWebparts);
    }

    /** 保管されているWebパーツを削除します。 */
    public static removeWebpart<T extends IMyWebPartBaseProps>(webPart : MyWebPartBase<T>)
    {
        let savedWebparts : SavedWebpart[] = ConnectHelper.getFromGlobal();
        if(savedWebparts && savedWebparts.length > 0)
        {
            savedWebparts.some((val, idx) => {
                if(val.instanceId == webPart.instanceId)
                {
                    savedWebparts.splice(idx, 1);
                    return true;
                }
            });
        }
        ConnectHelper.saveToGlobal(savedWebparts);
    }

    private static saveToGlobal(data : SavedWebpart[])
    {
        (window as any).mySampleWebparts = data;
    }

    private static getFromGlobal() : SavedWebpart[]
    {
        return (window as any).mySampleWebparts;
    }
}

/** 保管するWebパーツ1つ分を表すインターフェース */
interface SavedWebpart {

    /** WebパーツのインスタンスID */
    instanceId : string;

    /** Webパーツクラスインスタンス */
    webPart : MyWebPartBase<IMyWebPartBaseProps>;

}

/** 保管されているWebパーツの情報1つ分を表すインターフェース */
export interface WebPartInfo {

    /** WebパーツのインスタンスID */
    instanceId : string;

    /** Webパーツのタイトル */
    title : string;

}