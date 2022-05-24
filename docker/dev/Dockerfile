FROM debian:bullseye

RUN apt-get update \
    && apt-get install -y apache2

WORKDIR /var/www

COPY --chown=www-data:www-data . /var/www

EXPOSE 80

RUN cp -rf /var/www/docker/000-default.conf /etc/apache2/sites-enabled/000-default.conf

RUN a2enmod rewrite && a2enmod headers

CMD ["apache2ctl", "-D" ,"FOREGROUND"]