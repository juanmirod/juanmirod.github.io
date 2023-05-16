FROM jekyll/jekyll:3.8

WORKDIR /site

COPY . .

RUN touch Gemfile.lock                                                                                    
RUN chmod a+w Gemfile.lock 

RUN bundle install
RUN jekyll build

CMD ["jekyll", "serve", "--watch", "--force_polling", "-H", "0.0.0.0"]