FROM jekyll/jekyll:3.8

WORKDIR /site

COPY . .

# RUN chmod a+w Gemfile.lock 
RUN chmod a+w /site

RUN bundle update
RUN bundle install
RUN jekyll build

CMD ["jekyll", "serve", "--watch", "--force_polling", "--incremental", "-H", "0.0.0.0"]