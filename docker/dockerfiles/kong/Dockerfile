FROM kong:2.3

COPY kong.yml /var/lib/kong/kong.yml
# COPY go-hello /usr/local/bin/go-hello

# Build time defaults
ARG build_KONG_DATABASE=off
# ARG build_KONG_PLUGINS=request-transformer,cors,key-auth,go-hello
ARG build_KONG_PLUGINS=request-transformer,cors,key-auth
ARG build_KONG_DECLARATIVE_CONFIG=/var/lib/kong/kong.yml

# Run time values
ENV KONG_DATABASE=$build_KONG_DATABASE
ENV KONG_PLUGINS=$build_KONG_PLUGINS
ENV KONG_DECLARATIVE_CONFIG=$build_KONG_DECLARATIVE_CONFIG
# ENV KONG_PLUGINSERVER_NAMES=go-hello
# ENV KONG_PLUGINSERVER_GO_HELLO_QUERY_CMD="/usr/local/bin/go-hello -dump"

EXPOSE 8000
