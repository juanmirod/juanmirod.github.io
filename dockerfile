# Use a newer Ruby version for better compatibility
FROM ruby:3.2

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
  gem install bundler:2.3.26 --no-document

# Copy Gemfile and Gemfile.lock
COPY Gemfile* ./

# Install dependencies with specific platform
RUN bundle config set --local platform x86_64-linux && \
  bundle install

# Copy the rest of the site
COPY . .

# Build the site
RUN bundle exec jekyll build

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--force_polling", "--incremental", "-H", "0.0.0.0"]