---
published: true
title: Cómo ejecutar github pages en local con Docker
layout: post
tags: [programación, docker] 
---

Si usas github pages para tu blog o tu web pero no quieres instalar Ruby
y las demás dependencias en tu máquina o no sabes cómo, iterar sobre
cambios en el diseño o en el contenido se vuelve bastante tedioso: haces los cambios,
git commit, git push, espera a que se ejecute la acción que compila y publica la web...

Así es muy difícil avanzar y mantener el flow. Yo hasta ahora estaba así porque
no quería instalar Ruby y jekyll y no quería dedicar mucho tiempo a la web a parte de
escribir.

Pero esta semana, y gracias a que ChatGPT me ayuda mucho a mantener el foco y a resolver
problemas, he podido crear un fichero de docker y los ficheros de dependencias necesarios
para ejecutar el blog en local, y hacer cambios y verlos en tiempo real. Puedes ver la
configuración en el repo de esta página, pero lo copio también aquí para más comodidad.

## Dependencias

Lo primero es añadir el `Gemfile` con las dependencias que tiene github-pages, incluídos los plugins
que estés utilizando, en mi caso sólo uso dos plugins y el Gemfile queda así:

```Gemfile
source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
gem 'jekyll-seo-tag' 
gem 'jekyll-paginate'
```

Este fichero va en la raíz del proyecto, igual que el dockerfile. También necesitarás docker instalado
en tu ordenador para poder ejecutar el dockefile.

## Dockerfile

El dockerfile se encarga de instalar todas las dependencias en un contenedor y ejecutar el install, el build y el servidor de jekyll para que puedas ver la página en local sin conexión y trabajar mucho más
rápido. Este es el `dockerfile` que deberá estar en la raíz del proyecto:

```dockerfile
FROM jekyll/jekyll:3.8

WORKDIR /site

COPY . .

RUN chmod a+w Gemfile.lock 

RUN bundle install
RUN jekyll build

CMD ["jekyll", "serve", "--watch", "--force_polling", "--incremental", "-H", "0.0.0.0"]
```

## Cómo usarlo

Para usar el dockerfile primero compilamos la imagen con el siguiente comando:


(La primera vez que ejecutes el build se creará un fichero `Gemfile.lock` que guarda la versión de las
dependencias de ruby instaladas, te recomiendo añadirlo a tu repo para tener las dependencias apuntando
a versiones fijas)

```sh
docker build -t myblog .
```

Y ya podemos ejecutar el contenedor y ver nuestra web en localhost:

```sh
docker run -p 4000:4000 -v $(pwd):/site myblog
```

Y podrás ver el blog en `localhost:4000` en watch mode, lo que quiere decir que cualquier cambio dispara
un re-build y si refrescas la página verás la nueva versión de la web con el cambio.

A mi ha ayudado a poder cambiar el css de la web, espero que sea útil a alguien más y como siempre para
cualquier comentario o corrección de errores puedes abrir un issue en [github](https://github.com/juanmirod/juanmirod.github.io)