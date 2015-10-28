---
published: true
title: Descargar un canal de youtube desde línea de comandos
layout: post
---
[Youtube-dl](https://rg3.github.io/youtube-dl/) es un programa de línea de comandos que sirve para descargar videos, listas de reproducción e incluso canales completos de youtube. **De esta forma puedes verlos cuando quieras, offline, sin anuncios y sin cortes por pérdidas de conexión.** Algo que es especialmente útil cuando tus hijas pequeñas ven decenas de veces a la semana las mismas canciones y cuentos. O cuando quieres ver tus vídeos favoritos de youtube en un televisor "tonto" de los de antes.

Los comandos que personalmente he encontrado más útiles de las cientos de opciones que permite youtube-dl:

```
youtube --list-formats url-del-video
```

Lista los formatos disponibles para descargar de ese vídeo en concreto. Luego con la opción -f podemos indicar el identificador numérico del formato que deseamos descargar. Por defecto siempre será el mejor disponible, pero a lo mejor solo nos interesa el audio o queremos que el vídeo pese algo menos. Así, por ejemplo:

```
youtube-dl -f 43 url-del-video
```

Descargará el vídeo en el formato 43.

Para descargar listas de reproducción vasta con copiar la url de la lista de reproducción y youtube-dl comprobará automáticamente que es una lista y tratará de descargar todos los vídeos. Podemos filtrar los vídeos por tamaño, por el orden de la lista o por número de visitas. También es muy útil la opción --download-archive que guarda en un fichero los vídeos descargados y si vuelves a ejecutar el mismo comando se descargará solamente los vídeos del canal que no se haya descargado. Muy útil para obtener los vídeos nuevos o para descargar un canal en varios pasos.

Así, para descargar una lista el comando podría ser:

```
youtube-dl -f 43 --download-archive .downloaded --max-filesize 30m url-de-la-lista
```

Y se descargará de la lista aquellos vídeos que no estén ya descargados y tengan un peso menor a 30mb en el formato número 43.

Para descargar un canal completo sólo hay que ir a la lista de los vídeos subidos del canal.

###Nota para aficionados a los gestores de paquetes: 
Si descargas youtube-dl con apt-get, yum o otro gestor de paquetes, seguramente obtengas una versión bastante antigua y obsoleta que da un error al tratar de descargar listas de reproducción. **Es mejor instalar la última versión directamente desde la web siguiendo sus instrucciones:**

```
sudo wget https://yt-dl.org/downloads/2015.10.23/youtube-dl -O /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```

y luego, actualizar cuando se desee haciendo simplemente ``youtube-dl -u``

¿Tienes alguna duda, comentario o corrección? Este post está en [github](https://github.com/juanmirod/juanmirod.github.io/blob/master/_posts/2015-10-23-descargar-un-canal-de-youtube-desde-l-nea-de-comandos.markdown) y puedes contribuir a hacerlo más grande y mejor.
