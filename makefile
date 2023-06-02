MICROBLOG_TEMPLATE := _templates/micro.md
POST_DATE := $(shell date +%Y-%m-%d)
POST_TIME := $(shell date +%H-%M-%S)
POST_FILE := _microblog/$(POST_DATE)_$(POST_TIME).md
.PHONY: new-micro
new-microblog:
	@cat $(MICROBLOG_TEMPLATE) | \
	sed "s/%CURRENT_DATE%/$(POST_TIME)/g" > ${POST_FILE} && \
	nano ${POST_FILE}
