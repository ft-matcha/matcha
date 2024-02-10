FROM redis:6.2.6

COPY redis.conf /usr/local/etc/redis/redis.conf

RUN chmod +rw /usr/local/etc/redis/redis.conf

RUN echo "user $REDIS_USER >$REDIS_PASSWORD on ~* +@all" >> /usr/local/etc/redis/redis.conf 

ENTRYPOINT ["redis-server", "/usr/local/etc/redis/redis.conf"]