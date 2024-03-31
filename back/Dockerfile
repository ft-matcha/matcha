FROM node:18.17.1

WORKDIR /app

COPY init.sh /tmp/

RUN chmod 777 /tmp/init.sh

ENTRYPOINT /tmp/init.sh