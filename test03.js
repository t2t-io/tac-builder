var report = [
  {
    "address": "172.16.0.108",
    "classgroup": "Air conditioner-related device class group",
    "class": "Home air conditioner class",
    "instance": 1
  },
  {
    "address": "172.16.0.108",
    "classgroup": "Housing/facility-related device class group",
    "class": "General lighting class class",
    "instance": 1
  },
  {
    "address": "172.16.0.108",
    "classgroup": "Housing/facility-related device class group",
    "class": "Electrically operated blind/shade class",
    "instance": 1
  },
  {
    "address": "172.16.0.108",
    "classgroup": "Sensor-related device class group",
    "class": "Temperature sensor class",
    "instance": 1
  }
]

var templateHead = '<ul data-role="listview" data-inset="true">'
var templateBody = `
<li data-role="list-divider">Appliance found </li>
<li><a href="#">
    <h2>{{class}}</h2>
    <p> part of {{classgroup}}</p>
    <p> connected to {{address}} </p>
    <p class="ui-li-aside"><strong>{{instance}}</strong></p>
    </a>
</li>
`

var outs = ''
outs+=templateHead
report.forEach(o){
	outs+=templateBody.replace('{{class}}', o.class)
}

$("#el-list").append(outs)