---
published: false
title: Descargar un canal de youtube desde línea de comandos
layout: post
---
(Youtube-dl)[https://rg3.github.io/youtube-dl/] es un programa de línea de comandos que sirve para descargar videos, listas de reproducción e incluso canales completos de youtube. De esta forma puedes verlos cuando quieras, offline, sin anuncios y sin cortes por pérdidas de conexión. Algo que es especialmente útil cuando tus hijas pequeñas ven decenas de veces a la semana las mismas canciones y cuentos o cuando quieres ver tus videos favoritos de youtube en un televisor "tonto" de los de antes.

Los comandos que personalmente he encontrado más últiles de las cientos de opciones que permite youtube-dl:

```shell
youtube --list-formats url-del-video
```
Lista los formatos disponibles para descargar de ese video en concreto. Luego con la opción -f podemos indicar el identificador numérico del fomato que deseamos descargar. Por defecto siempre será el mejor disponible, pero a lo mejor solo nos interesa el audio o queremos que el video pese algo menos. Así, por ejemplo:

```shell
youtube-dl -f 43 url-del-video
```
Descargará el video en el formato 43.

Para descargar listas de reproducción vasta con copiar la url de la lista de reproducción y youtube-dl comprobará automáticamente que es una lista y tratará de descargar todos los videos. Podemos filtrar los videos por tamaño, por el orden de la lista o por número de visitas. También es muy útil la opción --download-archive que guarda en un fichero los videos descargados y si vuelves a ejecutar el mismo comando se descargará sólamente los videos del canal que no se haya descargado. Muy útil para obtener los videos nuevos o para descargar un canal en varios pasos.

Así, para descargar una lista el comando podría ser:

```shell
youtube-dl -f 43 --download-archive .downloaded --max-filesize 30m https://www.youtube.com/playlist?list=UULsooMJoIpl_7ux2jvdPB-Q
```

Y se descargará de la lista aquellos videos que no estén ya descargados y tengan un peso menor a 30mb en el formato número 43.

Para descargar un canal completo sólo hay que ir a la lista de los videos subidos del canal.

Nota para aficionados a los gestores de paquetes: Si descargas youtube-dl con apt-get o otro gestor de paquetes, seguramente obtengas una versión bastante antigua y obsoleta que da un error al tratar de descargar listas de reproducción. Es mejor instalar la última versión directamente desde la web siguiendo sus instrucciones:

```shell
sudo wget https://yt-dl.org/downloads/2015.10.23/youtube-dl -O /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```
y luego actualizar cuando se desee haciendo simplemente ``youtube-dl -u``

```