FROM node

WORKDIR /app

COPY init.sh /tmp/

RUN chmod 777 /tmp/init.sh

ENTRYPOINT sleep 10 && /tmp/init.sh