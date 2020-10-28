Azure DevOps <-> LucidChart Markdown Viewer
===========================================

This userscript allows you to embed LucidChart charts into Markdown inside Azure DevOps by using some HTML.

Note this requires a Userscript provider such as Tampermonkey. Also this is very rudimentary and only supports on page load, and doesn't (currently) support switching between tabs such as "History" back to "Preview".

```
<div class="aside lucidchart-userscript">
id: b3a3213a-a23f-c927a-9151-30369351ed7b
width: 640
height: 480

<b><a href="https://github.com/ElvenSpellmaker/AzureDevOpsLucidchartMdViewer/raw/master/index.user.js">Please install the lucidchart Userscript!</a></b>
</div>
```

The minimal HTML to trigger the plug-in is:
```
<div class="aside lucidchart-userscript">
id: b3a3213a-a23f-c927a-9151-30369351ed7b
</div>
```
