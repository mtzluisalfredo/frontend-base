FROM contpaqisi/frontend

COPY ./docker/scripts /home/docker/
COPY ./ /var/lib/app

RUN chmod +x /home/docker/*.sh \
  && yarn install \
  && npm run build

ENTRYPOINT ["/home/docker/startup.sh"]
