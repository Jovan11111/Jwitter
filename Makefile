test:
	@echo "Starting all tests..."
	@docker-compose up -d mongo
	@echo "Running auth service tests..."
	@docker-compose run --rm auth-tests
	@echo "Running email service tests..."
	@docker-compose run --rm email-tests
	@echo "All tests completed!"
	@docker-compose down

test-auth:
	@echo "Running auth service tests only..."
	@docker-compose up -d mongo
	@docker-compose run --rm auth-tests
	@docker-compose down

test-email:
	@echo "Running email service tests only..."
	@docker-compose run --rm email-tests

clean:
	@echo "Cleaning up containers..."
	@docker-compose down
	@docker system prune -f

build:
	@echo "Building all test containers..."
	@docker-compose build auth-tests email-tests

help:
	@echo "Available commands:"
	@echo "  make test       - Run all tests"
	@echo "  make test-auth  - Run only auth tests"
	@echo "  make test-email - Run only email tests"
	@echo "  make build      - Build all test containers"
	@echo "  make clean      - Clean up containers"

.PHONY: test test-auth test-email clean build help