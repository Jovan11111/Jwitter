.PHONY: test test-auth test-email test-post test-comment test-friendship clean test-build help \
        run stop build build-prod run-prod \
        run-auth run-email run-post run-comment run-friendship run-message run-aireporting run-frontend

# Run all tests
test:
	@echo "Starting all tests..."
	@docker-compose up -d mongo
	@echo "Running auth service tests..."
	@docker-compose run --rm auth-tests
	@echo "Running email service tests..."
	@docker-compose run --rm email-tests
	@echo "Running post service tests..."
	@docker-compose run --rm post-tests
	@echo "Running comment service tests..."
	@docker-compose run --rm comment-tests
	@echo "Running friendship service tests..."
	@docker-compose run --rm friendship-tests
	@echo "All tests completed!"
	@docker-compose down

# Individual test targets
test-auth:
	@echo "Running auth service tests only..."
	@docker-compose up -d mongo
	@docker-compose run --rm auth-tests
	@docker-compose down

test-email:
	@echo "Running email service tests only..."
	@docker-compose run --rm email-tests

test-post:
	@echo "Running post service tests only..."
	@docker-compose run --rm post-tests
	@docker-compose down

test-comment:
	@echo "Running comment service tests only..."
	@docker-compose run --rm comment-tests
	@docker-compose down

test-friendship:
	@echo "Running friendship service tests only..."
	@docker-compose run --rm friendship-tests
	@docker-compose down

# App run targets
run:
	@echo "Starting full application (including test containers)..."
	@docker-compose up -d

run-prod:
	@echo "Starting only production services (no tests)..."
	@docker-compose up -d \
		auth-service \
		email-service \
		post-service \
		comment-service \
		friendship-service \
		message-service \
		aireporting-service \
		frontend \
		mongo

stop:
	@echo "Stopping all containers..."
	@docker-compose down

run-auth:
	@docker-compose up -d mongo auth-service

run-email:
	@docker-compose up -d email-service

run-post:
	@docker-compose up -d mongo post-service

run-comment:
	@docker-compose up -d mongo comment-service

run-friendship:
	@docker-compose up -d mongo friendship-service

run-message:
	@docker-compose up -d mongo message-service

run-aireporting:
	@docker-compose up -d aireporting-service

run-frontend:
	@docker-compose up -d frontend

# Build containers
build:
	@echo "Building all services and test containers..."
	@docker-compose build

build-prod:
	@echo "Building only production services..."
	@docker-compose build \
		auth-service \
		email-service \
		post-service \
		comment-service \
		friendship-service \
		message-service \
		aireporting-service \
		frontend \
		mongo

test-build:
	@echo "Building test containers only..."
	@docker-compose build auth-tests email-tests post-tests comment-tests friendship-tests

clean:
	@echo "Cleaning up containers and unused Docker resources..."
	@docker-compose down
	@docker system prune -f

help:
	@echo "Available commands:"
	@echo "  make run                - Start all services (including test containers)"
	@echo "  make run-prod           - Start only production services (no tests)"
	@echo "  make stop               - Stop all running services"
	@echo "  make build              - Build all services and tests"
	@echo "  make build-prod         - Build only production containers (no tests)"
	@echo "  make clean              - Clean up containers"
	@echo ""
	@echo "  make run-<service>      - Run individual service (auth, email, post, etc.)"
	@echo "  make run-frontend       - Run frontend"
	@echo ""
	@echo "  make test               - Run all tests"
	@echo "  make test-auth          - Run only auth tests"
	@echo "  make test-email         - Run only email tests"
	@echo "  make test-post          - Run only post tests"
	@echo "  make test-comment       - Run only comment tests"
	@echo "  make test-friendship    - Run only friendship tests"
	@echo "  make test-build         - Build only test containers"
