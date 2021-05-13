---
published: true
title: Chuleta de comandos útiles de Linux
layout: post
tags: [Linux] 
---

Algunos comandos que suelo utilizar con cierta frecuencia pero algunos no con la suficiente como para recordarlos. Se aceptan sugerencias de comandos o alias para incluir a la lista. No soy administrador de sistemas ni experto en Linux, solo usuario habitual.

## Conexiones ssh

- `ssh-keygen` Crear una clave ssh
- Copiar la clave ssh al servidor a mano:

```
cat ~/.ssh/id_rsa.pub
** copiar la clave en el portapapeles **
** hacer login en el servidor **
echo pegar_la_clave_aquí >> ~/.ssh/authorized_keys
```

- `ssh user@host` Conectar al servidor
- `ssh user@host "comando"` Enviar comandos al servidor
- Para desabilitar el login con clave en el servidor, una vez logado con ssh:

```
sudo nano /etc/ssh/sshd_config

...
PasswordAuthentication no
...

```

## Manejo de ficheros

* `mkdir nombre_de_carpeta` Crea una nueva carpeta
* `touch nombre_de_fichero` Crea un fichero vacío
* `rm nombre_de_fichero` Borra un fichero
* `rm -r nombre_de_carpeta` Borra una carpeta
* `mv nombre_fichero nuevo_nombre` Renombra/mueve un archivo
* `cp nombre_fichero nuevo_fichero` Copia un archivo
* `ls` - muestra un listado con los ficheros de la carpeta actual
* Encontrar un fichero dentro de un arbol de directorios, excluyendo (podando) algunos:
  ```
   find . -not \( -path "*/node_modules" -prune  \) -name "filename*"
  ```

## Ayuda e información

* Para ver ficheros en la linea de comandos podemos usar `cat`, `more` y `less`, este último es el que usan las man pages.
* `info coreutils` Muestra un manual con hipervínculos sobre los principales programas GNU de Linux
* `whatis` y `type` sirven para saber que hace un comando y de que tipo es para más info se puede usar `info`, `man` o `--help`
* `alias` para crear comandos a partir de otros.
* `cd -` para volver al directorio anterior

## Imprimir desde la línea de comandos (pdf, ps, jpg)

* `lpq` - muestra la cola de impresión
* `lp nombredefichero.pdf` - imprime en la impresora por defecto
* `lp -o sides=two-sided-long-edge Notes.pdf` - imprimir por las dos caras
* `lp -o landscape penguin.jpg` - Imprimir apaisado
* `history | lp -o portrait -o fit-to-page -` Imprime lo que recibe desde standard-input

## Convertir a pdf

* Convertir un rtf o doc/docx a pdf con libreoffice desde cli:
    `libreoffice --headless --invisible --norestore --convert-to pdf fichero.rtf`
* Convertir markdown a pdf (con node y headless chrome):
    `npx markdown-pdf README.md readme.pdf`
* Latex a pdf:
    `pdflatex ...`

## Utilidades varias

* `notify-send` crea una notificación en el escritorio. Ej. crear una alarma para dentro de 10 segundos: `sleep 10; notify-send "Hora e descansar!" "Se ha terminado el Pomodoro"`
* Los comodines siempre se expanden en orden: `cat *.txt > out.txt` concatenará los ficheros `1.txt`, `2.txt` y `3.txt` en ese orden. También se pueden usar expansiones con llaves: `{1..9}` `{a..z}`  
* `script filename` guarda una sesion de comandos en un fichero, genial para crear scripts a partir de tareas manuales que solemos repetir.
* `df -h` te dice el espacio libre en los discos duros
* `free -h` para espacio libre en la RAM
* `du -sh foldername` dice el espacio ocupado por el directorio, si haces: `du -sh *` te dice el espacio que ocupan todos los subdirectorios del directorio actual

* `grep -iR 'palabra' .` Muestra todas las líneas que contienen `palabra` en todos los ficheros del directorio actual y sus subdirectorios
* `ctrl+r` búsqueda incremental en el historial, presionar `ctrl+r` otra vez para buscar más ocurrencias, `ctrl+j` copia el comando y devuelve el control, `ENTER` lo ejecuta.
* `history` te muestra el historial de comandos, con lo que puedes buscar en el historial haciendo `history | grep 'comando'`
* `wc -l` muestra el número de líneas del stream se le pase, por ejemplo: `cat file.txt | wc -l` nos dá el número de líneas de un fichero y `grep -iR 'palabra' . | wc -l` nos daría el número de líneas en las que aparece la palabra `palabra` en todos los ficheros del directorio y sus hijos.
* `convert *.png out.pdf` crea un pdf con una imagen por página.
* `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=out.pdf first.pdf second.pdf` Concatena varios pdfs en uno con ghostscript
* `fc-cache -f -v` Refrescar las fuentes de sistema una vez has copiado los ficheros de fuentes que quieres añadir a `~/.fonts/`
* Para modificar el nombre/convertir una serie de ficheros: `for i in *.pdf; do mv "$i" CS749__"$i"; done`. Por ejemplo, si tenemos una carpeta con un montón de documentos de word que tenemos que imprimir, en lugar de abrirlos uno por uno y darle a imprimir, podemos hacer:

```shell
for i in *.doc; do libreoffice --headless --invisible --norestore --convert-to pdf "$i"; done
lp *.pdf
```

* `tmux` es un comando que permite tener varias sesiones del terminal abiertas en paneles o en segundo plano, muy útil para no tener que depender de las pestañas y poder ver varios terminales a la vez, es fácil de usar y aumenta las posibilidades del terminal.

## Alias

Algunos son para comandos de arriba:

* `alias please='sudo $(fc -ln -1)'` - Ejecuta el comando anterior con 'sudo'
* `alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'` - crea una notificación de escritorio, útil para lanzar una notificación cuando termina otro comando: `npm build && alert 'Terminó el build'`
* `alias cd..='cd ..'` Este me ahorra mucha frustración :)
