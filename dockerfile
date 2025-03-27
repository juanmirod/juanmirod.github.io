FROM ruby:2.7

# Set environment variables
ENV LANG=C.UTF-8 \
  BUNDLE_SILENCE_ROOT_WARNING=1 \
  BUNDLE_APP_CONFIG=/usr/local/bundle

WORKDIR /site

# Install build dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  git \
  && rm -rf /var/lib/apt/lists/* && \
  gem update --system 3.2.3 && \
  gem install bundler -v 2.3.26

# Copy Gemfile first to leverage Docker cache
COPY Gemfile ./

# Install dependencies
RUN bundle install

# Copy the rest of the site
COPY . .

# Build the site
RUN bundle exec jekyll build

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--force_polling", "--incremental", "-H", "0.0.0.0"]