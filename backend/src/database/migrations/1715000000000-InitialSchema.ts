import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1715000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Enums
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'barber', 'client')`);
        await queryRunner.query(`CREATE TYPE "booking_status_enum" AS ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show')`);
        await queryRunner.query(`CREATE TYPE "queue_status_enum" AS ENUM('waiting', 'serving', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "loyalty_tier_enum" AS ENUM('bronze', 'silver', 'gold', 'platinum')`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('reminder', 'marketing', 'transactional')`);
        await queryRunner.query(`CREATE TYPE "notification_status_enum" AS ENUM('pending', 'sent', 'failed')`);
        await queryRunner.query(`CREATE TYPE "payment_status_enum" AS ENUM('pending', 'completed', 'refunded', 'failed')`);

        // Create Tables
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "email" varchar UNIQUE NOT NULL,
                "password" varchar NOT NULL,
                "first_name" varchar NOT NULL,
                "last_name" varchar NOT NULL,
                "role" "user_role_enum" DEFAULT 'client',
                "is_active" boolean DEFAULT true,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );
            CREATE INDEX "idx_user_email" ON "users" ("email");

            CREATE TABLE "barbers" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL REFERENCES "users"("id"),
                "bio" text,
                "working_hours" jsonb NOT NULL,
                "commission_rate" decimal(5,2) DEFAULT 0,
                "is_active" boolean DEFAULT true,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );

            CREATE TABLE "clients" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "user_id" uuid REFERENCES "users"("id"),
                "phone" varchar NOT NULL,
                "email" varchar,
                "visit_count" int DEFAULT 0,
                "notes" text,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );
            CREATE INDEX "idx_client_phone" ON "clients" ("phone");

            CREATE TABLE "services" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar NOT NULL,
                "description" text,
                "duration_minutes" int NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "category" varchar NOT NULL,
                "is_active" boolean DEFAULT true,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );

            CREATE TABLE "barber_services" (
                "barber_id" uuid REFERENCES "barbers"("id") ON DELETE CASCADE,
                "service_id" uuid REFERENCES "services"("id") ON DELETE CASCADE,
                PRIMARY KEY ("barber_id", "service_id")
            );

            CREATE TABLE "bookings" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "client_id" uuid NOT NULL REFERENCES "clients"("id"),
                "barber_id" uuid NOT NULL REFERENCES "barbers"("id"),
                "service_id" uuid NOT NULL REFERENCES "services"("id"),
                "start_time" timestamp NOT NULL,
                "end_time" timestamp NOT NULL,
                "status" "booking_status_enum" DEFAULT 'pending',
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );
            CREATE INDEX "idx_booking_start_time" ON "bookings" ("start_time");

            CREATE TABLE "queue_entries" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "client_id" uuid NOT NULL REFERENCES "clients"("id"),
                "barber_id" uuid REFERENCES "barbers"("id"),
                "position" int NOT NULL,
                "status" "queue_status_enum" DEFAULT 'waiting',
                "estimated_wait_minutes" int NOT NULL,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );

            CREATE TABLE "loyalty_cards" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "client_id" uuid NOT NULL UNIQUE REFERENCES "clients"("id"),
                "points" int DEFAULT 0,
                "tier" "loyalty_tier_enum" DEFAULT 'bronze',
                "total_spent" decimal(12,2) DEFAULT 0,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );

            CREATE TABLE "notifications" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "client_id" uuid NOT NULL REFERENCES "clients"("id"),
                "type" "notification_type_enum" NOT NULL,
                "content" text NOT NULL,
                "scheduled_at" timestamp NOT NULL,
                "sent_at" timestamp,
                "status" "notification_status_enum" DEFAULT 'pending',
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );
            CREATE INDEX "idx_notification_scheduled" ON "notifications" ("scheduled_at");

            CREATE TABLE "payments" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "booking_id" uuid NOT NULL UNIQUE REFERENCES "bookings"("id"),
                "amount" decimal(10,2) NOT NULL,
                "stripe_id" varchar,
                "status" "payment_status_enum" DEFAULT 'pending',
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );
            CREATE INDEX "idx_payment_stripe_id" ON "payments" ("stripe_id");

            CREATE TABLE "commissions" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "barber_id" uuid NOT NULL REFERENCES "barbers"("id"),
                "booking_id" uuid NOT NULL UNIQUE REFERENCES "bookings"("id"),
                "amount" decimal(10,2) NOT NULL,
                "rate" decimal(5,2) NOT NULL,
                "paid_at" timestamp,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                "deleted_at" timestamp
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "commissions"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "loyalty_cards"`);
        await queryRunner.query(`DROP TABLE "queue_entries"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "barber_services"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        
        await queryRunner.query(`DROP TYPE "payment_status_enum"`);
        await queryRunner.query(`DROP TYPE "notification_status_enum"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "loyalty_tier_enum"`);
        await queryRunner.query(`DROP TYPE "queue_status_enum"`);
        await queryRunner.query(`DROP TYPE "booking_status_enum"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }
}