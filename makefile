MICROBLOG_TEMPLATE := _templates/micro.md
POST_DATE := $(shell date +%Y-%m-%d)
POST_TIME := $(shell date +%H-%M-%S)
POST_FILE := _microblog/$(POST_DATE)_$(POST_TIME).md
.PHONY: new-microblog
new-microblog:
	@cat $(MICROBLOG_TEMPLATE) > ${POST_FILE}
	@nano ${POST_FILE}