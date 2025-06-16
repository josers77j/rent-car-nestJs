-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_modifiedBy_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "createdBy" SET DATA TYPE TEXT,
ALTER COLUMN "deletedBy" SET DATA TYPE TEXT,
ALTER COLUMN "modifiedBy" SET DATA TYPE TEXT;
