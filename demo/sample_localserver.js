/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // this.receivedEvent('deviceready');
        var zeroconf = cordova.plugins.zeroconf;
        // zeroconf.registerAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)
        // zeroconf.watchAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)
        zeroconf.watch('_toe._tcp.', 'local.', function(result) {
            var action = result.action;
            var service = result.service;
            if (action == 'added') {
                console.log('service added', service);
            } else if (action == 'resolved') {
                console.log('service resolved', service);
                $('#el-scan').text(service.ipv4Addresses[0] + ':' +service.port);
                // app.server = {'ip': service.ipv4Addresses[0], 'port':service.port};
                    $.get('http://'+service.ipv4Addresses[0]+':'+service.port, (report)=>{

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

                    report.forEach((o) => {
                        var body = templateBody
                        body = body.replace('{{class}}', o.class)
                        body = body.replace('{{classgroup}}', o.classgroup)
                        body = body.replace('{{address}}', o.address)
                        body = body.replace('{{instance}}', o.instance)
                        outs+=body
                    })

                    $("#el-list").append(outs)

                })

            } else {
                console.log('service removed', service);
            }
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();