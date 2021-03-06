var express = require('express')
var app = express()
var snmp = require('snmp-native')
let firebase = require('firebase')
var bodyParser = require('body-parser')
var path = require('path')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// var moment = require('moment')
var staticPath = path.join(__dirname, './dist')
app.use('/', express.static(staticPath))
var config = {
  apiKey: 'AIzaSyBe7u9FtZ5ATGU69hfd9NBbHiGCGreSWIM',
  authDomain: 'snmp-monitor-fitm.firebaseapp.com',
  databaseURL: 'https://snmp-monitor-fitm.firebaseio.com',
  projectId: 'snmp-monitor-fitm',
  storageBucket: 'snmp-monitor-fitm.appspot.com',
  messagingSenderId: '992008104190'
}
var devices = [{
  ip: '10.4.15.1',
  community: 'public',
  name: 'R415'
}, {
  ip: '10.77.5.1',
  community: 'public',
  name: 'SW4503'
}, {
  ip: '10.77.3.2',
  community: 'public',
  name: 'R330A'
}, {
  ip: '10.77.1.2',
  community: 'public',
  name: 'R124'
}, {
  ip: '10.77.7.2',
  community: 'public',
  name: 'R101C'
}]
var Info = []
firebase.initializeApp(config)
setInterval(() => {
  // Info = []
  devices.forEach(item => {
    getInfo(item)
  })
}, 5000)
// setInterval(() => {
//   devices.forEach(item => {
//     firebase.database().ref('/info/' + item.name).remove()
//   })
// }, 30000)
app.get('/info', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.send(Info)
})
app.post('/data', function (req, res) {
  console.log(req.body)
  let device = {
    ip: req.body.ip,
    community: req.body.community,
    name: req.body.name
  }
  devices.push(device)
})
app.post('/remove', function (req, res) {
  console.log(req.body.name)
  let indexInfo = Info.findIndex(item => item.name === req.body.name)
  if (indexInfo === -1) {
  } else {
    Info.splice(indexInfo, 1)
  }
  let indexInfo2 = devices.findIndex(item => item.name === req.body.name)
  if (indexInfo2 === -1) {
  } else {
    devices.splice(indexInfo2, 1)
  }
  firebase.database().ref('/info/' + req.body.name).remove()
})
function getInfo (device) {
  let info = {}
  // os
  let deviceNetwork = new snmp.Session({ host: device.ip, community: device.community })
  deviceNetwork.get({ oid: [1, 3, 6, 1, 2, 1, 1, 1, 0] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      info = {
        os: varbinds[0].value,
        name: device.name
      }
    }
  })
  // cpu
  deviceNetwork.get({ oid: [1, 3, 6, 1, 4, 1, 9, 9, 109, 1, 1, 1, 1, 5, 1] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      info.cpu = varbinds[0].value
    }
  })
  // temp
  deviceNetwork.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 9, 9, 13, 1, 3, 1, 3] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      info.temp = varbinds[0].value
    }
  })
  // inbound
  var inbound = []
  deviceNetwork.getSubtree({ oid: [1, 3, 6, 1, 2, 1, 2, 2, 1, 10] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      for (var index in varbinds) {
        let data = {
          indexOID: varbinds[index].oid[10],
          inbound: parseInt(varbinds[index].value / 1048576)
        }
        inbound.push(data)
      }
    }
  })
  // outbound
  let outbound = []
  deviceNetwork.getSubtree({ oid: [1, 3, 6, 1, 2, 1, 2, 2, 1, 16] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      for (var index in varbinds) {
        let data = {
          indexOID: varbinds[index].oid[10],
          outbound: parseInt(varbinds[index].value / 1048576)
        }
        outbound.push(data)
      }
    }
  })
  // status
  var status = []
  deviceNetwork.getSubtree({ oid: [1, 3, 6, 1, 2, 1, 2, 2, 1, 8] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      for (var index in varbinds) {
        if (varbinds[index].value === 1) {
          status.push('Up')
        } else if (varbinds[index].value === 2) {
          status.push('Down')
        } else {
          status.push('')
        }
      }
    }
  })
  // name interface
  var sumInbound = 0
  var sumOutbound = 0
  deviceNetwork.getSubtree({ oid: [1, 3, 6, 1, 2, 1, 2, 2, 1, 2] }, function (err, varbinds) {
    if (err) {
      console.log(err)
    } else {
      if ((inbound.length !== 0) && (outbound.length !== 0) && (status.length !== 0)) {
        info.interface = []
        info.inbound = ''
        info.outbound = ''
        for (var index in varbinds) {
          for (var i in inbound) {
            if (varbinds[index].oid[10] === inbound[i].indexOID) {
              sumInbound += inbound[i].inbound
              sumOutbound += outbound[i].outbound
              let data = {
                interface: varbinds[index].value,
                status: status[index],
                inbound: inbound[i].inbound,
                outbound: outbound[i].outbound
              }
              info.interface.push(data)
            }
          }
        }
        info.inbound = sumInbound
        info.outbound = sumOutbound
        let indexInfo = Info.findIndex(item => item.name === device.name)
        if (indexInfo === -1) {
          Info.push(info)
          console.log(indexInfo)
        } else {
          Info.splice(indexInfo, 1, info)
        }
        firebase.database().ref('/info/' + device.name).update(info)
        // firebase.database().ref('/info/' + device.name).push(info)
        deviceNetwork.close()
      }
    }
  })
}
app.listen('3777', function () {
  console.log('run at port')
})
