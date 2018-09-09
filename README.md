# connect-webpart
SPFx sample code that connect a webpart to anothor webpart

## purpose
Using <a href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-data" target="_blank">dynamic data</a>,we can connect two or more sharepoint components.<br />
But the dynamic data capability is currently in preview...<br />
So, i tried to connect two web parts in another way.

## method
I tried to save my web parts instance in a global variable.
at least, this works.
but this is not the best way because global variable is affected by another javascript code.

if released, we can use dynamic data capability instead.

## screenshot
<figure>
<img alt="connectedWebparts" src="https://github.com/MickNabewata/connect-webpart/wiki/images/connectedTwoWebparts.jpg" style="max-width:50%;" />
<figcaption>Connected two web parts</figcaption>
</figure>
<figure>
<img alt="propertypane" src="https://github.com/MickNabewata/connect-webpart/wiki/images/propetypane.jpg" style="max-width:50%;" />
<figcaption>Propety pane to choice connect target</figcaption>
</figure>