CURRENT_DIRECTORY=./

BASE_COMPOSE=-f $(CURRENT_DIRECTORY)/docker/docker-compose.yml
DEV_COMPOSE=$(BASE_COMPOSE) -f $(CURRENT_DIRECTORY)/docker/docker-compose.dev.yml
TEST_COMPOSE=$(BASE_COMPOSE) -f $(CURRENT_DIRECTORY)/docker/docker-compose.test.yml

ifeq ($(TORUS_ENV),)
  TORUS_ENV=development
endif

# CI validation in case torus is not installed globally
TORUS=torus
ifeq (, $(shell which torus))
  TORUS=./scripts/torus
endif

help: Makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build image
	@docker-compose $(BASE_COMPOSE) build

test: ## Test image
	@$(TORUS) run -e $(TORUS_ENV) -s $(TORUS_ENV) -- docker-compose $(TEST_COMPOSE) up -d
	@$(TORUS) run -e $(TORUS_ENV) -s $(TORUS_ENV) -- docker-compose $(TEST_COMPOSE) exec web-app /home/docker/run-tests.sh

test-down: ## Clean up test env
	@docker-compose $(TEST_COMPOSE) down

dev: ## Lift dev environment
	@$(TORUS) run -e $(TORUS_ENV) -s $(TORUS_ENV) -- docker-compose $(DEV_COMPOSE) up

dev-down: ## Destroy dev environment
	@docker-compose $(DEV_COMPOSE) down

bash: ## Ssh into container
	@docker-compose $(DEV_COMPOSE) exec web-app /bin/bash
