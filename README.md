# connect-webpart
SPFx sample code that connect a webpart to another webpart

## 英語が苦手な方へ
日本語の情報は以下にあります。  
<a href="https://www.micknabewata.com/entry/sharepoint/spfx/connect-webpart">SharePoint FrameworkでWebパーツ同士を結合するやり方</a>

## purpose
Using <a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-data" target="_blank">dynamic data</a>, we can connect two or more sharepoint components.

But the dynamic data capability is currently in preview...

So, i tried to connect two web parts in another way.

## method
I tried to save my web parts instance in a global variable.

at least, this works.

but this is not the best way because global variable is affected by another javascript code.

if released, we can use dynamic data capability instead.

## screenshot
### connected two web parts
<img alt="connectedWebparts" src="https://github.com/MickNabewata/connect-webpart/wiki/images/connectedTwoWebparts.jpg" width="60%" />

when user entered some text into text box, the same value will shown in card web parts.

### propety pane to choice connect target
<img alt="propertypane" src="https://github.com/MickNabewata/connect-webpart/wiki/images/propetypane.jpg" width="60%" />

connectTo property is choice field.

options is automatically created when user drop a card web parts and change its title property.
