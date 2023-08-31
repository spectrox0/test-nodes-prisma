reset:
	rm -rf node_modules pnpm-lock.yaml ; pnpm i ; pnpm build ; docker compose up --build -d
up:
	docker compose up --build -up
migrate:
	docker exec test_node_api bash -c "npx prisma db push --accept-data-loss && npx prisma db pull && pnpm build";
