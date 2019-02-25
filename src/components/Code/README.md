#### 基本使用

table样式

``` js
const code = {
  '@timestamp': '2017-12-27T19:38:39+08:00',
  'input_name': 'sensor_input',
  'input_type': 'sensor',
  'data': '10.10.169.184',
  'data_type': 'ip',
  'behave_uuid': 'sensor-1273069213273718',
  'input_uuid': '1514374719-sensor-93579900-80545624',
  'machine': '10.9.154.22',
  'time': 1514374719,
  'input_time': 1514374719,
  'related_ip': '10.10.169.184',
  'source_ip': '10.9.154.22',
  'event_type': 'net',
  'net': {
    'src_ip': '10.9.154.22',
    'src_port': 42065,
    'dest_ip': '10.10.169.184',
    'dest_port': 1514,
    'proto': 'UDP',
    'type': 'flow',
    'flow': {
      'app_proto': 'failed',
      'pkts_toserver': 1,
      'bytes_toserver': 478,
      'state': 'new'
    }
  }
};
<Code data={code}/>
```

json样式

``` js
const code = {
  '@timestamp': '2017-12-27T19:38:39+08:00',
  'input_name': 'sensor_input',
  'input_type': 'sensor',
  'data': '10.10.169.184',
  'data_type': 'ip',
  'behave_uuid': 'sensor-1273069213273718',
  'input_uuid': '1514374719-sensor-93579900-80545624',
  'machine': '10.9.154.22',
  'time': 1514374719,
  'input_time': 1514374719,
  'related_ip': '10.10.169.184',
  'source_ip': '10.9.154.22',
  'event_type': 'net',
  'net': {
    'src_ip': '10.9.154.22',
    'src_port': 42065,
    'dest_ip': '10.10.169.184',
    'dest_port': 1514,
    'proto': 'UDP',
    'type': 'flow',
    'flow': {
      'app_proto': 'failed',
      'pkts_toserver': 1,
      'bytes_toserver': 478,
      'state': 'new'
    }
  }
};
<Code data={code} type="json"/>
```