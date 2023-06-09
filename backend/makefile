build: ;
	mvn clean package;

push: build;
	docker context use default;
	docker build -t guilhermegouveia/docfynd-spring:latest .;
	docker image push guilhermegouveia/docfynd-spring:latest;

container_drop:
	docker context use docfynd;
	@-docker stop docker-spring;
	@-docker rm docker-spring;

container_start: ;
	docker context use docfynd;
	docker run -d -p 8080:8080 --name docker-spring docker.io/guilhermegouveia/docfynd-spring:latest;

deploy: ;
	 mvn package azure-webapp:deploy;
