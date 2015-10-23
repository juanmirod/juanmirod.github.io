---
published: false
title: Descargar un canal de youtube desde línea de comandos
layout: post
---
Youtube-dl es un programa de línea de comandos que sirve para descargar videos, listas de reproducción e incluso canales completos de youtube. De esta forma puedes verlos cuando quieras, offline, sin anuncios y sin cortes por pérdidas de conexión. Algo que es especialmente útil cuando tus hijas pequeñas ven decenas de veces a la semana las mismas canciones y cuentos o cuando quieres ver tus videos favoritos de youtube en un televisor "tonto" de los de antes.

Los comandos que personalmente he encontrado más últiles de las cientos de opciones que permite youtube-dl:

```shell
$> youtube --list-formats url-del-video
```
Lista los formatos disponibles para descargar de ese video en concreto. Luego con la opción -f podemos indicar el identificador numérico del fomato que deseamos descargar. Por defecto siempre será el mejor disponible, pero a lo mejor solo nos interesa el audio o queremos que el video pese algo menos. Así, por ejemplo:

```shell
youtube-dl -f 43 url-del-video
```
Descargará el video en el formato 43.

