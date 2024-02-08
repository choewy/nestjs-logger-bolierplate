# ElasticSearch Practice

- Server : Nest.js
- Logger : Winston(json format)
- ElasticSearch : 8.11.4
- LogStash : 8.11.4
- Kibana : 8.11.4

## Docker

```conf
# filepath : docker/.env

ELASTIC_VERSION = 8.11.4
ELASTIC_PASSWORD = pwd-elastic
LOGSTASH_INTERNAL_PASSWORD = pwd-logstash
KIBANA_SYSTEM_PASSWORD = pwd-kibana
METRICBEAT_INTERNAL_PASSWORD = pwd-metricbeat
FILEBEAT_INTERNAL_PASSWORD = pwd-filebeat
HEARTBEAT_INTERNAL_PASSWORD = pwd-heartbeat
MONITORING_INTERNAL_PASSWORD = pwd-monitoring
BEATS_SYSTEM_PASSWORD = pwd-beats
```

```bash
cd docker

docker-compose up setup
docker-compose up -d
```

- elk : 9200
- logstash : 5044
- kibana : 5601
