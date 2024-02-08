# NestJS Logger Bolierplate

- libs : nest-winston, winston, winston-daily-rotate-file

## NestJS Request LifeCycle

![lifecycle](https://velog.velcdn.com/images%2Fharon%2Fpost%2Fe2587453-9aa2-4f2d-9ae4-0c8c024ed42f%2Fimage.png)

```mermaid
graph TD
  subgraph Middlewares
    GlobalMiddlewares(Global Middlewares) --> ModuleMiddlewares(Module Middlewares)
  end

  subgraph ExceptionFilters["Exception Filters"]
    subgraph Guards
      GlobalGuards(Global Guards) --> ControllerGuards(Controller Guards) --> RouteGuards(Route Guards)
    end

    subgraph PreInterceptors["Interceptors(pre-controller)"]
      GlobalPreInterceptors(Global Interceptors) --> ControllerPreInterceptors(Controller Interceptors) --> RoutePreInterceptors(Route Interceptors)
    end

    subgraph Pipes
      GlobalPipes(Global Pipes) --> ControllerPipes(Controller Pipes) --> RoutePipes(Route Pipes) --> RouteParamPipes(Route Parameter Pipes)
    end

    subgraph Handlers
      Controller(Controller) --> Service("Service(if exist)")
    end

    subgraph PostInterceptors["Interceptors(post-request)"]
      GlobalPostInterceptors(Global Interceptors) --> ControllerPostInterceptors(Controller Interceptors) --> RoutePostInterceptors(Route Interceptors)
    end

    subgraph Filters
      RouteFilters(Route Filters) --> ControllerFilters(Controller Filters) --> GlobalFilters(Global Filters)
    end
  end

  IncomingRequest(Incoming Request) --> Middlewares --> ExceptionFilters --> Response(Server Response)
  Guards --> PreInterceptors --> Pipes --> Handlers --> PostInterceptors --> Filters

  style ExceptionFilters fill:#0000001a,stroke-dasharray

```

## elk-docker

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
