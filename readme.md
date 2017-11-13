# Tac App Builder
Tac, as part of Tic-Tac-Toe offering, is the app client that interacts with cloud (Tic) and embedded (Toe) systems.  Leveraging powerful mobile phonhe OSes today, you can present rich information about the IOT service you're trying to build.

## Basics
Tac is usually built with hybrid app architecture.  It's a simple and fast way to build app thesedays.  The UI could be made with matured web/HTML5 technologies.  The native layer could be programmed natively or rely on frameworks such as Apache Cordova.

## Installation
### Prerequisite
nodejs: v4.2.6
npm: v3.5.2

### Steps
`git clone https://github.com/t2t-io/tac-builder.git`

`cd tac-builder`

`npm install`

### Usage
You can define your app screen/page flow in yaml or Excel(tm) sheet. 

#### YAML definition

sample YAML definition

```
---
- id: s01
  footer: s01 footer
  content:
    - type: raw
      text: <h1> page content here
    - type: raw
      text: <h4> another line below
    - type: button
      text: click me
      link: s02
- id: s02
  header: s02
  footer: s02
  content:
    - type: button
      text: click me
      link: s01
    - type: raw
      text: <p><a href="#s01" class="ui-btn ui-shadow ui-corner-all" data-rel="dialog" data-transition="pop">Show page S01 as "popup" (as a dialog)</a></p>
```

Then you can issue following command to generate the html page for your app:
`node index.js YAML_FILE > index.html`

Try to open the `index.html` with any browser, you can see the generated single page app.


### Excel definition
You can use your spreadsheet program to create a screen/page definition sheet like following:

![](tac_sheet_example.jpg)

Save it and then issue following command to generate the YAML definition.  Then you can feed it to `index.js` as shown in last step.
`node xlsx2yaml XLSX_FILE > OUTPUT.yaml`
