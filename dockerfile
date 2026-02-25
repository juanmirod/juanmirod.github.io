# Use a newer Ruby version for better compatibility
FROM ruby:3.2-slim

# Set environment variables
ENV LANG=C.UTF-8 \
  BUNDLE_SILENCE_ROOT_WARNING=1 \
  BUNDLE_APP_CONFIG=/usr/local/bundle

# Install build dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  git \
  && rm -rf /var/lib/apt/lists/* && \
  gem install bundler:2.3.26 --no-document

WORKDIR /site

# Copy Gemfile and Gemfile.lock FIRST (these rarely change)
COPY Gemfile Gemfile.lock ./

# Install dependencies with specific platform (cached unless Gemfile changes)
RUN bundle config set --local platform x86_64-linux && \
  bundle install

# Copy the rest of the site (this will invalidate, but won't re-run bundle install)
COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--force_polling", "-H", "0.0.0.0"]