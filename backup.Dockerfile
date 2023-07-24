FROM alpine:3.16

RUN apk add --no-cache postgresql-client
RUN mkdir backup-files

COPY ./scripts/backup.sh ./backup.sh

# RUN chmod +x backup.sh
RUN echo '* * * * * /bin/sh /backup.sh' >/etc/crontabs/root

CMD [ "crond", "-f" ]
